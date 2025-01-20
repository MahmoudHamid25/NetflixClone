import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';

@Injectable()
export class XMLInterceptor implements NestInterceptor {
  private xmlParser = new XMLParser();
  private xmlBuilder = new XMLBuilder();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (request.headers['content-type']?.includes('xml')) {
      request.body = this.xmlParser.parse(request.body);
    }

    return next.handle().pipe(
      map(data => {
        if (request.headers.accept?.includes('xml')) {
          response.header('Content-Type', 'application/xml');
          return this.xmlBuilder.build({ root: data });
        }
        return data;
      }),
    );
  }
}
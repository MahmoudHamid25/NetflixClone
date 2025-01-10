import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { Observable } from 'rxjs';
import { Role } from './role.enum';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly accessControlService: AccessControlService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log('roles guard user', user);

    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    console.log(requiredRoles);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles required, no restriction
    }

    if (!user || !user.role) {
      throw new ForbiddenException('User does not have a role');
    }

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('You do not have the necessary permissions');
    }

    return true;
  }
}

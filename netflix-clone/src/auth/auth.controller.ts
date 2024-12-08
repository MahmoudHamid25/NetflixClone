import { AuthGuard } from '@nestjs/passport';
import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'; 
import { Public } from './decorators/public.decorator';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AccessToken } from './types/access-token';
import { LoginDto } from './dto/login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(loginDto: LoginDto): Promise<BadRequestException | AccessToken> {
    console.log("login");
    return this.authService.login(loginDto.email, loginDto.password);
  }

  // @Post('register')
  // async register(
  //   @Body() registerBody: RegisterDto,
  // ): Promise<any> {
  //   console.log("register");
  //   return await this.authService.register(registerBody);
  // }

}

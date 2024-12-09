import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Public } from './public.decorator';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { GithubOauthGuard } from './guards/github-oauth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Public()
  @Post('login')
  login(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: any) {
    return this.authService.signIn(signInDto.email, signInDto.password, res);
  }

  @Public()
  @Post('register')
  register(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.email, signUpDto.password);
  }

  @Post('logout')
  logOut(@Req() req: any) {
    return this.authService.logout(req.user.id);
  }

  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }

  @Public()
  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    const newTokens = await this.authService.refreshTokens(refreshToken);
    return newTokens;
  }

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google')
  googleAuth() {
  }

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  async googleAuthRedirect(@Req() req: any, @Res() res: any) {
    const tokens = await this.authService.socialLogin(req.user, 'google');
    res.json(tokens);
  }

  @Public()
  @UseGuards(GithubOauthGuard)
  @Get('github')
  githubAuth() {
  }

  @Public()
  @UseGuards(GithubOauthGuard)
  @Get('github/callback')
  async githubAuthRedirect(@Req() req: any, @Res() res: any) {
    const tokens = await this.authService.socialLogin(req.user, 'github');
    res.json(tokens);
  }
}

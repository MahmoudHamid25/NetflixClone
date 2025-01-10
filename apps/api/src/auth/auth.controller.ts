import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Public } from './public.decorator';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { GithubOauthGuard } from './guards/github-oauth.guard';
import { ConfigService } from '@nestjs/config';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Log in with email and password' })
  @ApiResponse({
    status: 200,
    description:
      'Successfully logged in and returned access and refresh tokens.',
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  login(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: any) {
    return this.authService.signIn(signInDto.email, signInDto.password, res);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description:
      'Successfully registered and returned access and refresh tokens.',
  })
  @ApiResponse({
    status: 400,
    description: 'User with this email or username already exists.',
  })
  register(@Body() signUpDto: SignUpDto, @Res({ passthrough: true }) res: any) {
    return this.authService.signUp(
      signUpDto.username,
      signUpDto.email,
      signUpDto.password,
      res,
    );
  }

  @Post('logout')
  @ApiOperation({ summary: 'Log out the current user' })
  @ApiResponse({ status: 200, description: 'Successfully logged out.' })
  logOut(@Req() req: any, @Res() res: any) {
    console.log('log out');
    return this.authService.logout(req, res);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Get the profile of the current logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'Return the user profile.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  getProfile(@Req() req: any) {
    console.log('requested profile');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = req.user;
    return user;
  }

  @Public()
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh the access and refresh tokens' })
  @ApiResponse({
    status: 200,
    description: 'Successfully refreshed tokens.',
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid or expired refresh token.',
  })
  async refreshToken(
    @Body('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: any,
  ) {
    const newTokens = await this.authService.refreshTokens(refreshToken, res);
    return newTokens;
  }

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google')
  @ApiOperation({ summary: 'Google OAuth authentication' })
  googleAuth() {}

  @Public()
  @UseGuards(GoogleOauthGuard)
  @Get('google/callback')
  @ApiOperation({
    summary:
      "Google OAuth callback to 'REDIRECT_URL_PRODUCTION' (.env variable) or http://localhost:3000 if no specified",
  })
  @ApiResponse({ status: 200, description: 'OAuth login successful.' })
  @ApiResponse({ status: 400, description: 'OAuth authentication failed.' })
  async googleAuthRedirect(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
  ) {
    await this.authService.socialLogin(req.user, 'google', res);

    const redirectUrl = this.configService.get<string>(
      'REDIRECT_URL_PRODUCTION',
      'http://localhost:3000', // fallback to localhost if not set
    );

    return res.redirect(redirectUrl);
  }

  @Public()
  @UseGuards(GithubOauthGuard)
  @Get('github')
  @ApiOperation({ summary: 'GitHub OAuth authentication' })
  githubAuth() {}

  @Public()
  @UseGuards(GithubOauthGuard)
  @Get('github/callback')
  @ApiOperation({
    summary:
      "GitHub OAuth callback to 'REDIRECT_URL_PRODUCTION' (.env variable) or http://localhost:3000 if no specified ",
  })
  @ApiResponse({ status: 200, description: 'OAuth login successful.' })
  @ApiResponse({ status: 400, description: 'OAuth authentication failed.' })
  async githubAuthRedirect(@Req() req: any, @Res() res: any) {
    await this.authService.socialLogin(req.user, 'github', res);

    const redirectUrl = this.configService.get<string>(
      'REDIRECT_URL_PRODUCTION',
      'http://localhost:3000', // fallback to localhost if not set
    );

    return res.redirect(redirectUrl);
  }
}

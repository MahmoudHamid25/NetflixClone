import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// import * as crypto from 'crypto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
    res: any,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid username');
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '3600s' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    console.log('Normal login generated refreshToken:', refreshToken);

    await this.updateRefreshToken(user.id, refreshToken);

    // Set cookies in the response
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async signUp(
    username: string,
    email: string,
    pass: string,
    res: any,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const existingUser = await this.usersService.findOneByEmailOrUsername(
      email,
      username,
    );
    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.usersService.create({
      username,
      email,
      password: hashedPassword,
    });

    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '3600s' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    console.log('Sign up generated refreshToken:', refreshToken);
    await this.updateRefreshToken(user.id, refreshToken);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async socialLogin(
    user: any,
    provider: string,
    res: any,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '3600s' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    console.log('Social login generated refreshToken:', refreshToken);
    await this.updateRefreshToken(user.id, refreshToken);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async logout(req: any, res: any) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res.status(200).json({ message: 'Logged out successfully' });
  }

  async refreshTokens(refreshToken: string, res: any) {
    try {
      const payload = this.jwtService.verify(refreshToken);

      const user = await this.usersService.findOneById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
      const isValid = refreshToken === user.refreshToken;
      console.log(isValid, refreshToken, user.refreshToken);
      if (!isValid) {
        throw new UnauthorizedException(
          'Invalid refresh token. Token is not valid.',
        );
      }

      const newPayload = { sub: user.id, email: user.email };

      const newAccessToken = this.jwtService.sign(newPayload, {
        expiresIn: '3600s',
      });
      const newRefreshToken = this.jwtService.sign(newPayload, {
        expiresIn: '7d',
      });

      console.log('Refresh generated refreshToken:', newRefreshToken);
      await this.updateRefreshToken(user.id, newRefreshToken);
      // console.log("refresh token was updated");

      res.cookie('accessToken', newAccessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000, // 1 hour
      });

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    // const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    console.log('update refresh token', refreshToken);
    return await this.usersService.update(userId, {
      refreshToken: refreshToken,
    });
  }

  async validateOAuthUser(profile: any, provider: string): Promise<User> {
    return this.usersService.findOrCreateUser(profile, provider);
  }

  async generateJwtToken(user: User): Promise<string> {
    return this.jwtService.sign(
      { sub: user.id, email: user.email },
      { expiresIn: '3600s' },
    );
  }
}

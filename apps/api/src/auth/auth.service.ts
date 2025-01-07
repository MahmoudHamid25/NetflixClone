import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: any,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isMatch = await bcrypt.compare(pass.trim(), user.password);
    console.log('Password match:', isMatch);
    console.log('User pass:', user.password);
    console.log('Received pass', pass);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    // const { password, ...result } = user;
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '60m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    await this.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async signUp(
    email: string,
    pass: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.usersService.create({
      email,
      password: hashedPassword,
    });

    const payload = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '60m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    await this.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async socialLogin(
    user: any,
    provider: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    console.log(provider);
    const accessToken = this.jwtService.sign(payload, { expiresIn: '60m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.updateRefreshToken(user.id, refreshToken);

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async logout(userId: string) {
    await this.usersService.update(userId, { refreshToken: '' });
    return { message: 'Logged out successfully' };
  }

  async refreshTokens(refreshToken: string) {
    try {
      // Step 1: Verify the JWT refresh token
      const payload = this.jwtService.verify(refreshToken); // Verifies the integrity of the JWT

      // Step 2: Retrieve the user from the database
      const user = await this.usersService.findOneById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Step 3: Compare the incoming refresh token with the hashed refresh token stored in the DB
      const isValid = await bcrypt.compare(refreshToken, user.refreshToken);
      console.log(isValid, refreshToken, user.refreshToken);
      if (!isValid) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Step 4: Generate new access and refresh tokens (JWT for access, random string for refresh)
      const newAccessToken = this.jwtService.sign(
        { sub: user.id, email: user.email },
        { expiresIn: '3600s' },
      );

      const newRefreshToken = crypto.randomBytes(64).toString('hex'); // Generate a random string as a new refresh token

      // Step 5: Hash the new refresh token before storing it in the database
      await this.updateRefreshToken(user.id, newRefreshToken);

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // Update the refresh token by hashing it before saving to the DB
  async updateRefreshToken(userId: string, refreshToken: string) {
    // const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.update(userId, { refreshToken: refreshToken });
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

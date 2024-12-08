import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt.guard';




@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },],
  imports: [UsersModule, PassportModule, JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),],
})
export class AuthModule {}

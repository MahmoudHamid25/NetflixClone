import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { AccessToken } from './types/access-token';
import { AccessTokenPayload } from './types/access-token-payload';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string ): Promise<AccessToken> {
      const user = await this.validateUser(email, pass)
      const {password, ...result} = user;
      const payload = {sub: user.id, email: user.email};
      const accessToken = this.jwtService.sign(payload, {expiresIn: '60m'});
      return {
        accessToken: accessToken}
    }

    // const payload = { email: user.email, id: user.id };
    // console.log("login")
    // return { access_token: this.jwtService.sign(payload) };
  

  // async register(user: RegisterDto): Promise<AccessToken> {
  //   const existingUser = await this.usersService.findOneByEmail(user.email);
  //   if (existingUser) {
  //     throw new BadRequestException('email already exists');
  //   }
  //   const hashedPassword = await bcrypt.hash(user.password, 10);
  //   const newUser: CreateUserDto = { ...user, password: hashedPassword };
  //   const createdUser = await this.usersService.create(newUser)
  //   // return this.login(createdUser);
  // }

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }
}

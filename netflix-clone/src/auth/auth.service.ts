import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  create(createAuthDto: CreateAuthDto) {
    const { email, password } = createAuthDto;

    // Hash the password before saving the user
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create the user using UsersService
    return this.usersService.create({
      email,
      password: hashedPassword,
    });
  }

  findAll() {
    return this.usersService.findAll();
  }

  findOne(id: string) {
    return this.usersService.findOne(id);
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return this.usersService.update(id, updateAuthDto);
  }

  remove(id: string) {
    return this.usersService.remove(id);
  }

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

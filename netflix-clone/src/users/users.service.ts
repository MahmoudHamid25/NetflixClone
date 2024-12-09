import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const newUser = this.usersRepository.create({
      email,
      password,
    });

    // Save and return the new user
    return this.usersRepository.save(newUser);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const result = await this.usersRepository.update(id, updateUserDto);

    if (result.affected === 0) {
      throw new Error(`User with ID ${id} not found`);
    }
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findOrCreateUser(profile: any, provider: string): Promise<User> {
    const email = profile.emails?.[0]?.value;

    if (!email) {
      throw new Error('No email found in the user profile');
    }

    let user = await this.usersRepository.findOne({
      where: { socialId: profile.id },
    });
    if (!user) {
      const User = {
        socialId: profile.id,
        provider,
        email: email,
      };
      user = this.usersRepository.create(User);
      await this.usersRepository.save(user);
    }
    return user;
  }
}

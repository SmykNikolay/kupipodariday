import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/User.dto';
import { CreateUserDto } from 'src/auth/dto/Auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    return this.usersRepository.save(user);
  }
  findOne(queryFilter: any): Promise<User> {
    return this.usersRepository.findOne(queryFilter);
  }

  find(queryFilter: any): Promise<User[]> {
    return this.usersRepository.find(queryFilter);
  }

  async updateOne(queryFilter: any, updateUserDto: UserDto): Promise<void> {
    const user = await this.usersRepository.findOne(queryFilter);
    Object.assign(user, updateUserDto);
    await this.usersRepository.save(user);
  }

  async removeOne(queryFilter: any): Promise<void> {
    const user = await this.usersRepository.findOne(queryFilter);
    await this.usersRepository.remove(user);
  }
}

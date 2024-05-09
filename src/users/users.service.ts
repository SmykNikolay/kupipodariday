import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      return null;
    }

    const hash = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hash,
    });

    return this.userRepository.save(user);
  }

  async findUserById(query) {
    const user = await this.userRepository.findOne({
      where: query,
      relations: ['wishlists'],
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async findUserByUsername(query) {
    const user = await this.userRepository.findOne({
      where: query,
      relations: ['wishlists'],
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  async updateUserById(query, updateUserDto: UpdateUserDto) {
    const user = await this.findUserById(query);

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const emailAlreadyExist = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });

      if (emailAlreadyExist) {
        throw new ConflictException('Данный email уже зарегистрирован');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.userRepository.update(query.id, updateUserDto);
  }
  async findUsersByQuery(query: any) {
    return this.userRepository.find({
      where: query,
    });
  }
}

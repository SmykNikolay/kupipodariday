import {
  Body,
  ClassSerializerInterceptor,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LocalGuard } from './guard/local.guard';

import { SigninUserDto } from './dto/signinUserD.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  @HttpCode(201)
  async login(@Body() signinUserDto: SigninUserDto) {
    try {
      return await this.authService.login(signinUserDto);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Некорректная пара логин и пароль');
      }
      throw error;
    }
  }

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(
          'Пользователь с таким email или username уже зарегистрирован',
        );
      }
      throw error;
    }
  }
}

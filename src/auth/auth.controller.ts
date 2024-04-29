import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import {
  SignInUserDto,
  SignInUserResponseDto,
  CreateUserDto,
  SignupUserResponseDto,
} from './dto/Auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async login(
    @Body() signInUserDto: SignInUserDto,
  ): Promise<SignInUserResponseDto> {
    const user = await this.authService.validateUser(signInUserDto);
    if (!user) {
      throw new HttpException(
        'Некорректная пара логин и пароль',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.authService.login(user);
  }

  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignupUserResponseDto> {
    const user = await this.authService.createUser(createUserDto);
    if (!user) {
      throw new HttpException(
        'Пользователь с таким email или username уже зарегистрирован',
        HttpStatus.CONFLICT,
      );
    }
    await this.authService.login(user);

    return user;
  }
}

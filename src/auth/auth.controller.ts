import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LocalGuard } from './guard/local.guard';
import { User } from 'src/users/entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async signIn(@Req() req: Request & { user: User }) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return await this.authService.login(user);
  }
}

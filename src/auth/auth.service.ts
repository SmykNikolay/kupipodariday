import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, SignInUserDto } from './dto/Auth.dto';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(signInUserDto: SignInUserDto): Promise<User> {
    const { username, password } = signInUserDto;
    const user = await this.usersService.findOne({ username });

    if (user && user.password === password) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

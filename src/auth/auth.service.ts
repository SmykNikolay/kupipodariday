import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SigninUserDto } from './dto/signinUserD.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findUserByUsername({ username });

    if (!user) {
      this.logger.warn(
        `Failed login attempt for non-existing user: ${username}`,
      );
      throw new UnauthorizedException('Invalid username or password');
    }

    const isMatch = await this.checkPassword(password, user.password);

    if (!isMatch) {
      this.logger.warn(`Failed login attempt for user: ${username}`);
      throw new UnauthorizedException('Invalid username or password');
    }

    return user;
  }

  async checkPassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async login(loginDto: SigninUserDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

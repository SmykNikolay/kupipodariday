import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class SignInUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username: string;

  @IsString()
  @MinLength(2)
  password: string;
}

export class SignInUserResponseDto {
  @IsString()
  access_token: string;
}

export class SignupUserResponseDto {
  id: number;

  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username: string;

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  about: string;

  @IsString()
  avatar: string;

  @IsEmail()
  email: string;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;
}

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  @MaxLength(64)
  username: string;

  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(200)
  about?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  password: string;
}

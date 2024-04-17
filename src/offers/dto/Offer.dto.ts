import {
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserDto } from './user.dto';
import { WishDto } from './wish.dto';

export class OfferDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @IsNotEmpty()
  @IsDate()
  updatedAt: Date;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => WishDto)
  item: WishDto;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsBoolean()
  hidden: boolean;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserDto)
  user: UserDto;
}

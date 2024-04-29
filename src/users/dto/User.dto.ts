import { IsString, IsNumber, MinLength, MaxLength } from 'class-validator';
// import { Wish } from '../wishes/wish.entity';
// import { Offer } from '../offers/offer.entity';
// import { Wishlist } from '../wishlists/wishlist.entity';

export class UserDto {
  @IsNumber()
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

  @IsString()
  email: string;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;

  //   @IsArray()
  //   wishes: Wish[];

  //   @IsArray()
  //   offers: Offer[];

  //   @IsArray()
  //   wishlists: Wishlist[];
}

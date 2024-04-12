import { OfferDto } from 'src/offers/dto/offer.dto';
import { WishDto } from 'src/wishes/dto/wish.dto';
import { WishlistDTO } from 'src/wishlists/dto/wishlist.dto';

export class UserDto {
  id: number;
  username: string;
  about: string;
  avatar: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  wishes: WishDto[];
  offers: OfferDto[];
  wishlists: WishlistDTO[];
}

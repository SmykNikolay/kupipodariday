import { OfferDto } from 'src/offers/dto/offer.dto';
import { UserPublicProfileResponseDto } from 'src/users/dto/userPublicProfileResponse.dto';

export class WishDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  link: string;
  image: string;
  price: number;
  raised: number;
  copied: number;
  description: string;
  owner: UserPublicProfileResponseDto;
  offers: OfferDto[];
}

import { Offer } from 'src/offers/offer.entity';

export class UserWishesDto {
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
  offers: Offer[];
}

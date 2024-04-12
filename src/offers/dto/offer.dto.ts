import { UserDto } from 'src/users/dto/user.dto';
import { WishDto } from 'src/wishes/dto/wish.dto';

export class OfferDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  item: WishDto;
  amount: number;
  hidden: boolean;
  user: UserDto;
}

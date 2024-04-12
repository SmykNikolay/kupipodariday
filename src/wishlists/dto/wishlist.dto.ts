import { UserPublicProfileResponseDto } from 'src/users/dto/userPublicProfileResponse.dto';
import { WishPartialDto } from 'src/wishes/dto/wishPartial.dto';

export class WishlistDTO {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  image: string;
  owner: UserPublicProfileResponseDto;
  items: WishPartialDto[];
}

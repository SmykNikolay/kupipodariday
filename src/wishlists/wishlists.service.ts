import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWishlistDto } from './dto/createWishlist.dto';
import { WishesService } from 'src/wishes/wishes.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishlistsService {
  constructor(
    private readonly wishesService: WishesService,
    private readonly usersService: UsersService,
    @InjectRepository(Wishlist) private wishlistsRepo: Repository<Wishlist>,
  ) {}

  async findAllWishlists(query: Partial<Wishlist>): Promise<Wishlist[]> {
    return this.wishlistsRepo.find({
      where: query,
      relations: ['owner', 'items'],
    });
  }

  async findWishlistById(query: { id: number }): Promise<Wishlist> {
    const wishlist: Wishlist = await this.wishlistsRepo.findOne({
      where: query,
      relations: ['owner', 'items'],
    });
    if (!wishlist) {
      throw new NotFoundException('Такого списка желаний не существует');
    }
    return wishlist;
  }

  async createWishlist(
    createWishListDto: CreateWishlistDto,
    currentUser: User,
  ) {
    const { itemsId, ...collectionData } = createWishListDto;
    const wishes = await this.wishesService.findManyById(itemsId);
    const user = await this.usersService.findUserById(currentUser.id);

    return await this.wishlistsRepo.save({
      ...collectionData,
      owner: user,
      items: wishes,
    });
  }

  async deleteWishlistById(
    query: { id: number },
    currentUser: User,
  ): Promise<void> {
    const wishlist: Wishlist = await this.findWishlistById(query);

    if (wishlist.owner.id !== currentUser.id) {
      throw new ForbiddenException('Вы не можете удалить чужую коллекцию');
    }
    await this.wishlistsRepo.delete(query.id);
  }
}

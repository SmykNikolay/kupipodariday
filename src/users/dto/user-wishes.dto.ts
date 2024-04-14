export class UserWishesDto {
  readonly id: number;
  readonly name: string;
  readonly link: string;
  readonly image: string;
  readonly price: number;
  readonly raised: number;
  readonly copied: number;
  readonly description: string;
  readonly offers: Offer[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

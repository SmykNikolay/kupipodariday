export class OfferDto {
  readonly id: number;
  readonly item: Wish;
  readonly amount: number;
  readonly hidden: boolean;
  readonly user: User;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

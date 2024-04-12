export class WishPartialDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  name: string;
  link?: string;
  image?: string;
  price?: number;
  raised?: number;
  copied?: number;
  description?: string;
}

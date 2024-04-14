export class UserPublicProfileResponseDto {
  readonly id: number;
  readonly username: string;
  readonly about: string;
  readonly avatar: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

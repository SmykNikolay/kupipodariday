export class UserProfileResponseDto {
  readonly id: number;
  readonly username: string;
  readonly about: string;
  readonly avatar: string;
  readonly email: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

import { IsBoolean, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
export class UpdateArtistDto {
  @ValidateIf((body) => body.name)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((body) => body.grammy)
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}

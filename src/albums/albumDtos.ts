import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @ValidateIf((body) => body.artistId !== null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null;
}
export class UpdateAlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @ValidateIf((body) => body.artistId !== null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null;
}

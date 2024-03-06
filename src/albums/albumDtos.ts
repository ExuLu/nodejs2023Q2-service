import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class AlbumCreateDto {
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
export class AlbumUpdateDto {
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

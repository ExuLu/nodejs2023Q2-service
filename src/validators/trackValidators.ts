import { IsInt, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((body) => body.artistId !== null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null;

  @ValidateIf((body) => body.artistId !== null)
  @IsString()
  @IsNotEmpty()
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  duration: number;
}
export class UpdateTrackDto {
  @IsString()
  name: string;

  @ValidateIf((body) => body.artistId !== null)
  @IsString()
  artistId: string | null;

  @ValidateIf((body) => body.artistId !== null)
  @IsString()
  albumId: string | null;

  @IsInt()
  duration: number;
}

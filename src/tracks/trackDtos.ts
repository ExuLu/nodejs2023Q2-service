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
  @ValidateIf((body) => body.name)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateIf((body) => body.artistId)
  @ValidateIf((body) => body.artistId !== null)
  @IsString()
  @IsNotEmpty()
  artistId: string | null;

  @ValidateIf((body) => body.albumId)
  @ValidateIf((body) => body.albumId !== null)
  @IsString()
  @IsNotEmpty()
  albumId: string | null;

  @ValidateIf((body) => body.duration)
  @IsInt()
  @IsNotEmpty()
  duration: number;
}

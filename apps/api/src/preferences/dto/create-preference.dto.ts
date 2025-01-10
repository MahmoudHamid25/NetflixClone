import { IsString, IsInt, Min, IsBoolean, IsArray } from 'class-validator';

export class CreatePreferenceDto {
  @IsString()
  profileId: string;

  @IsInt()
  @Min(0)
  minAge: number;

  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @IsBoolean()
  seriesPreferred: boolean;

  @IsBoolean()
  filmsPreferred: boolean;

  @IsArray()
  @IsString({ each: true })
  viewingClassification: string[];
}

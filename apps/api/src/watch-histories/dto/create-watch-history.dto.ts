import { IsString, IsInt, Min } from 'class-validator';

export class CreateWatchHistoryDto {
  @IsString()
  profileId: string; // TODO: Add validation for existing profile in the future.

  @IsString()
  contentId: string; // TODO: Add validation for existing content in the future.

  @IsString()
  stoppedAt: string;

  @IsInt()
  @Min(0)
  watchCount: number;

  @IsString()
  subtitles: string;

  @IsString()
  dubs: string;
}

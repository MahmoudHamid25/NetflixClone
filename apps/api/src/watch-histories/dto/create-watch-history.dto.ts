import { IsString, IsInt, Min, IsUUID, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWatchHistoryDto {
  @ApiProperty({
    description: 'The ID of the profile that is watching the content',
  })
  @IsUUID()
  profileId: string;

  @ApiProperty({ description: 'The ID of the content being watched' })
  @IsUUID()
  contentId: string;

  @ApiProperty({
    description: 'Timestamp indicating when the watch was stopped',
  })
  @IsString()
  stoppedAt: string;

  @ApiProperty({ description: 'Number of times the content has been watched' })
  @IsInt()
  @Min(0)
  watchCount: number;

  @ApiProperty({ description: 'The subtitles language for the content' })
  @IsString()
  @IsOptional()
  subtitles?: string;

  @ApiProperty({ description: 'The dubs language for the content' })
  @IsString()
  @IsOptional()
  dubs?: string;
}

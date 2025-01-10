import { PartialType } from '@nestjs/swagger';
import { CreateWatchHistoryDto } from './create-watch-history.dto';

export class UpdateWatchHistoryDto extends PartialType(CreateWatchHistoryDto) {}

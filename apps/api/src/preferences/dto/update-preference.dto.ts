import { PartialType } from '@nestjs/swagger';
import { CreatePreferenceDto } from './create-preference.dto';

export class UpdatePreferenceDto extends PartialType(CreatePreferenceDto) {}

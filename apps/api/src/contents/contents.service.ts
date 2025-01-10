import { Injectable } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(Content)
    private contentRepository: Repository<Content>,
  ) {}

  create(createContentDto: CreateContentDto) {
    const newContent = this.contentRepository.create(createContentDto);
    return this.contentRepository.save(newContent);
  }

  findAll() {
    return this.contentRepository.find();
  }

  findOne(id: string) {
    return this.contentRepository.findOne({ where: { id } });
  }

  update(id: string, updateContentDto: UpdateContentDto) {
    return this.contentRepository.update(id, updateContentDto);
  }

  remove(id: string) {
    return this.contentRepository.delete(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectDataSource('api_db_connection')
    private readonly dataSource: DataSource,
  ) {}

  async create(createLanguageDto: CreateLanguageDto) {
    const query = `CALL sp_create_language($1, $2)`;
    const params = [
      createLanguageDto.name,
      createLanguageDto.code,
    ];

    await this.dataSource.query(query, params);
    return { message: 'Language created successfully' };
  }

  async findAll() {
    const query = `SELECT * FROM language_view`;
    const rows = await this.dataSource.query(query);
    return rows;
  }

  async findOne(id: string) {
    const query = `SELECT * FROM language_view WHERE id = $1`;
    const rows = await this.dataSource.query(query, [id]);

    if (rows.length === 0) {
      throw new NotFoundException(`No language found with id ${id}`);
    }
    return rows[0];
  }

  async update(id: string, updateLanguageDto: UpdateLanguageDto) {
    const query = `CALL sp_update_language($1, $2, $3)`;
    const params = [
      id,
      updateLanguageDto.name,
      updateLanguageDto.code,
    ];

    await this.dataSource.query(query, params);
    return { message: 'Language updated successfully' };
  }

  async remove(id: string) {
    const query = `CALL sp_delete_language($1)`;
    await this.dataSource.query(query, [id]);
    return { message: 'Language deleted successfully' };
  }
}

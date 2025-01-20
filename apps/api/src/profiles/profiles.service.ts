import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectDataSource('api_db_connection')
    private readonly dataSource: DataSource,
  ) {}

  async create(createProfileDto: CreateProfileDto) {
    const { userId, image, dateOfBirth, languageId } = createProfileDto;

    const query = `CALL sp_create_profile($1, $2, $3, $4)`;
    const params = [userId, image, dateOfBirth, languageId];

    await this.dataSource.query(query, params);
    return { message: 'Profile created successfully' };
  }

  async findAll() {
    const query = `SELECT * FROM profile_view`;
    const rows = await this.dataSource.query(query);
    return rows;
  }

  async findOne(id: string) {
    const query = `SELECT * FROM profile_view WHERE id = $1`;
    const rows = await this.dataSource.query(query, [id]);

    if (rows.length === 0) {
      throw new NotFoundException(`No profile found with id ${id}`);
    }
    return rows[0];
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const { userId, image, dateOfBirth, languageId } = updateProfileDto;

    const query = `CALL sp_update_profile($1, $2, $3, $4, $5)`;
    const params = [id, userId, image, dateOfBirth, languageId];

    await this.dataSource.query(query, params);
    return { message: 'Profile updated successfully' };
  }

  async remove(id: string) {
    const query = `CALL sp_delete_profile($1)`;
    await this.dataSource.query(query, [id]);
    return { message: 'Profile deleted successfully' };
  }
}

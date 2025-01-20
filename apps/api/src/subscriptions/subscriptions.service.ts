import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectDataSource('api_db_connection') // Match the name defined in app.module.ts
    private readonly dataSource: DataSource,
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const query = `CALL sp_create_subscription($1, $2, $3, $4)`;
    const params = [
      createSubscriptionDto.type,
      createSubscriptionDto.cost,
      createSubscriptionDto.currency,
      createSubscriptionDto.benefits,
    ];

    await this.dataSource.query(query, params);
    return { message: 'Subscription created successfully' };
  }

  async findAll() {
    const query = `SELECT * FROM subscription_view`;
    const rows = await this.dataSource.query(query);
    return rows;
  }

  async findOne(id: string) {
    const query = `SELECT * FROM subscription_view WHERE id = $1`;
    const rows = await this.dataSource.query(query, [id]);

    if (rows.length === 0) {
      throw new NotFoundException(`No subscription found with id ${id}`);
    }
    return rows[0];
  }

  async update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    const query = `CALL sp_update_subscription($1, $2, $3, $4, $5)`;
    const params = [
      id,
      updateSubscriptionDto.type,
      updateSubscriptionDto.cost,
      updateSubscriptionDto.currency,
      updateSubscriptionDto.benefits,
    ];

    await this.dataSource.query(query, params);
    return { message: 'Subscription updated successfully' };
  }

  async remove(id: string) {
    const query = `CALL sp_delete_subscription($1)`;
    await this.dataSource.query(query, [id]);
    return { message: 'Subscription deleted successfully' };
  }
}

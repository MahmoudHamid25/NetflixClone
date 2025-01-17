import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './entities/subscription.entity';

@ApiTags('Subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new subscription' })
  @ApiResponse({
    status: 201,
    description: 'The subscription has been successfully created.',
    type: Subscription,
  })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all subscriptions' })
  @ApiResponse({
    status: 200,
    description: 'A list of subscriptions.',
    type: [Subscription],
  })
  findAll() {
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a subscription by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the subscription',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'The subscription details.',
    type: Subscription,
  })
  @ApiResponse({ status: 404, description: 'Subscription not found.' })
  findOne(@Param('id') id: string) {
    return this.subscriptionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a subscription by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the subscription',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'The updated subscription details.',
    type: Subscription,
  })
  @ApiResponse({ status: 404, description: 'Subscription not found.' })
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionsService.update(id, updateSubscriptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a subscription by ID' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the subscription',
    example: '123',
  })
  @ApiResponse({
    status: 200,
    description: 'The subscription has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Subscription not found.' })
  remove(@Param('id') id: string) {
    return this.subscriptionsService.remove(id);
  }
}

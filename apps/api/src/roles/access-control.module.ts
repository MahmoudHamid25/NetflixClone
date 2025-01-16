import { Module } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [AccessControlModule],
  providers: [
    AccessControlService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [AccessControlService],
})
export class AccessControlModule {}

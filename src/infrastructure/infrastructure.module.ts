import { Module } from '@nestjs/common';
import { StorageService } from './storage/storage.service';
import { QueueService } from './queue/queue.service';
import { AuthStrategy } from './auth/auth.strategy';
import { AuthService } from './auth/auth.service';

@Module({
  providers: [StorageService, QueueService, AuthStrategy, AuthService],
  exports: [StorageService, QueueService, AuthStrategy, AuthService],
})
export class InfrastructureModule {}

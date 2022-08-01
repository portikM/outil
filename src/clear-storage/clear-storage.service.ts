import { Injectable } from '@nestjs/common';
import { QueueMessage } from '../infrastructure/queue/interfaces/queue-message.interface';
import { StorageService } from '../infrastructure/storage/storage.service';

const { OUTPUT_BUCKET = '' } = process.env;

@Injectable()
export class ClearStorageService {
  constructor(private storageService: StorageService) {}

  async deleteStaleObjects(staleObjects: QueueMessage): Promise<void> {
    for (const object of staleObjects.batch) {
      await this.storageService.deleteObject(
        staleObjects.bucket,
        object.Key as string,
      );
    }
  }

  async deleteObject(key: string): Promise<void> {
    return this.storageService.deleteObject(OUTPUT_BUCKET, key);
  }
}

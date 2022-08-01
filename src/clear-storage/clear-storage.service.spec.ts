import { Test, TestingModule } from '@nestjs/testing';
import { ClearStorageService } from './clear-storage.service';

describe('ClearStorageService', () => {
  let service: ClearStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClearStorageService],
    }).compile();

    service = module.get<ClearStorageService>(ClearStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

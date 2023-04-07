import { Test, TestingModule } from '@nestjs/testing';
import { SaleService } from './sale.service';

describe('SaleService', () => {
  let service: SaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaleService],
    }).compile();

    service = module.get<SaleService>(SaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of sales', async () => {
    const sales = await service.findAll();
    expect(sales).toBeInstanceOf(Array);
  });

  it('should return a message when a file is uploaded', async () => {
    const file = {
      path: 'src/app/sale/sale.controller.spec.ts',
    };
    const message = await service.create(file);
    expect(message).toHaveProperty('message');
  });
});

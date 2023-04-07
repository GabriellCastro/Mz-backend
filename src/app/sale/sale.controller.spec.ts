import { Test, TestingModule } from '@nestjs/testing';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

describe('SaleController', () => {
  let controller: SaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaleController],
      providers: [SaleService],
    }).compile();

    controller = module.get<SaleController>(SaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of sales', async () => {
    const sales = await controller.findAll();
    expect(sales).toBeInstanceOf(Array);
  });

  it('should return a message when a file is uploaded', async () => {
    const file = {
      path: 'src/app/sale/sale.controller.spec.ts',
    };
    const message = await controller.uploadFile(file);
    expect(message).toHaveProperty('message');
  });
});

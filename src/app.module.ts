import { Module } from '@nestjs/common';
import { SaleModule } from './app/sale/sale.module';

@Module({
  imports: [SaleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

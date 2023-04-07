import { Module } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  controllers: [SaleController],
  providers: [SaleService, PrismaService],
  imports: [
    MulterModule.register({
      dest: `./upload`,
    }),
  ],
})
export class SaleModule {}

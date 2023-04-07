import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as readline from 'readline';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async create(file: any) {
    const typeRegex = '(\\d{1})';
    const dateRegex =
      '(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}-\\d{2}:\\d{2})';
    const productRegex = '([A-Z\\s-]+)';
    const valueRegex = '(\\d+\\.?\\d{0,2})';
    const vendorRegex = '([A-Z\\s]+)';

    const regex = new RegExp(
      `^${typeRegex}${dateRegex}${productRegex}${valueRegex}${vendorRegex}$`,
    );
    const readStream = fs.createReadStream('./' + file.path);
    const lineReader = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    const promises = [];

    lineReader.on('line', (line) => {
      const match = line.match(regex);
      if (match) {
        const [, type, date, product, value, vendor] = match;
        promises.push(
          this.prisma.sale.create({
            data: {
              type: parseInt(type),
              data: new Date(date),
              product,
              value: parseInt(value),
              vendor,
            },
          }),
        );
      }
    });

    await new Promise((resolve) => {
      lineReader.once('close', () => {
        resolve(true);
      });
    });

    await Promise.all(promises);

    return { message: 'File uploaded successfully' };
  }

  findPage(page: number) {
    return this.prisma.sale.findMany({
      take: 10,
      skip: (page - 1) * 10,
    });
  }

  findAll() {
    return this.prisma.sale.findMany();
  }

  serachByType(type: number) {
    return this.prisma.sale.findMany({
      where: {
        type: type,
      },
    });
  }
}

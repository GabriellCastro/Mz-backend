import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { SaleService } from './sale.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: any) {
    return this.saleService.create(file);
  }

  @Get(':page')
  findPage(@Param('page', ParseIntPipe) page: number) {
    return this.saleService.findPage(page);
  }

  @Get()
  findAll() {
    return this.saleService.findAll();
  }

  @Get('by-type/:type')
  serachByType(@Param('type', ParseIntPipe) type: number) {
    return this.saleService.serachByType(type);
  }
}

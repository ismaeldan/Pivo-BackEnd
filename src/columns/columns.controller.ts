import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createColumnDto: CreateColumnDto) {
    const mockUserId = 'COLE_UM_USER_ID_VALIDO_DO_SEU_DB_AQUI';

    const columnDataComAutor = {
      ...createColumnDto,
      authorId: mockUserId,
    };

    return this.columnsService.create(columnDataComAutor);
  }

  @Get()
  findAll() {
    return this.columnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnDto: UpdateColumnDto) {
    return this.columnsService.update(id, updateColumnDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.columnsService.remove(id);
  }
}
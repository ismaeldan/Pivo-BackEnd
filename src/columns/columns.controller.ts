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
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from 'src/db/schema';
interface AuthenticatedRequest extends Request {
  user: { userId: string; email: string };
}

class FindAllTasksDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @IsString()
  @IsOptional()
  q?: string;
}

@Controller('columns')
@UseGuards(JwtAuthGuard)
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body() createColumnDto: CreateColumnDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;
    const columnDataComAutor = { ...createColumnDto, authorId: userId };
    return this.columnsService.create(columnDataComAutor);
  }
  
  @Get()
  findAll(
    @Request() req: AuthenticatedRequest,
    @Query() queryParams: FindAllTasksDto,
  ) {
    const userId = req.user.userId;
    
    return this.columnsService.findAll(
      userId,
      queryParams.status,
      queryParams.q,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.columnsService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateColumnDto: UpdateColumnDto,
    @Request() req: AuthenticatedRequest,
  ) {
    const userId = req.user.userId;
    return this.columnsService.update(id, updateColumnDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string, @Request() req: AuthenticatedRequest) {
    const userId = req.user.userId;
    return this.columnsService.remove(id, userId);
  }
}
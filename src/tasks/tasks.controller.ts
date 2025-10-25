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
  ParseUUIDPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto) {
    
    const mockUserId = 'COLE_UM_USER_ID_VALIDO_DO_SEU_DB_AQUI';

    const taskDataComAutor = {
      ...createTaskDto,
      authorId: mockUserId,
    };
    
    return this.tasksService.create(taskDataComAutor);
  }
  
  @Get()
  findAll() {
    
    return this.tasksService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {

    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.tasksService.remove(id);
  }
}
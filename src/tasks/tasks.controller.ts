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
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/db/schema';

class FindAllTasksDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus; 
}

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto) {
    
    const mockUserId = 'hk099xu4p7ax87ktaoy7ezr2';

    const taskDataComAutor = {
      ...createTaskDto,
      authorId: mockUserId,
    };
    
    return this.tasksService.create(taskDataComAutor);
  }
  
  @Get()
  findAll( @Query() queryParams: FindAllTasksDto ) {
    const mockUserId = 'hk099xu4p7ax87ktaoy7ezr2'
    
    return this.tasksService.findAll(mockUserId, queryParams.status);
  }

  @Get('search') 
  async searchTasks(
    @Query('q') searchQuery: string,
  ) {
    if (!searchQuery) {
      return [];
    }

    const mockUserId = 'hk099xu4p7ax87ktaoy7ezr2';

    const results = await this.tasksService.search(searchQuery, mockUserId);

    return results;
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {

    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
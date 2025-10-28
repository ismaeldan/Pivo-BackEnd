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
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from 'src/db/schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

interface AuthenticatedRequest extends Request {
  user: { userId: string; email: string; };
}

class FindAllTasksDto {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus; 
}

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTaskDto: CreateTaskDto, @Request() req: AuthenticatedRequest) {
    
    const userId = req.user.userId

    const taskDataComAutor = {
      ...createTaskDto,
      authorId: userId,
    };
    
    return this.tasksService.create(taskDataComAutor);
  }
  
  @Get()
  findAll( @Query() queryParams: FindAllTasksDto, @Request() req: AuthenticatedRequest ) {
    const userId = req.user.userId
    
    return this.tasksService.findAll(userId, queryParams.status);
  }

  @Get('search') 
  async searchTasks(
    @Query('q') searchQuery: string,
    @Request() req: AuthenticatedRequest
  ) {
    if (!searchQuery) {
      return [];
    }

    const userId = req.user.userId

    const results = await this.tasksService.search(searchQuery, userId);

    return results;
  }
  
  @Get(':id')
  findOne(@Param('id') id: string,
    @Request() req: AuthenticatedRequest) {

      const userId = req.user.userId
    
    return this.tasksService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req: AuthenticatedRequest
  ) {
    const userId = req.user.userId

    return this.tasksService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string,
    @Request() req: AuthenticatedRequest) {

    const userId = req.user.userId

    return this.tasksService.remove(id, userId);
  }
}
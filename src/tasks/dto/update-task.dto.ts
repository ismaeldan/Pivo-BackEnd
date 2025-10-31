import { IsString, IsUUID, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { TaskStatus } from 'src/db/schema';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  columnId?: string;
  
  @IsNumber()
  @IsOptional()
  order?: number;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
import { IsNotEmpty, IsString, IsOptional, IsUUID, IsNumber, IsEnum  } from 'class-validator';
import { TaskStatus } from 'src/db/schema';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  columnId: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
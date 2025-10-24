import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}
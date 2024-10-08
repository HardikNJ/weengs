import { IsNotEmpty, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['pending', 'completed'])
  status: string;

  @IsOptional()
  completed_at?: Date;
}

import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  @IsIn(['pending', 'completed'])
  status?: string;

  @IsOptional()
  completed_at?: Date;
}

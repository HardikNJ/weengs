import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks with pagination' })
  @ApiQuery({
    name: 'skip',
    required: false,
    description: 'Number of tasks to skip',
  })
  @ApiQuery({
    name: 'take',
    required: false,
    description: 'Number of tasks to take',
  })
  @ApiResponse({ status: 200, description: 'Return all tasks' })
  findAll(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ): Promise<Task[]> {
    return this.tasksService.findAll({ skip, take });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Return task with specified ID' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  findOne(@Param('id') id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() task: Partial<Task>): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  update(@Param('id') id: number, @Body() task: Partial<Task>): Promise<any> {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a task by ID' })
  @ApiParam({ name: 'id', description: 'Task ID' })
  @ApiResponse({ status: 200, description: 'Task soft-deleted successfully' })
  softDelete(@Param('id') id: number): Promise<any> {
    return this.tasksService.softDelete(id);
  }
}

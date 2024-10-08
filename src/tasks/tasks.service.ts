import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // Find all tasks with optional pagination (skip and take)
  //   findAll(options?: { skip?: number; take?: number }): Promise<Task[]> {
  //     return this.tasksRepository.find(options);
  //   }

  async findAll(options?: {
    skip?: number;
    take?: number;
  }): Promise<Partial<Task[]>> {
    return this.tasksRepository.find({
      select: ['id', 'title', 'description', 'status', 'completed_at'],
      where: { deletedAt: null },
      skip: options?.skip,
      take: options?.take,
    });
  }

  // Find a task by ID
  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
      select: ['id', 'title', 'description', 'status', 'completed_at'], // Select only specific fields
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  // Create a new task
  create(task: Partial<Task>): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  // Update a task, set completed_at if status is 'completed'
  async update(id: number, task: Partial<Task>): Promise<any> {
    const existingTask = await this.tasksRepository.findOne({ where: { id } });

    if (!existingTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (task.status === 'completed') {
      task.completed_at = new Date();
    }

    await this.tasksRepository.update(id, task);
    return { message: 'Task updated successfully' }; // Return success message
  }

  // Soft delete a task
  async softDelete(id: number): Promise<any> {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.tasksRepository.softDelete(id);
    return { message: 'Task soft deleted successfully' };
  }
}

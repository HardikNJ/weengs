import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(options?: { skip?: number; take?: number }): Promise<Task[]> {
    return this.tasksRepository.find(options);
  }

  findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOne({ where: { id } });
  }

  create(task: Partial<Task>): Promise<Task> {
    const newTask = this.tasksRepository.create(task);
    return this.tasksRepository.save(newTask);
  }

  update(id: number, task: Partial<Task>): Promise<any> {
    return this.tasksRepository.update(id, task);
  }

  softDelete(id: number): Promise<any> {
    return this.tasksRepository.softDelete(id);
  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskDto } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: TaskDto[] = [];

  getAllTasks(): TaskDto[] {
    return this.tasks
  }

  getTaskById(id: string): TaskDto {

    const task = this.tasks.find(task => task.id == id)

    if(!task) {
      throw new NotFoundException('Task is not found')
    }

    return task
  
  }

  createTask(TaskDto: TaskDto): TaskDto {

      this.tasks.push({
        id: (this.tasks.length + 1).toString()
        , ...TaskDto
      });

    return this.tasks.at(-1);
    
  }

  updateTask(id: string, TaskDto: TaskDto): TaskDto {

    const task = this.tasks.find(value => value.id = id)

    const updatedTask = {
      id: task.id,
      ...TaskDto
    }

    if(!task) {
      throw new NotFoundException('Task is not found')
    };

    this.tasks.splice(this.tasks.indexOf(task), 1, updatedTask);

    return updatedTask;
  }

  deleteTask(id: string): TaskDto {

    const task = this.tasks.find(task => task.id == id);

    if(!task) {
      throw new NotFoundException('Task is not found')
    };

    this.tasks.splice(this.tasks.indexOf(task), 1);

    return task;

  }
} 

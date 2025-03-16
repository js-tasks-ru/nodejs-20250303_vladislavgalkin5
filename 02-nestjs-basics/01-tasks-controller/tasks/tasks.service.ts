import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";
import { IsNotEmpty } from "@nestjs/class-validator"

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTaskById(id: string): Task {

    const task = this.tasks.find(task => task.id == id)

    return task
  
  }

  createTask(task: Task): Task {

      this.tasks.push({

        id: (this.tasks.length + 1).toString()
        , ...task

      }) 

    return this.tasks.at(-1)
    
  }

  updateTask(id: string, update: Task): Task[] {

    const task = this.tasks.indexOf(this.tasks.find(task => task.id == id));

    this.tasks.splice(task, 1, update)

    return this.tasks
  }

  deleteTask(id: string): Task[] {

    const task = this.tasks.find(task => task.id == id)

    this.tasks.splice(this.tasks.indexOf(task), 1)

    return this.tasks

  }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { Task, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks
  }

  // getTaskById(id: string): Task {}

  createTask(task: Task): Task {

    if (Object.values(TaskStatus).includes(task.status)){

      this.tasks.push({
        id: (this.tasks.length + 1).toString(), 
        ...task
      }) 

    } else {

      throw new TypeError (`The status should be one of the following: ${Object.values(TaskStatus)}`);

    }

    return this.tasks.at(-1)
    
  }

  // updateTask(id: string, update: Task): Task {}

//   deleteTask(id: string): Task {
//     let task = this.tasks.find(task => task.id == id)

//     this.tasks.splice(this.tasks.indexOf(task), 1)

//     return this.tasks
//   }
}
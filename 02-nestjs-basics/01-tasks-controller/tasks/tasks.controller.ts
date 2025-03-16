import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  // @Get(":id")
  // getTaskById(@Param("id") id: string) {
  //   this.tasksService.getTaskById()
  // }

  @Post()
  createTask(@Body() task: Task) {
    return this.tasksService.createTask(task);
  }

  // @Patch(":id")
  // updateTask(@Param("id") id: string, @Body() task: Task) {
  //   this.tasksService.updateTask()
  // }

  // @Delete(":id")
  // deleteTask(@Param("id") id: string) {
  //   return this.tasksService.deleteTask(id)
  // }
}

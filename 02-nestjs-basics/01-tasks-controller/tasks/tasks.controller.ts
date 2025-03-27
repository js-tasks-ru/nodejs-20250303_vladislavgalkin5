import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
  ParseIntPipe
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskDto } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(
    @Param("id") id: string) {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(@Body(ValidationPipe) TaskDto: TaskDto) {
    return this.tasksService.createTask(TaskDto);
  }

  @Patch(":id")
  updateTask(
    @Param("id", ParseIntPipe) id: string, 
    @Body(ValidationPipe) TaskDto: TaskDto) {
    return this.tasksService.updateTask(id, TaskDto)
  }

  @Delete(":id")
  deleteTask(
    @Param("id", ParseIntPipe) id: string) {
    return this.tasksService.deleteTask(id)
  }
}
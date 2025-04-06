import { Controller, Get, Post, Patch, Delete, Body, Param } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create() {
  }

  @Get()
  findAll() {
    return this.tasksService.findAll()
  }

  @Get(":id")
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id)
  }

  @Patch(":id")
  update() {}

  @Delete(":id")
  remove() {}
}

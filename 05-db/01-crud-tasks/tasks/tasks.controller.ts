import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(
    @Query('limit') limit?: number,
    @Query('page') page?: number) {
    return this.tasksService.findAll(page, limit)
  }

  @Get(":id")
  findOne(
    @Param('id', ParseIntPipe) id: number) {
    return this.tasksService.findOne(id)
  }

  @Patch(":id")
  update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(":id")
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.remove(id)
  }
}

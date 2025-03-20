import { BadRequestException, Controller, Get, ParseIntPipe, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskStatus } from "./task.model";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query("status") status?: TaskStatus,
    @Query("page") page?: number,
    @Query("limit") limit?: number,
    @Query("sortBy") sortBy?: string
  ) {

    if (status && !Object.values(TaskStatus).includes(status as TaskStatus)){
      throw new BadRequestException(`The "${status}" is not allowed. Allowed values: ${Object.values(TaskStatus)}`)
    } 

    return this.tasksService.getFilteredTasks(status, page, limit, sortBy);
  }
}

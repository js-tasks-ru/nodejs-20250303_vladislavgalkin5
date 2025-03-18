import { BadRequestException, Injectable} from "@nestjs/common";
import { TaskDto, TaskStatus } from "./task.model";

@Injectable()
export class TasksService {
  private tasks: TaskDto[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    }
  ];

  getFilteredTasks(
    status?: TaskStatus,
    page?: number,
    limit?: number,
    sortBy?: string
  ): TaskDto[] {

    let filteredTasks = this.tasks;


    if (status){
      filteredTasks = this.tasks.filter(task => task.status === status); 
    };

    if (sortBy){
      filteredTasks.sort((a,b) => a[sortBy] > b[sortBy] ? 1 : -1);
    };

    if (page && limit){
    
      if (page <= 0 && limit <= 0){
        throw new BadRequestException('The "page" and/or "limit" must be positive number')
      }

      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit

      return filteredTasks.slice(startIndex, endIndex);
    }


    return filteredTasks;
  }
}
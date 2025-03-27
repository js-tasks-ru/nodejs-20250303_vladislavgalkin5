import { Injectable, NotFoundException, LoggerService } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, UpdateTaskDto } from "./task.model";
import { UsersService } from "../users/users.service";
import { NotificationsService } from "../notifications/notifications.service";

@Injectable()
export class TasksService {
  
  private tasks: Task[] = [];

  constructor(
    private readonly userService: UsersService,
    private readonly notificationService: NotificationsService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;
    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };

    this.tasks.push(task);
    
    this.notificationService.sendEmail(this.userService.getUserById(task.assignedTo).email, 'Новая задача', `Вы назначены ответственным за задачу: "${task.title}"`)

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    const updatedFields = [];
    if (updateTaskDto.description) updatedFields.push("Описание");
    if (updateTaskDto.status) updatedFields.push("Статус");
    if (updateTaskDto.title) updatedFields.push("Заголовок");

    const updatedFieldsText = updatedFields.join(", ");
    const updatedValuesText = Object.values(updateTaskDto).join(", ");
    const isMultiple = updatedFields.length > 1 ? "обновлены" : "обновлён";

    const message = `${updatedFieldsText} задачи "${task.title}" ${isMultiple} на "${updatedValuesText}"`;

    this.notificationService.sendSMS(
      this.userService.getUserById(task.assignedTo).phone,
      message
    );

    Object.assign(task, updateTaskDto);
    return task;
  }
}

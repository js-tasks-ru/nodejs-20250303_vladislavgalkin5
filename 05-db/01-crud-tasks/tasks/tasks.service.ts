import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}
  
  async create(createTaskDto: CreateTaskDto) {
    const task = new Task();

    task.title = createTaskDto.title;
    task.description = createTaskDto.description;

    await this.taskRepository.save(task);

    return this.findOne(task.id);
  }

  async findAll() {
    return this.taskRepository.find()
  }

  async findOne(id: number) {

    const task = await this.taskRepository.findOne({ where: { id: id }})
    
    if (!task){
      throw new NotFoundException('Задача не найдена')
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {}

  async remove(id: number): Promise<void> {}
}

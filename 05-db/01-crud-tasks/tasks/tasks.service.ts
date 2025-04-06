import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}
  
  create(createTaskDto: CreateTaskDto) {}

  async findAll() {
    return this.taskRepository.find()
  }

  async findOne(id: number) {
    return this.taskRepository.findOne({ where: { id: id }})
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {}

  async remove(id: number): Promise<void> {}
}

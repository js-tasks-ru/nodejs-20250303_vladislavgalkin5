import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "./schemas/task.schema";
import { Model, ObjectId } from "mongoose";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private TaskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto):Promise<CreateTaskDto> {
    
    const task = await this.TaskModel.create(createTaskDto)
    
    return task;
  }

  async findAll():Promise<CreateTaskDto[]> {
    return this.TaskModel.find().exec()
  }

  async findOne(id: ObjectId) : Promise<CreateTaskDto>{
    const task = await this.TaskModel.findById(id).exec();

    if (!task){
      throw new NotFoundException(`Task with id ${id} is not found`);
    }

    return task;
  }

  async update(id: ObjectId, updateTaskDto: UpdateTaskDto) : Promise<UpdateTaskDto> {

    const updatedTask = await this.TaskModel.findByIdAndUpdate(id, updateTaskDto, { new : true }).exec();

    if (!updatedTask){
      throw new NotFoundException(`The task with is ${id} is not found`);
    }

    return updatedTask.toObject() as UpdateTaskDto;
  }

  async remove(id: ObjectId):Promise<{message: string}> {

    const deletedTask = await this.TaskModel.findByIdAndDelete(id, { new: true })

    if (!deletedTask) {
      throw new NotFoundException(`The task with is ${id} is not found`);
    }

    return {
      message: `The task ${id} is deleted.`
    }
  }
}

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
    
    return this.findOne(task.id);
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
    
    await this.findOne(id)

    const updatedTask = await this.TaskModel.findOneAndUpdate(
      {'_id': id}, 
      updateTaskDto,
      {new: true}).exec();

    return updatedTask;
  }

  async remove(id: ObjectId):Promise<{message: string}> {
    
    await this.findOne(id)

    await this.TaskModel.findOneAndDelete({'_id': id}).exec();

    return {
      message: `The task ${id} is deleted.`
    }
  }
}

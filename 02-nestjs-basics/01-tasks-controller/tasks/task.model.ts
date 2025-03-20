import { IsNotEmpty, IsEnum, IsString }  from "@nestjs/class-validator"

export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export class TaskDto {

  id?: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum(Object.values(TaskStatus), {
    message: `Status should be one of the: ${Object.values(TaskStatus)}`
  })
  status: TaskStatus;
}
export enum TaskStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
}

export interface TaskDto {

  id?: string;
  title: string;
  description: string;
  status: TaskStatus;

}
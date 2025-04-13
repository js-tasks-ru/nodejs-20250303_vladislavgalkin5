import { IsString, IsNotEmpty, IsOptional, Length, IsBoolean } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @Length(10)
    title: string;
    
    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @IsBoolean()
    isCompleted?: boolean;
}

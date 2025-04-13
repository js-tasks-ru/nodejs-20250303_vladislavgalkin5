import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    
    @Prop({
        type: 'string',
        unique: true
    })
    title: string
    
    @Prop({
        type: 'string',
        default: ''
    })
    description: string 
    
    @Prop({
        type: 'boolean',
        default: false
    })
    isCompleted: boolean
}

export const TaskSchema = SchemaFactory.createForClass(Task);
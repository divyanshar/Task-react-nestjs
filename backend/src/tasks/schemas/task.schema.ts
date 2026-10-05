import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
export type TaskDocument = HydratedDocument<Task>;
@Schema()
export class Task {
  @Prop({
    type: String,
    default: uuidv4,
    unique: true,
  })
  id: string;

  @Prop({
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    trim: true,
  })
  description: string;

  @Prop({
    required: true,
    enum: ['PENDING', 'IN PROGRESS', 'COMPLETED'],
    default: 'PENDING',
  })
  status: string;

  @Prop({
    required: true,
    enum: ['LOW', 'MEDIUM', 'HIGH'],
    default: 'MEDIUM',
  })
  priority: string;

  @Prop({
    required: true,
    index: true,
  })
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
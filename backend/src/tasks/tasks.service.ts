import {BadRequestException,Injectable,InternalServerErrorException,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Task,TaskDocument} from './schemas/task.schema.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';

@Injectable()
export class TasksService {
  constructor( @InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
  ) {}
  async create(createTaskDto: CreateTaskDto,userId: string) {
    try {
      const task = new this.taskModel({
        ...createTaskDto,
        userId,
      });
      return await task.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async findAll(userId: string,search?: string,status?: string,priority?: string,) {
  try {
    const filter: any = {userId};

    if (status) {
      filter.status = status;
    }

    if (priority) {
      filter.priority = priority;
    }

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          description: {
            $regex: search,
            $options: 'i',
          },
        },
      ];
    }

    return await this.taskModel.find(filter);
  } catch (error) {
    throw new InternalServerErrorException(
      'Failed to fetch tasks',
    );
  }
}

  async findOne(id: string, userId: string) {
    try {
      const task = await this.taskModel
        .findOne({
          id,
          userId,
        })
      if (!task) {
        throw new NotFoundException(
          'Task not found',
        );
      }

      return task;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to fetch task',
      );
    }
  }

  async update(id: string,updateTaskDto: UpdateTaskDto,userId: string) {
    try {
      const task = await this.taskModel.findOneAndUpdate({id,userId},{$set: updateTaskDto},{new: true,runValidators: true},
        );

      if (!task) {
        throw new NotFoundException(
          'Task not found',
        );
      }

      return task;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to update task',
      );
    }
  }
  async remove(id: string,userId: string) {
    try {
      const task = await this.taskModel.findOneAndDelete({id,userId});

      if (!task) {
        throw new NotFoundException(
          'Task not found',
        );
      }

      return {
        message: 'Task deleted successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Failed to delete task',
      );
    }
  }
}
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';

import { TasksService } from './tasks.service.js';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import type { AuthRequest } from '../auth/types/auth-request.js';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() request: AuthRequest,
  ) {
    return this.tasksService.create(createTaskDto,request.user.userId);
  }

  @Get()
  findAll(
    @Req() request: AuthRequest,
    @Query('search') search?: string,
    @Query('status') status?: string,
    @Query('priority') priority?: string,
  ) {
    return this.tasksService.findAll(
      request.user.userId,
      search,
      status,
      priority,
    );
  }

  @Get(':id')
  findOne(
    @Param('id',ParseUUIDPipe) id: string,
    @Req() request: AuthRequest,
  ) {
    return this.tasksService.findOne(
      id,
      request.user.userId,
    );
  }

  @Patch(':id')
  update(
    @Param('id',ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() request: AuthRequest,
  ) {
    return this.tasksService.update(
      id,
      updateTaskDto,
      request.user.userId,
    );
  }

  @Delete(':id')
  remove(
    @Param('id',ParseUUIDPipe) id: string,
    @Req() request: AuthRequest,
  ) {
    return this.tasksService.remove(
      id,
      request.user.userId,
    );
  }
}
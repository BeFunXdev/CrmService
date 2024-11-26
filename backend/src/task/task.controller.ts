import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import { TaskService } from './task.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {CurrentUser} from "../auth/decorators/user.decorator";
import {TaskDto} from "./dto/task.dto";

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @Auth()
  async getAll(@CurrentUser('id') id: string) {
    return this.taskService.getAll(id)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async create(@CurrentUser('id') id: string, @Body() dto: TaskDto) {
    return this.taskService.create(id, dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async update(@CurrentUser('id') id: string, @Body() dto: TaskDto, @Param('id') taskId: string) {
    return this.taskService.update(dto, id, taskId)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') taskId: string) {
    return this.taskService.delete(taskId)
  }
}

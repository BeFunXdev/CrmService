import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import { TimeBlockingService } from './time-blocking.service';
import {Auth} from "../auth/decorators/auth.decorator";
import {CurrentUser} from "../auth/decorators/user.decorator";
import {TimeBlockingDto} from "./dto/time-blocking.dto";

@Controller('time-blocks')
export class TimeBlockingController {
  constructor(private readonly timeBlockingService: TimeBlockingService) {}

  @Get()
  @Auth()
  async getAll(@CurrentUser('id') id: string) {
    return this.timeBlockingService.getAll(id)
  }

  @Get('today')
  @Auth()
  async getToDay(@CurrentUser('id') id: string) {
    return this.timeBlockingService.getToDay(id)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  @Auth()
  async create(@CurrentUser('id') id: string,@Body() dto: TimeBlockingDto) {
    return this.timeBlockingService.create(id, dto)
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  @Auth()
  async update(
      @Param('id') timeBlockId: string,
      @Body() dto: TimeBlockingDto
  ) {
    return this.timeBlockingService.update(timeBlockId, dto)
  }

  @UsePipes(new ValidationPipe())
  @Put('update-order')
  @HttpCode(200)
  @Auth()
  async updateOder(@Body() ids: string[]) {
    return this.timeBlockingService.updateOrder(ids)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async delete(@Param('id') id: string) {
    return this.timeBlockingService.delete(id)
  }
}

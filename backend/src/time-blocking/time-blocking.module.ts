import { Module } from '@nestjs/common';
import { TimeBlockingService } from './time-blocking.service';
import { TimeBlockingController } from './time-blocking.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [TimeBlockingController],
  providers: [TimeBlockingService, PrismaService],
})
export class TimeBlockingModule {}

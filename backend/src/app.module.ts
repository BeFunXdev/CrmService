import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { TimeBlockingModule } from './time-blocking/time-blocking.module';

@Module({
  imports: [AuthModule, UserModule, TaskModule, TimeBlockingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

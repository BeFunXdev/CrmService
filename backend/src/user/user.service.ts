import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {AuthRegisterDto} from "../auth/dto/auth.dto";
import {hash} from "argon2";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
      return this.prisma.user.findUnique({
          where: {
              id
          },
          include: {
              tasks: true
          }
      });
  }

  async getByEmail(email: string) {
      return this.prisma.user.findUnique({
          where: {
              email
          }
      })
  }

  async create(dto: AuthRegisterDto) {
      const user = {
          email: dto.email,
          name: dto.name,
          password: await hash(dto.password)
      }

      return this.prisma.user.create({
          data: user
      })
  }

  async delete(userId: string) {
      this.prisma.user.delete({
          where: {
              id: userId
          }
      })
  }

  async getProfile(userId: string) {
      const profile = await this.getById(userId)
      const {password, ...rest } = profile

      const totalTasks = profile.tasks.length
      const completedTasks= await this.prisma.task.count({
          where: {
              userId,
              isComplited: true
          }
      })



      return {
          user: rest,
          statistics: [
              {label: "Total", value: totalTasks},
              {label: "Completed Tasks", value: completedTasks}
          ]
      }
  }
}

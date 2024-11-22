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
      const profile = this.getById(userId)


  }
}

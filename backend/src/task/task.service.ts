import {BadRequestException, Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {TaskDto} from "./dto/task.dto";

@Injectable()
export class TaskService {
    constructor(
       private prisma: PrismaService
    ) {}

    async getAll(id: string) {
        return this.prisma.task.findMany({
            where: {
                userId: id
            }
        })
    }

    async create(userId: string, dto: TaskDto) {
        if (!dto.name) {
            throw new BadRequestException('No data')
        }
        return this.prisma.task.create({
            data: {
                name: dto.name,
                priority: dto.priority,
                isComplited: dto.isCompleted,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    }

    async update(dto: Partial<TaskDto>, userId: string, taskId: string) {
        return this.prisma.task.update({
            where: {
                userId: userId,
                id: taskId
            },
            data: {
                name: dto.name,
                priority: dto.priority,
                isComplited: dto.isCompleted
            }
        })
    }

    async delete(taskId: string) {
        return this.prisma.task.delete({
            where: {
                id: taskId
            }
        })
    }
}

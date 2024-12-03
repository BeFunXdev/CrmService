import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {getDay} from "date-fns";
import {Week} from "@prisma/client";
import {TimeBlockingDto} from "./dto/time-blocking.dto";

@Injectable()
export class TimeBlockingService {
    constructor(
        private prisma: PrismaService
    ) {}

    async getAll(userId: string) {
        return this.prisma.timeBlock.findMany({
            where: {
                userId
            }
        })
    }

    async getToDay(userId: string) {
        const weekDay = getDay(new Date())

        const result = this.prisma.timeBlock.findFirst({
            where: {
                userId,
                weekDay: this.getWeekDay(weekDay)
            }
        })

        if (!result) {
            return this.prisma.timeBlock.findFirst({
                where: {
                    userId,
                    weekDay: Week.everyday
                }
            })
        } else {
            return result
        }
    }

    async create(userId: string, dto: TimeBlockingDto) {
        return this.prisma.timeBlock.create({
            data: {
                ...dto,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        })
    }

    async update(timeBlockId: string, dto: Partial<TimeBlockingDto>) {
        return this.prisma.timeBlock.update({
            where: {
                id: timeBlockId
            },
            data: dto
        })
    }

    async updateOrder(ids: string[]) {
        return this.prisma.$transaction(
            ids.map((id, order) => this.prisma.timeBlock.update({
                where: {id},
                data: {order}
            }))
        )
    }

    async delete(timeBlockId: string) {
        return this.prisma.timeBlock.delete({
            where: {
                id: timeBlockId
            }
        })
    }

    private getWeekDay(weekNumber: number) {
        switch (weekNumber) {
            case 0:
                return Week.sunday
            case 1:
                return Week.monday
            case 2:
                return Week.tuesday
            case 3:
                return Week.wednesday
            case 4:
                return Week.thursday
            case 5:
                return Week.friday
            case 6:
                return Week.saturday
        }
    }
}

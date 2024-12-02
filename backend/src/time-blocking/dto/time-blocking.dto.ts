import {IsArray, IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {Week} from "@prisma/client";
import {Transform} from "class-transformer";

export class TimeBlockingDto {
    @IsString()
    @IsOptional()
    name: string

    @IsNumber()
    @IsOptional()
    timeMinutes: number

    @IsNumber()
    @IsOptional()
    order: number

    @IsEnum(Week)
    @Transform(({value}) => ('' + value).toLowerCase())
    @IsOptional()
    weekDay: Week
}

export class UpdateOrderDto {
    @IsArray()
    @IsString({each: true})
    ids: string[]
}
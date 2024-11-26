import {Priority} from "@prisma/client";
import {IsBoolean, IsEnum, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";

export class TaskDto {
    @IsString()
    @IsOptional()
    name: string

    @IsEnum(Priority)
    @IsOptional()
    @Transform(({value}) => ('' + value).toLowerCase())
    priority: Priority

    @IsBoolean()
    @IsOptional()
    isCompleted: boolean
}
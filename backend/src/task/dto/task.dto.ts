import {Priority} from "@prisma/client";
import {IsBoolean, IsEnum, IsOptional, IsString} from "class-validator";
import {Transform} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class TaskDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    name: string

    @IsEnum(Priority)
    @IsOptional()
    @Transform(({value}) => ('' + value).toLowerCase())
    @ApiProperty()
    priority: Priority

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    isCompleted: boolean
}
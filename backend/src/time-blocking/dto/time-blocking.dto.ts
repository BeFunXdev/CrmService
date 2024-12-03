import {IsArray, IsEnum, IsNumber, IsOptional, IsString} from "class-validator";
import {Week} from "@prisma/client";
import {Transform} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class TimeBlockingDto {
    @IsString()
    @IsOptional()
    @ApiProperty()
    name: string

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    timeMinutes: number

    @IsNumber()
    @IsOptional()
    @ApiProperty()
    order: number

    @IsEnum(Week)
    @Transform(({value}) => ('' + value).toLowerCase())
    @IsOptional()
    @ApiProperty()
    weekDay: Week
}

export class UpdateOrderDto {
    @IsArray()
    @IsString({each: true})
    @ApiProperty()
    ids: string[]
}
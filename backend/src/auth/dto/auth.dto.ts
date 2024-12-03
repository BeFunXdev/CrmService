import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class AuthLoginDto {
    @IsEmail()
    @ApiProperty()
    email: string

    @IsString()
    @MinLength(6, {
        message: "The password length is too small"
    })
    @MaxLength(32, {
        message: "The password length is too long"
    })
    @ApiProperty()
    password: string
}

export class AuthRegisterDto extends AuthLoginDto{
    @IsString()
    @MinLength(4, {
        message: "The length of the name is too small"
    })
    @MaxLength(12, {
        message: "The length of the name is too long"
    })
    @ApiProperty()
    name: string
}
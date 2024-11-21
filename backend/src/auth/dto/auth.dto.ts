import {IsEmail, IsString, MaxLength, MinLength} from "class-validator";

export class AuthLoginDto {
    @IsEmail()
    email: string

    @IsString()
    @MinLength(6, {
        message: "The password length is too small"
    })
    @MaxLength(32, {
        message: "The password length is too long"
    })
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
    name: string
}
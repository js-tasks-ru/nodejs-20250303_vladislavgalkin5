import { IsString } from 'class-validator';

export class CreateUserDto{

    @IsString()  
    displayName: string

    @IsString()
    avatar: string

    @IsString()
    password: string;
}
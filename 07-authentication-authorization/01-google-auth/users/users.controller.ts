import { Body, Controller, Get, Post } from "@nestjs/common";
import { User } from "./entities/user.entity";
import { UsersService } from "./users.service";


@Controller("users")
export class UsersController {
    constructor(private userService: UsersService) {}

    @Get()
    findAll(){
        return this.userService.findAll();
    }

    @Get(":id")
    findOne(id: string){
        return this.userService.findOne(id);
    }

    @Post()
    createUser(@Body() newUser: User){
        return this.userService.create(newUser);
    }
}
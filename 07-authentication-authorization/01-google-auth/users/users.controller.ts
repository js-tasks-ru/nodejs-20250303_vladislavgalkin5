import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";


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
    createUser(@Body() createUser: CreateUserDto){
        return this.userService.create(createUser);
    }
}
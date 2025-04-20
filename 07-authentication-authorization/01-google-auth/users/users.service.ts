import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findAll(){
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });
  }

  findUsername(username: CreateUserDto["displayName"]) {
    return this.userRepository.findOneBy({ displayName: username });
  }

  async create(user: CreateUserDto) {
    const newUser = new User();
    newUser.displayName = user.displayName;
    newUser.avatar = user.avatar;
    newUser.password = await this.generatePassword(user.password)
    this.userRepository.save(newUser);
    return user;
  }

  async generatePassword(userPassword: CreateUserDto["password"]){
    return bcrypt.hash(userPassword, 10)
  }
}

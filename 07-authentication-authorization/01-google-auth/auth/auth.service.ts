import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User) {
    const accessToken = await this.generateAccessToken(user);    
    return accessToken 
  }
// PS: Уже не стал реализовывать отдельно local.strategy.ts, чтобы быстрее сдать ДЗ. Впринципе было бы прввильнее вынести эту логику как отдельный способ авторизации.
  async localLogin(localUser: string){
    
    let user = new User()
    user.displayName = localUser['login'],
    user.id = String((Math.round(Math.random() * 1_000_000)))
    const accessToken = await this.generateAccessToken(user);    
    
    return accessToken 
  }

  generateAccessToken(user : User){
    return this.jwtService.signAsync({
      sub: String(user.id),
      username: user.displayName
    })
  }
}

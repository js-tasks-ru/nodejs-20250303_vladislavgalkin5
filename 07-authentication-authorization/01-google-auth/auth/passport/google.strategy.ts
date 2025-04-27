import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { Injectable  } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { UsersService } from "../../users/users.service";
import { User } from "../../users/entities/user.entity";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private userService:UsersService, configService: ConfigService
  ) {
    super({
      clientID: configService.get<string>('oauth.google.clientID'),
      clientSecret: configService.get<string>('oauth.google.clientSecret'),
      callbackURL: configService.get<string>('oauth.google.callbackURL'),
      scope: ['email', 'profile']
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
      
    let user = await this.userService.findUsername(`${profile.displayName}`)

    if (!user){
      user = new User()
      user.id = profile.id,
      user.displayName = profile.displayName,
      user.avatar = profile.photos[0].value,
      await this.userService.create(user);
    }
    return user
  
  }
}
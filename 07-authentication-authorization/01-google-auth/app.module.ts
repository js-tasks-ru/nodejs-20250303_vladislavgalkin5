import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import googleConfig from "./config/oauth"
import jwtConfig from "./config/jwt"
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "./auth/jwt.guard";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [googleConfig, jwtConfig]
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtGuard
  }],
})
export class AppModule {}

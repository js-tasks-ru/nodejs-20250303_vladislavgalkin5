import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config"
import database from "./config/database";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [database],
    }),
    TypeOrmModule.forRootAsync(database.asProvider())
  ]
  })

export class AppModule {}

import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import {join} from 'node:path';
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [LoggerModule.forRoot({
    pinoHttp: {
      transport: {
        target: 'pino/file',
        options: {destination: join(__dirname, './logs/app.log')},
      },
    }
  }), TasksModule]
})

export class AppModule {}

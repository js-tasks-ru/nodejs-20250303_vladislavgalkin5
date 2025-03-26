import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [LoggerModule.forRoot({
    pinoHttp: {
      transport: {
        target: 'pino/file',
        options: {destination: './logs/app.log'},
      },
    }
  }), TasksModule]
})

export class AppModule {}

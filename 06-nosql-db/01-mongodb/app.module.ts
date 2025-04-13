import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://Cluster34505:Passw0rd123@cluster34505-shard-00-00.yalp5.mongodb.net:27017,cluster34505-shard-00-01.yalp5.mongodb.net:27017,cluster34505-shard-00-02.yalp5.mongodb.net:27017/?replicaSet=atlas-jcoh5y-shard-0&ssl=true&authSource=admin&retryWrites=true&w=majority&appName=Cluster34505"),
    TasksModule,
  ],
})
export class AppModule {}

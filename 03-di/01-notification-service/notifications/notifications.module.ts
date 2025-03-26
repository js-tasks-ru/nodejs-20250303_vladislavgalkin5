import { Module } from "@nestjs/common";
import { NotificationsService } from "./notifications.service";

@Module({
  providers: [NotificationsService, 
    {provide: "SENDER_EMAIL", useValue: "no-reply@gmail.com" } ,
    {provide: "SMS-Gateway", useValue: "CYTA"}],
  exports: [NotificationsService],
})
export class NotificationsModule {}
import { BadRequestException, Injectable, Inject } from "@nestjs/common";
import { InjectPinoLogger, PinoLogger } from "nestjs-pino";

@Injectable()
export class NotificationsService {

    constructor(
        @Inject("SENDER_EMAIL") private readonly senderEmail: string,
        @Inject("SMS-Gateway") private readonly smsGateway: string,
        @InjectPinoLogger() private readonly logger: PinoLogger
    ) {}

    sendEmail(to: string, subject: string, message: string): void{
        
        validateField(to)
        
        console.log(`Email sent ${`from ${this.senderEmail}`} to ${to}: [${subject}] ${message}`);
        
        this.logger.info({
            event: 'email_sent',
            from: this.senderEmail,
            to,
            subject,
            message,
        }, 'Email successfully sent');
    }

    sendSMS(to: string, message: string): void{

        validateField(to)

        console.log(`SMS sent ${`from ${this.smsGateway}`} to ${to}: ${message}`);

        this.logger.info({
            event: 'sms_sent',
            from: this.smsGateway,
            to,
            message
        }, 'SMS successfully sent')
    }
}

function validateField(field){
    if (field === '' || field === undefined || field === null){
        throw new BadRequestException()
    }
}

import { ArgumentsHost, ExceptionFilter, Catch, HttpException } from "@nestjs/common";
import * as fs from 'fs'

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    
    const res = host.switchToHttp().getResponse()
    const status = exception instanceof HttpException ? exception.getStatus() : 500
    const date = new Date().toISOString();
    const message = exception.message
    
    fs.appendFileSync('errors.log', `[${date}] ${status} - ${message}\n`);

    res.status(status).json({
    statusCode: status,
    message: `${message}`,
    timestamp: date
    })

  } 
}

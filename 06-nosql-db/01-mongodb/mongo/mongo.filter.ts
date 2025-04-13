import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import mongoose from "mongoose";

@Catch(mongoose.Error.ValidationError, mongoose.mongo.MongoError)
export class MongoFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    const statusCode: number = 400;
    const message = exception.message || 'Database error';
    const error = "Bad Request"

    res.status(HttpStatus.BAD_REQUEST).json({
      statusCode,
      error: error,
      message: message
    });
  }
}

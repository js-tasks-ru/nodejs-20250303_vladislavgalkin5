import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { tap } from "rxjs";

export class ApiVersionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const start = Date.now()
    
    return next.handle().pipe(
      tap((data) => {
        data.executionTime = `${Date.now() - start + 'ms'}`;
        data.apiVersion = "1.0"
      })
    );
  }
}

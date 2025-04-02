import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ApiVersionInterceptor } from "interceptors/api-version.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ApiVersionInterceptor())
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

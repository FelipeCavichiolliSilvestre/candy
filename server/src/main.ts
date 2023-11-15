import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AuthGuard } from "./auth";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { existsSync, mkdirSync, writeFileSync } from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  app.useGlobalGuards(app.select(AppModule).get(AuthGuard));
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  setupSwagger(app);

  await app.listen(process.env.APP_PORT ?? 8080);
}
bootstrap();

function setupSwagger(app: INestApplication) {
  const swagger = new DocumentBuilder()
    .setTitle("Candy API")
    .setDescription("The ecommerce candy API description")
    .setVersion("0.0.1")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swagger, {
    operationIdFactory(controllerKey, methodKey) {
      return methodKey;
    },
  });

  if (!existsSync("./static")) mkdirSync("./static");
  writeFileSync("./static/api.json", JSON.stringify(document));

  SwaggerModule.setup("docs", app, document);
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Delivery da Cafeteria')
    .setDescription('Trabalho de Kalil El Ammar Camera')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      showExtensions: true,
      displayOperationId: true,
      defaultModelsExpandDepth: -1,
      tryItOut: false,
    },
  });
  await app.listen(3000);
}
bootstrap();

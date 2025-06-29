import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api'); // Establece el prefijo global para todas las rutas

  app.enableCors({
    origin: 'http://localhost:3000', // El origen del front
  });

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();

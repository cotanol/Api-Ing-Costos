import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProyectosModule } from './proyectos/proyectos.module';
import { AnalisisModule } from './analisis/analisis.module';
import { AuthModule } from './auth/auth.module';
import { FlujosFinancierosModule } from './flujos-financieros/flujos-financieros.module';

import { ItemsFlujoBaseModule } from './items-flujo-base/items-flujo-base.module';
import { CategoriasFlujoModule } from './categorias-flujo/categorias-flujo.module';
// Importa los módulos necesarios para la aplicación, incluyendo TypeORM para la conexión a la base de datos
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // para que las variables de entorno sean globales
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT!,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      // dropSchema: true, // ¡CUIDADO! Esto borra la BD en cada reinicio. Usar solo en desarrollo.
    }),

    AuthModule,

    ProyectosModule,

    FlujosFinancierosModule,

    AnalisisModule,

    CategoriasFlujoModule,

    ItemsFlujoBaseModule,
  ],
})
export class AppModule {}

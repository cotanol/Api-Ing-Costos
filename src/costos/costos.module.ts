import { Module } from '@nestjs/common';
import { CostosService } from './costos.service';
import { CostosController } from './costos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Costo } from './entities/costo.entity';
import { ProyectosModule } from '../proyectos/proyectos.module';
// Este módulo maneja la lógica de negocio relacionada con los costos, incluyendo su creación,
@Module({
  imports: [TypeOrmModule.forFeature([Costo]), ProyectosModule],
  controllers: [CostosController],
  providers: [CostosService],
  exports: [CostosService, TypeOrmModule],
}) // CostosModule es el módulo principal para manejar las operaciones relacionadas con los costos.
export class CostosModule {}

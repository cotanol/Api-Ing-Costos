import { Module } from '@nestjs/common';
import { BeneficiosService } from './beneficios.service';
import { BeneficiosController } from './beneficios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beneficio } from './entities/beneficio.entity';
import { ProyectosModule } from '../proyectos/proyectos.module';
// Este módulo maneja la lógica de negocio relacionada con los beneficios, incluyendo su creación,
@Module({
  imports: [TypeOrmModule.forFeature([Beneficio]), ProyectosModule],
  controllers: [BeneficiosController],
  providers: [BeneficiosService],
  exports: [BeneficiosService, TypeOrmModule],
}) // BeneficiosModule es el módulo principal para manejar las operaciones relacionadas con los beneficios.
export class BeneficiosModule {}

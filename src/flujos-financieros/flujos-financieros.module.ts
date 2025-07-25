import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { FlujoFinanciero } from './entities/flujo-financiero.entity';
import { ProyectosModule } from '../proyectos/proyectos.module';
import { AuthModule } from 'src/auth/auth.module';
import { FlujosFinancierosController } from './flujos-financieros.controller';
import { FlujosFinancierosService } from './flujos-financieros.service';
import { CategoriaFlujo } from 'src/categorias-flujo/entities/categoria-flujo.entity';
import { ItemFlujoBase } from 'src/items-flujo-base/entities/item-flujo-base.entity';
// Este módulo maneja la lógica de negocio relacionada con los costos, incluyendo su creación,
@Module({
  imports: [
    TypeOrmModule.forFeature([FlujoFinanciero, CategoriaFlujo, ItemFlujoBase]),
    ProyectosModule,
    AuthModule,
  ],
  controllers: [FlujosFinancierosController],
  providers: [FlujosFinancierosService],
  exports: [FlujosFinancierosService, TypeOrmModule],
}) // FlujosFinancierosModule es el módulo principal para manejar las operaciones relacionadas con los flujos financieros.
export class FlujosFinancierosModule {}

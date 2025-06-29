import { Module, forwardRef } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { ProyectosController } from './proyectos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { AnalisisModule } from '../analisis/analisis.module';

// Este módulo maneja la lógica de negocio relacionada con los proyectos, incluyendo su creación,
// actualización y eliminación.
@Module({
  imports: [
    TypeOrmModule.forFeature([Proyecto]),
    forwardRef(() => AnalisisModule),
  ],
  // Registra el controlador y el servicio de proyectos en el módulo.
  controllers: [ProyectosController],
  providers: [ProyectosService],
  exports: [ProyectosService, TypeOrmModule],
})
// ProyectosModule es el módulo principal para manejar las operaciones relacionadas con los proyectos.
export class ProyectosModule {}

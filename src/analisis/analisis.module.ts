import { Module, forwardRef } from '@nestjs/common';
import { AnalisisService } from './analisis.service';
import { AnalisisController } from './analisis.controller';
import { ProyectosModule } from '../proyectos/proyectos.module';
// Este módulo maneja las operaciones relacionadas con el análisis de costos y beneficios de proyectos.
@Module({
  imports: [forwardRef(() => ProyectosModule)],
  controllers: [AnalisisController],
  providers: [AnalisisService],
}) // AnalisisModule es el módulo principal para manejar las operaciones relacionadas con el análisis de proyectos.
export class AnalisisModule {}

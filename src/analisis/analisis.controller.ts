import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { AnalisisService } from './analisis.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
// Este controlador maneja las solicitudes relacionadas con el análisis de proyectos, incluyendo el cálculo de costos y beneficios.
@Controller('analisis')
export class AnalisisController {
  constructor(private readonly analisisService: AnalisisService) {}
  // Define una ruta para calcular el análisis de un proyecto específico por su ID.
  @Get(':proyectoId')
  @Auth()
  calculate(@Param('proyectoId', ParseUUIDPipe) proyectoId: string) {
    return this.analisisService.calcularAnalisis(proyectoId);
  }
}

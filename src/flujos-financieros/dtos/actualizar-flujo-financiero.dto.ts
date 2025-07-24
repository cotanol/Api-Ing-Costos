import { PartialType } from '@nestjs/mapped-types';
import { CrearFlujoFinancieroDto } from './crear-flujo-financiero.dto';

// Este DTO extiende de CrearFlujoFinancieroDto, permitiendo que todos los campos sean opcionales
export class ActualizarFlujoFinancieroDto extends PartialType(
  CrearFlujoFinancieroDto,
) {}

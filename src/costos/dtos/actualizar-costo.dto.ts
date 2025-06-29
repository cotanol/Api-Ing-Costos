import { PartialType } from '@nestjs/mapped-types';
import { CrearCostoDto } from './crear-costo.dto';

// Este DTO extiende de CrearCostoDto, permitiendo que todos los campos sean opcionales
export class ActualizarCostoDto extends PartialType(CrearCostoDto) {}

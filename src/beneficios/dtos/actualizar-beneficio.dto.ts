import { PartialType } from '@nestjs/mapped-types';
import { CrearBeneficioDto } from './crear-beneficio.dto';
// Este DTO extiende de CrearBeneficioDto, permitiendo que todos los campos sean opcionales, para actualizar.
export class ActualizarBeneficioDto extends PartialType(CrearBeneficioDto) {}

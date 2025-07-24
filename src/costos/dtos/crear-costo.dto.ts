import {
  IsString,
  IsArray,
  IsEnum,
  IsUUID,
  IsInt,
  Max,
  ArrayMinSize,
  IsNumber,
} from 'class-validator';
import { TipoCosto } from '../entities/costo.entity';
// DTO para crear un nuevo costo, incluyendo validaciones para los campos requeridos.
export class CrearCostoDto {
  @IsString()
  readonly nombre: string;
  // Nombre del costo, que puede ser un costo fijo o variable
  @IsString()
  readonly descripcion: string;
  // Descripción del costo, que proporciona más detalles sobre su naturaleza y propósito
  @IsEnum(TipoCosto) // Validación para el tipo de costo, que puede ser FIJO o VARIABLE
  readonly tipo: TipoCosto;
  // Tipo de costo, que puede ser FIJO o VARIABLE
  @IsArray()
  @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
  @Max(0, { each: true }) // Asegura que cada valor sea un número entero no negativo
  @ArrayMinSize(1) // Debe tener al menos un valor para el primer
  readonly valoresAnuales: number[];
  // Valores anualizados del costo, representados como un array de números
  @IsUUID()
  readonly proyectoId: string;
}

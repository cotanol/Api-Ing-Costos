import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  ArrayMinSize,
  Min,
  IsNumber,
} from 'class-validator';
import { TipoBeneficio } from '../entities/beneficio.entity';
// DTO para crear un nuevo beneficio, incluyendo validaciones para los campos requeridos.
export class CrearBeneficioDto {
  // Nombre del beneficio, que puede ser un beneficio tangible o intangible
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;
  // Nombre del beneficio, que puede ser un beneficio tangible o intangible
  @IsString()
  descripcion: string;
  // Descripción del beneficio, que proporciona más detalles sobre su naturaleza y propósito
  @IsEnum(TipoBeneficio)
  @IsNotEmpty()
  readonly tipo: TipoBeneficio;
  // Tipo de beneficio, que puede ser TANGIBLE o INTANGIBLE
  @IsArray()
  @IsNumber({ allowNaN: false, allowInfinity: false }, { each: true })
  @Min(0, { each: true }) // Asegura que cada valor sea un número entero no negativo
  @ArrayMinSize(1) // Debe tener al menos un valor para el primer año
  readonly valoresAnuales: number[];
  // Valores anualizados del beneficio, representados como un array de números
  @IsString()
  @IsNotEmpty()
  readonly proyectoId: string;
}

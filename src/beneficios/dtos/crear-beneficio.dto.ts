import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  IsNumber,
  ArrayMinSize,
} from 'class-validator';
import { TipoBeneficio } from '../entities/beneficio.entity';
// DTO para crear un nuevo beneficio, incluyendo validaciones para los campos requeridos.
export class CrearBeneficioDto {
  // Nombre del beneficio, que puede ser un beneficio tangible o intangible
  @IsString()
  @IsNotEmpty()
  nombre: string;
// Nombre del beneficio, que puede ser un beneficio tangible o intangible
  @IsString()
  descripcion: string;
// Descripción del beneficio, que proporciona más detalles sobre su naturaleza y propósito
  @IsEnum(TipoBeneficio)
  @IsNotEmpty()
  tipo: TipoBeneficio;
// Tipo de beneficio, que puede ser TANGIBLE o INTANGIBLE
  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(1) // Debe tener al menos un valor para el primer año
  valoresAnuales: number[];
// Valores anualizados del beneficio, representados como un array de números
  @IsString()
  @IsNotEmpty()
  proyectoId: string;
}

import { IsString, IsArray, IsNumber, IsEnum, IsUUID } from 'class-validator';
import { TipoCosto } from '../entities/costo.entity';
// DTO para crear un nuevo costo, incluyendo validaciones para los campos requeridos.
export class CrearCostoDto {
  @IsString()
  nombre: string;
// Nombre del costo, que puede ser un costo fijo o variable
  @IsString()
  descripcion: string;
// Descripción del costo, que proporciona más detalles sobre su naturaleza y propósito
  @IsEnum(TipoCosto) // Validación para el tipo de costo, que puede ser FIJO o VARIABLE
  tipo: TipoCosto;
// Tipo de costo, que puede ser FIJO o VARIABLE
  @IsArray()
  @IsNumber({}, { each: true })
  valoresAnuales: number[];
// Valores anualizados del costo, representados como un array de números
  @IsUUID()
  proyectoId: string;
}

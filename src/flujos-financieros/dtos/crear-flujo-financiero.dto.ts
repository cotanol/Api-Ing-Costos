import {
  IsString,
  IsArray,
  IsEnum,
  IsUUID,
  IsOptional,
  ArrayMinSize,
  IsNumber,
  Min, // Importar Min
} from 'class-validator';
import {
  Tipo,
  Comportamiento,
  Naturaleza,
  TipoFlujo,
} from '../entities/flujo-financiero.entity';

// DTO para crear un nuevo flujo financiero, alineado con la base de datos final.
export class CrearFlujoFinancieroDto {
  @IsString()
  readonly nombre: string;

  @IsString()
  @IsOptional() // La descripción puede ser opcional
  readonly descripcion?: string;

  @IsEnum(TipoFlujo)
  readonly tipoFlujo: TipoFlujo; // Clave: INGRESO o EGRESO

  @IsEnum(Tipo)
  readonly tipo: Tipo; // DIRECTO o INDIRECTO

  @IsEnum(Comportamiento)
  readonly comportamiento: Comportamiento; // FIJO o VARIABLE

  @IsEnum(Naturaleza)
  readonly naturaleza: Naturaleza; // TANGIBLE o INTANGIBLE

  @IsArray()
  @IsNumber({}, { each: true })
  @Min(0, { each: true }) // CORRECCIÓN: El valor debe ser como mínimo 0
  @ArrayMinSize(1)
  readonly valoresAnuales: number[];

  @IsUUID()
  readonly proyectoId: string; // ID del proyecto al que pertenece

  @IsUUID()
  readonly categoriaId: string; // ID de la categoría a la que pertenece

  @IsUUID()
  readonly itemFlujoBaseId: string;
}

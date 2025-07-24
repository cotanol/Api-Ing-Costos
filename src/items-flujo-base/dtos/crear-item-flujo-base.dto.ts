import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min, // Importar Min en lugar de Max
} from 'class-validator';
import {
  Tipo,
  Comportamiento,
  Naturaleza,
  TipoFlujo,
} from '../entities/item-flujo-base.entity'; // Asumiendo que los enums están en un archivo compartido
import { Frecuencia } from '../entities/item-flujo-base.entity';

export class CrearItemFlujoBaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  readonly nombre: string;

  @IsString()
  @IsOptional()
  readonly descripcion?: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsNotEmpty()
  @Min(0) // CORRECCIÓN: El monto debe ser como mínimo 0
  readonly montoSugerido: number;

  @IsEnum(TipoFlujo)
  @IsNotEmpty()
  readonly tipoFlujo: TipoFlujo; // AÑADIDO: INGRESO o EGRESO

  @IsEnum(Tipo)
  @IsNotEmpty()
  readonly tipo: Tipo; // DIRECTO o INDIRECTO

  @IsEnum(Comportamiento)
  @IsNotEmpty()
  readonly comportamiento: Comportamiento; // AÑADIDO: FIJO o VARIABLE

  @IsEnum(Naturaleza)
  @IsNotEmpty()
  readonly naturaleza: Naturaleza; // AÑADIDO: TANGIBLE o INTANGIBLE

  @IsEnum(Frecuencia)
  @IsNotEmpty()
  readonly frecuencia: Frecuencia;

  @IsUUID()
  @IsNotEmpty()
  readonly categoriaId: string;
}

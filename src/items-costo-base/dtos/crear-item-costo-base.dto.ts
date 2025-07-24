import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Max,
} from 'class-validator';
import { TipoCosto, FrecuenciaCosto } from '../entities/item-costo-base.entity';

export class CrearItemCostoBaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  readonly nombre: string;

  @IsString()
  @IsOptional()
  readonly descripcion?: string;

  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsNotEmpty()
  @Max(0)
  readonly montoSugerido: number;

  @IsEnum(TipoCosto)
  @IsNotEmpty()
  readonly tipo: TipoCosto;

  @IsEnum(FrecuenciaCosto)
  @IsNotEmpty()
  readonly frecuencia: FrecuenciaCosto;

  @IsUUID()
  @IsNotEmpty()
  readonly categoriaId: string;
}

import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CrearCategoriaFlujoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  readonly nombre: string;

  @IsString()
  @IsOptional()
  readonly descripcion?: string;
}

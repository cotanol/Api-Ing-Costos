import { IsString, IsInt, Min, Max, IsNumber } from 'class-validator';

export class CrearProyectoDto {
  @IsString()
  readonly nombre: string; //Nombre de la tecnologia a evaluar

  @IsString()
  readonly descripcion: string; //Descripcion

  @IsInt()
  @Min(1)
  readonly horizonteAnalisis: number; // Horizonte de análisis en años (N momentos),

  @IsNumber()
  @Min(1)
  @Max(100)
  readonly tasaDescuento: number; // Tasa de descuento para el cálculo del VAN
}

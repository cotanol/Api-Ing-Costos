import { IsString, IsInt, Min, Max, IsNumber } from 'class-validator';

export class CrearProyectoDto {
  @IsString()
  nombre: string; //Nombre de la tecnologia a evaluar

  @IsString()
  descripcion: string; //Descripcion

  @IsInt()
  @Min(1)
  horizonteAnalisis: number; // Horizonte de análisis en años (N momentos),

  @IsNumber()
  @Min(1)
  @Max(100)
  tasaDescuento: number; // Tasa de descuento para el cálculo del VAN
}

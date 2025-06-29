import { IsString, IsInt, Min, Max, IsNumber } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string; //Nombre de la tecnologia a evaluar

  @IsString()
  description: string; //Descripcion

  @IsInt()
  @Min(1)
  analysisHorizon: number; // Horizonte de análisis en años (N Años)

  @IsNumber()
  @Min(1)
  @Max(100)
  discountRate: number; // Tasa de descuento para el cálculo del VAN
}

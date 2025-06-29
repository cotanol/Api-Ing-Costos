import { Injectable, NotFoundException } from '@nestjs/common';
import { ProyectosService } from '../proyectos/proyectos.service';
import { AnalisisRespuestaDto } from './dtos/analisis-respuesta.dto';
import { Costo } from 'src/costos/entities/costo.entity';
import { Beneficio } from 'src/beneficios/entities/beneficio.entity';

@Injectable()
export class AnalisisService {
  constructor(private readonly proyectosService: ProyectosService) {}

  async calculate(proyectoId: string): Promise<AnalisisRespuestaDto> {
    const proyecto = await this.proyectosService.findOne(proyectoId);
    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    const { horizonteAnalisis, tasaDescuento, costos, beneficios } = proyecto;

    // Paso 1: Calcular correctamente los flujos de caja netos anuales
    const flujoCajaNeto = this.calcularFlujoCajaNeto(
      costos,
      beneficios,
      horizonteAnalisis,
    );

    // Paso 2: Separar la inversión inicial de los flujos operativos
    const inversionInicial = -flujoCajaNeto[0]; // La inversión es el flujo del año 1 en positivo
    const flujosOperativos = flujoCajaNeto.slice(1); // El resto son los flujos operativos

    // Paso 3: Calcular las métricas con los datos correctos
    const valorPresenteNeto = this.calcularVAN(
      tasaDescuento,
      inversionInicial,
      flujosOperativos,
    );
    const tasaInternaRetorno = this.calcularTIR([
      -inversionInicial,
      ...flujosOperativos,
    ]);
    const periodoRecuperacion = this.calcularPeriodoRecuperacion(
      inversionInicial,
      flujosOperativos,
    );
    const flujosCajaAcumulados = this.calcularFlujosCajaAcumulados(flujoCajaNeto);

    return {
      valorPresenteNeto, // Valor Actual Neto
      tasaInternaRetorno, // Tasa Interna de Retorno
      periodoRecuperacion, // Periodo de Recuperación
      flujoCajaNeto, // Flujos de Caja Netos
      flujosCajaAcumulados, // Flujos de Caja Acumulados
    };
  }

  // simplemente suma los costos (aunque sean negativos)
  // Net Cash Flows
  private calcularFlujoCajaNeto(
    costos: Costo[],
    beneficios: Beneficio[],
    horizonte: number,
  ): number[] {
    const flujoCajaNeto: number[] = [];
    for (let year = 0; year < horizonte; year++) {
      const totalBeneficios = beneficios.reduce(
        (suma, beneficio) => suma + (beneficio.valoresAnuales[year] || 0),
        0,
      );
      const totalCostos = costos.reduce(
        (suma, costo) => suma + (costo.valoresAnuales[year] || 0),
        0,
      );
      flujoCajaNeto.push(totalBeneficios + totalCostos);
    }
    return flujoCajaNeto;
  }

  // Acepta la inversión y los flujos por separado (VAN)
  // Valor Actual Neto
  private calcularVAN(
    tasa: number,
    inversionInicial: number,
    flujosCaja: number[],
  ): number {
    let van = -inversionInicial;
    for (let i = 0; i < flujosCaja.length; i++) {
      van += flujosCaja[i] / Math.pow(1 + tasa / 100, i + 1);
    }
    return van;
  }

  // Lógica de la TIR más robusta
  // Tasa Interna de Retorno
  private calcularTIR(flujosCaja: number[]): number | null {
    // Si no hay inversión inicial (flujo negativo), la TIR no es aplicable.
    if (flujosCaja[0] >= 0) {
      return null;
    }

    const maxIteraciones = 100;
    const tolerancia = 1e-7;
    let estimacion = 0.1; // 10%

    for (let i = 0; i < maxIteraciones; i++) {
      let van = 0;
      let derivada = 0;
      for (let t = 0; t < flujosCaja.length; t++) {
        van += flujosCaja[t] / Math.pow(1 + estimacion, t);
        if (t > 0) {
          derivada -= (t * flujosCaja[t]) / Math.pow(1 + estimacion, t + 1);
        }
      }

      if (Math.abs(derivada) < tolerancia) {
        break; // Evitar división por cero
      }

      const nuevaEstimacion = estimacion - van / derivada;
      if (Math.abs(nuevaEstimacion - estimacion) <= tolerancia) {
        return nuevaEstimacion * 100; // Retornar como porcentaje
      }
      estimacion = nuevaEstimacion;
    }
    return null; // No convergió o no es calculable
  }

  // Payback más precisa
  // Periodo de Recuperacion
  private calcularPeriodoRecuperacion(
    inversionInicial: number,
    flujosCaja: number[],
  ): number {
    let flujoCajaAcumulado = -inversionInicial;
    if (flujoCajaAcumulado >= 0) return 0;

    for (let i = 0; i < flujosCaja.length; i++) {
      flujoCajaAcumulado += flujosCaja[i];
      if (flujoCajaAcumulado >= 0) {
        // Fracción del año para recuperar lo que faltaba
        const fraccionNecesaria =
          -(flujoCajaAcumulado - flujosCaja[i]) / flujosCaja[i];
        return i + 1 + fraccionNecesaria - 1; // i es 0-indexed, por eso +1 y -1
      }
    }
    return -1; // No se recupera la inversión
  }

  // Flujo de caja acumulado
  private calcularFlujosCajaAcumulados(flujosCaja: number[]): number[] {
    const acumulado: number[] = [];
    let suma = 0;
    for (const flujo of flujosCaja) {
      suma += flujo;
      acumulado.push(suma);
    }
    return acumulado;
  }
}


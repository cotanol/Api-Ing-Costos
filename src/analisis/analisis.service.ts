import { Injectable, NotFoundException } from '@nestjs/common';
import { ProyectosService } from '../proyectos/proyectos.service';
import { AnalisisRespuestaDto } from './dtos/analisis-respuesta.dto';
import {
  FlujoFinanciero,
  TipoFlujo,
} from 'src/flujos-financieros/entities/flujo-financiero.entity';

@Injectable()
export class AnalisisService {
  constructor(private readonly proyectosService: ProyectosService) {}

  async calcularAnalisis(proyectoId: string): Promise<AnalisisRespuestaDto> {
    const proyecto = await this.proyectosService.findOne(proyectoId);
    if (!proyecto) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    const { horizonteAnalisis, tasaDescuento, flujos } = proyecto;

    // Paso 1: Calcular correctamente los flujos de caja netos anuales
    const flujosCajaNetos = this.calcularFlujosCajaNetos(
      flujos,
      horizonteAnalisis,
    );

    // Paso 2: Separar la inversión inicial de los flujos operativos
    const inversionInicial =
      flujosCajaNetos.length > 0 ? -flujosCajaNetos[0] : 0;
    const flujosOperativos = flujosCajaNetos.slice(1);

    // Paso 3: Calcular las métricas con los datos correctos
    const valorActualNeto = this.calcularVAN(
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
    const flujosCajaAcumulados =
      this.calcularFlujosCajaAcumulados(flujosCajaNetos);

    return {
      valorActualNeto, // Valor Actual Neto
      tasaInternaRetorno, // Tasa Interna de Retorno
      periodoRecuperacion, // Periodo de Recuperación (Payback)
      flujosCajaNetos, // Flujos de Caja Netos
      flujosCajaAcumulados, // Flujos de Caja Acumulados
    };
  }

  //
  private calcularFlujosCajaNetos(
    flujos: FlujoFinanciero[],
    horizonte: number,
  ): number[] {
    const flujosNetos: number[] = [];
    for (let anio = 0; anio < horizonte; anio++) {
      const totalAnual = flujos.reduce((sumaParcial, flujo) => {
        const valorAnual = flujo.valoresAnuales[anio] || 0;

        // La lógica es simple: si es INGRESO, suma. Si es EGRESO, resta.
        if (flujo.tipoFlujo === TipoFlujo.INGRESO) {
          return sumaParcial + valorAnual;
        } else {
          // Asumimos que es EGRESO
          return sumaParcial - valorAnual;
        }
      }, 0); // El valor inicial de la suma es 0

      flujosNetos.push(totalAnual);
    }
    return flujosNetos;
  }

  // Acepta la inversión y los flujos por separado (VAN)
  // Valor Actual Neto
  private calcularVAN(
    tasa: number,
    inversionInicial: number,
    flujosCajaOperativos: number[],
  ): number {
    let van = -inversionInicial;
    for (let i = 0; i < flujosCajaOperativos.length; i++) {
      van += flujosCajaOperativos[i] / Math.pow(1 + tasa / 100, i + 1);
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
    flujosOperativos: number[],
  ): number {
    let flujoCajaAcumulado = -inversionInicial;
    if (flujoCajaAcumulado >= 0) return 0;

    for (let i = 0; i < flujosOperativos.length; i++) {
      flujoCajaAcumulado += flujosOperativos[i];
      if (flujoCajaAcumulado >= 0) {
        // Fracción del año para recuperar lo que faltaba
        const fraccionNecesaria =
          -(flujoCajaAcumulado - flujosOperativos[i]) / flujosOperativos[i];
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

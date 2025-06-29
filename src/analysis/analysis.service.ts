import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectsService } from 'src/projects/projects.service';
import { AnalysisResponseDto } from './dto/analysis-response.dto';
import { Cost } from 'src/costs/entities/cost.entity';
import { Benefit } from 'src/benefits/entities/benefit.entity';

@Injectable()
export class AnalysisService {
  constructor(private readonly projectsService: ProjectsService) {}

  async calculate(projectId: string): Promise<AnalysisResponseDto> {
    const project = await this.projectsService.findOne(projectId);
    if (!project) {
      throw new NotFoundException('Proyecto no encontrado');
    }

    const { analysisHorizon, discountRate, costs, benefits } = project;

    // Paso 1: Calcular correctamente los flujos de caja netos anuales
    const netCashFlows = this.calculateNetCashFlows(
      costs,
      benefits,
      analysisHorizon,
    );

    // Paso 2: Separar la inversión inicial de los flujos operativos
    const initialInvestment = -netCashFlows[0]; // La inversión es el flujo del año 1 en positivo
    const operationalCashFlows = netCashFlows.slice(1); // El resto son los flujos operativos

    // Paso 3: Calcular las métricas con los datos correctos
    const netPresentValue = this.calculateNPV(
      discountRate,
      initialInvestment,
      operationalCashFlows,
    );
    const internalRateOfReturn = this.calculateIRR([
      -initialInvestment,
      ...operationalCashFlows,
    ]);
    const paybackPeriod = this.calculatePaybackPeriod(
      initialInvestment,
      operationalCashFlows,
    );
    const cumulativeCashFlows = this.calculateCumulativeCashFlows(netCashFlows);

    return {
      netPresentValue, // Valor Actual Neto
      internalRateOfReturn, // Tasa Interna de Retorno
      paybackPeriod, // Periodo de Recuperación
      netCashFlows, // Flujos de Caja Netos
      cumulativeCashFlows, // Flujos de Caja Acumulados
    };
  }

  // simplemente suma los costos (aunque sean negativos)
  // Net Cash Flows
  private calculateNetCashFlows(
    costs: Cost[],
    benefits: Benefit[],
    horizon: number,
  ): number[] {
    const netCashFlows: number[] = [];
    for (let year = 0; year < horizon; year++) {
      const totalBenefits = benefits.reduce(
        (sum, benefit) => sum + (benefit.annualValues[year] || 0),
        0,
      );
      const totalCosts = costs.reduce(
        (sum, cost) => sum + (cost.annualValues[year] || 0),
        0,
      );
      netCashFlows.push(totalBenefits + totalCosts);
    }
    return netCashFlows;
  }

  // Acepta la inversión y los flujos por separado (VAN)
  // Valor Actual Neto
  private calculateNPV(
    rate: number,
    initialInvestment: number,
    cashFlows: number[],
  ): number {
    let npv = -initialInvestment;
    for (let i = 0; i < cashFlows.length; i++) {
      npv += cashFlows[i] / Math.pow(1 + rate / 100, i + 1);
    }
    return npv;
  }

  // Lógica de la TIR más robusta
  // Tasa Interna de Retorno
  private calculateIRR(cashFlows: number[]): number | null {
    // Si no hay inversión inicial (flujo negativo), la TIR no es aplicable.
    if (cashFlows[0] >= 0) {
      return null;
    }

    const maxIterations = 100;
    const tolerance = 1e-7;
    let guess = 0.1; // 10%

    for (let i = 0; i < maxIterations; i++) {
      let npv = 0;
      let derivative = 0;
      for (let t = 0; t < cashFlows.length; t++) {
        npv += cashFlows[t] / Math.pow(1 + guess, t);
        if (t > 0) {
          derivative -= (t * cashFlows[t]) / Math.pow(1 + guess, t + 1);
        }
      }

      if (Math.abs(derivative) < tolerance) {
        break; // Evitar división por cero
      }

      const newGuess = guess - npv / derivative;
      if (Math.abs(newGuess - guess) <= tolerance) {
        return newGuess * 100; // Retornar como porcentaje
      }
      guess = newGuess;
    }
    return null; // No convergió o no es calculable
  }

  // Payback más precisa
  // Periodo de Recuperacion
  private calculatePaybackPeriod(
    initialInvestment: number,
    cashFlows: number[],
  ): number {
    let cumulativeCashFlow = -initialInvestment;
    if (cumulativeCashFlow >= 0) return 0;

    for (let i = 0; i < cashFlows.length; i++) {
      cumulativeCashFlow += cashFlows[i];
      if (cumulativeCashFlow >= 0) {
        // Fracción del año para recuperar lo que faltaba
        const fractionNeeded =
          -(cumulativeCashFlow - cashFlows[i]) / cashFlows[i];
        return i + 1 + fractionNeeded - 1; // i es 0-indexed, por eso +1 y -1
      }
    }
    return -1; // No se recupera la inversión
  }

  // Flujo de caja acumulado
  private calculateCumulativeCashFlows(cashFlows: number[]): number[] {
    const cumulative: number[] = [];
    let sum = 0;
    for (const flow of cashFlows) {
      sum += flow;
      cumulative.push(sum);
    }
    return cumulative;
  }
}

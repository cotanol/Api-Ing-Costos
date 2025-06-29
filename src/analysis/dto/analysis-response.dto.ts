export class AnalysisResponseDto {
  netPresentValue: number; // Valor Actual Neto (VAN)
  internalRateOfReturn: number | null; // Tasa Interna de Retorno (TIR)
  paybackPeriod: number; // Período de Recuperación de la Inversión (en años)
  netCashFlows: number[]; // Flujos de Caja Neto Anuales
  cumulativeCashFlows: number[]; // Flujos de Caja Acumulados Anuales
}

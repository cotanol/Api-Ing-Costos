export class AnalisisRespuestaDto {
  readonly valorActualNeto: number; // Valor Actual Neto (VAN)
  readonly tasaInternaRetorno: number | null; // Tasa Interna de Retorno (TIR)
  readonly periodoRecuperacion: number; // Período de Recuperación de la Inversión (en años)
  readonly flujosCajaNetos: number[]; // Flujos de Caja Neto Anuales
  readonly flujosCajaAcumulados: number[]; // Flujos de Caja Acumulados Anuales
}

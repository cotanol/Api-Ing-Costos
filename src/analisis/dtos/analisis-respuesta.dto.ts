export class AnalisisRespuestaDto {
  valorActualNeto: number; // Valor Actual Neto (VAN)
  tasaInternaRetorno: number | null; // Tasa Interna de Retorno (TIR)
  periodoRecuperacion: number; // Período de Recuperación de la Inversión (en años)
  flujosCajaNetos: number[]; // Flujos de Caja Neto Anuales
  flujosCajaAcumulados: number[]; // Flujos de Caja Acumulados Anuales
}

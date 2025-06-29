export class AnalisisRespuestaDto {
  valorPresenteNeto: number; // Valor Actual Neto (VAN)
  tasaInternaRetorno: number | null; // Tasa Interna de Retorno (TIR)
  periodoRecuperacion: number; // Período de Recuperación de la Inversión (en años)
  flujoCajaNeto: number[]; // Flujos de Caja Neto Anuales
  flujosCajaAcumulados: number[]; // Flujos de Caja Acumulados Anuales
}

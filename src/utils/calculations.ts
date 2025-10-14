import type { Deuda, Totales } from "../types/models";

// Comisión redisposición: 5.99% => 0.0599
export const COMISION_REDISPOSICION = 0.0599;

export const calcularTotales = (deudas: Deuda[]): Totales => {
  const total = deudas.reduce((acc, d) => acc + d.montoTotal, 0);
  const pagado = deudas.reduce((acc, d) => acc + d.montoPagado, 0);
  return { total, pagado, restante: total - pagado };
};

export const calcularDiasRestantes = (fechaLimite: string): number => {
  const hoy = new Date();
  const f = new Date(fechaLimite);
  const diff = f.getTime() - hoy.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const calcularRedisposicion = (monto: number): { neto: number; comision: number } => {
  const comision = monto * COMISION_REDISPOSICION;
  const neto = monto - comision;
  return { neto, comision };
};

export const reiniciarDeuda = (d: Deuda) => {
  // deja pagado en 0, añade movimiento de reinicio
  const mov = {
    id: crypto.randomUUID(),
    tipo: "reinicio" as const,
    monto: d.montoTotal,
    fecha: new Date().toISOString(),
    nota: "Reinicio de deuda",
  };
  return { ...d, montoPagado: 0, movimientos: [...d.movimientos, mov] };
};

export const ordenarPorImportancia = (deudas: Deuda[]) =>
  [...deudas].sort((a, b) => a.prioridad - b.prioridad);

// Pago recomendado para dejar el saldo en porcentaje (ej 30%)
export const calcularPagoRecomendado = (d: Deuda, porcentaje = 30): number => {
  if (d.tipoCuenta !== "tarjeta_credito") return 0;
  const ideal = (d.montoTotal) * (porcentaje / 100);
  const debePagar = d.montoTotal - ideal;
  return debePagar > 0 ? parseFloat(debePagar.toFixed(2)) : 0;
};

export const calcularDiasAntesDeCorte = (fechaCorte?: string): number => {
  if (!fechaCorte) return Infinity;
  const hoy = new Date();
  const corte = new Date(fechaCorte);
  const diff = corte.getTime() - hoy.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const debeMostrarRecordatorio = (d: Deuda, diasAviso = 5): boolean => {
  if (!d.recordatorioAumentoLinea || d.tipoCuenta !== "tarjeta_credito") return false;
  const dias = calcularDiasAntesDeCorte(d.fechaCorte);
  return dias <= diasAviso && dias > 0;
};

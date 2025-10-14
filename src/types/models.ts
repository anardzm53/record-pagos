export type MovimientoTipo = "abono" | "aumento" | "reinicio" | "redisposición" | "ajuste_credito";

export interface Movimiento {
  id: string;
  tipo: MovimientoTipo;
  monto: number;
  fecha: string; // ISO
  nota?: string;
}

export interface Deuda {
  id: string;
  descripcion: string;
  montoTotal: number;
  montoPagado: number;
  categoria: string;
  fechaLimite: string; // ISO
  prioridad: number; // 1 alta, 2 media, 3 baja
  redisponible: boolean;
  montoRedisponible?: number;
  tipoCuenta: "tarjeta_credito" | "prestamo" | "otro";
  recordatorioAumentoLinea: boolean;
  fechaCorte?: string; // ISO
  porcentajeRecomendado?: number; // e.g. 30
  movimientos: Movimiento[];
}

export interface Totales {
  total: number;
  pagado: number;
  restante: number;
}

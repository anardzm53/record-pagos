import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import type { Deuda } from "../types/models";

export const exportarExcel = (deudas: Deuda[]) => {
  // Hoja 1: resumen de deudas
  const resumen = deudas.map(d => ({
    id: d.id,
    descripcion: d.descripcion,
    categoria: d.categoria,
    tipoCuenta: d.tipoCuenta,
    montoTotal: d.montoTotal,
    montoPagado: d.montoPagado,
    restante: d.montoTotal - d.montoPagado,
    fechaLimite: d.fechaLimite,
    prioridad: d.prioridad,
    redisponible: d.redisponible ? "si" : "no",
    montoRedisponible: d.montoRedisponible ?? "",
    recordatorioAumentoLinea: d.recordatorioAumentoLinea ? "si" : "no",
    fechaCorte: d.fechaCorte ?? ""
  }));

  // Hoja 2: movimientos
  const movimientos = deudas.flatMap(d =>
    d.movimientos.map(m => ({
      deudaId: d.id,
      descripcion: d.descripcion,
      tipo: m.tipo,
      monto: m.monto,
      fecha: m.fecha,
      nota: m.nota ?? ""
    }))
  );

  const wb = XLSX.utils.book_new();
  const ws1 = XLSX.utils.json_to_sheet(resumen);
  const ws2 = XLSX.utils.json_to_sheet(movimientos);
  XLSX.utils.book_append_sheet(wb, ws1, "Deudas");
  XLSX.utils.book_append_sheet(wb, ws2, "Movimientos");

  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([wbout], { type: "application/octet-stream" });
  saveAs(blob, `finanzas_${new Date().toISOString().slice(0,10)}.xlsx`);
};

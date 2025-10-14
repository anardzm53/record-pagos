import React, { useState, useEffect, type ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { MainContext } from "./mainContext";
import type { Deuda, Totales } from "../types/models";
import { calcularPagoRecomendado, calcularRedisposicion, calcularTotales, ordenarPorImportancia, reiniciarDeuda } from "../utils/calculations";

export const MainProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deudas, setDeudas] = useLocalStorage<Deuda[]>("deudas", []);
  const [totales, setTotales] = useState<Totales>({ total: 0, pagado: 0, restante: 0 });

  useEffect(() => {
    setTotales(calcularTotales(deudas));
  }, [deudas]);

  const agregarDeuda = (d: Deuda) => {
    const nue = ordenarPorImportancia([...deudas, d]);
    setDeudas(nue);
  };

  const actualizarDeuda = (id: string, d: Deuda) => {
    setDeudas(ordenarPorImportancia(deudas.map(x => x.id === id ? d : x)));
  };

  const eliminarDeuda = (id: string) => setDeudas(deudas.filter(x => x.id !== id));

  const reiniciar = (id: string) => {
    const d = deudas.find(x => x.id === id);
    if (!d) return;
    const nueva = reiniciarDeuda(d);
    actualizarDeuda(id, nueva);
  };

  const aplicarRedisposicion = (id: string) => {
    const d = deudas.find(x => x.id === id);
    if (!d || !d.redisponible || !d.montoRedisponible) return;
    const { neto, comision } = calcularRedisposicion(d.montoRedisponible);
    const mov = {
      id: crypto.randomUUID(),
      tipo: "redisposición" as const,
      monto: neto,
      fecha: new Date().toISOString(),
      nota: `Redisposición neta (comisión ${ (comision).toFixed(2) })`
    };
    const actualizada: Deuda = {
      ...d,
      montoTotal: +(d.montoTotal + neto),
      movimientos: [...d.movimientos, mov]
    };
    actualizarDeuda(id, actualizada);
  };

  const registrarPagoRecomendado = (id: string) => {
    const d = deudas.find(x => x.id === id);
    if (!d) return;
    const monto = calcularPagoRecomendado(d, d.porcentajeRecomendado ?? 30);
    if (monto <= 0) return;
    const mov = {
      id: crypto.randomUUID(),
      tipo: "ajuste_credito" as const,
      monto,
      fecha: new Date().toISOString(),
      nota: "Pago recomendado para mejorar línea de crédito"
    };
    const actualizada: Deuda = {
      ...d,
      montoPagado: +(d.montoPagado + monto),
      movimientos: [...d.movimientos, mov]
    };
    actualizarDeuda(id, actualizada);
  };

  return (
    <MainContext.Provider value={{ deudas, totales, agregarDeuda, actualizarDeuda, eliminarDeuda, reiniciar, aplicarRedisposicion, registrarPagoRecomendado }}>
      {children}
    </MainContext.Provider>
  );
};
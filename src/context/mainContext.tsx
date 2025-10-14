import { createContext, useContext } from "react";
import type { Deuda, Totales } from "../types/models";

interface MainContextProps {
  deudas: Deuda[];
  totales: Totales;
  agregarDeuda: (d: Deuda) => void;
  actualizarDeuda: (id: string, d: Deuda) => void;
  eliminarDeuda: (id: string) => void;
  reiniciar: (id: string) => void;
  aplicarRedisposicion: (id: string) => void;
  registrarPagoRecomendado: (id: string) => void;
}

export const MainContext = createContext<MainContextProps | undefined>(undefined);

export const useDebt = () => {
  const ctx = useContext(MainContext);
  if (!ctx) throw new Error("useDebt debe usarse dentro de MainProvider");
  return ctx;
};

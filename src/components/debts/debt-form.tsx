import React, { useState } from "react";
import { useDebt } from "../../context/mainContext";
import type { Deuda } from "../../types/models";
import { v4 as uuidv4 } from "uuid";

const DebtForm: React.FC = () => {
  const { agregarDeuda } = useDebt();
  const [descripcion, setDescripcion] = useState("");
  const [montoTotal, setMontoTotal] = useState<number>(0);
  const [categoria, setCategoria] = useState("Personal");
  const [fechaLimite, setFechaLimite] = useState<string>("");
  const [prioridad, setPrioridad] = useState<number>(2);
  const [redisponible, setRedisponible] = useState(false);
  const [montoRedisponible, setMontoRedisponible] = useState<number | undefined>(undefined);
  const [tipoCuenta, setTipoCuenta] = useState<Deuda["tipoCuenta"]>("prestamo");
  const [recordatorioAumentoLinea, setRecordatorioAumentoLinea] = useState(false);
  const [fechaCorte, setFechaCorte] = useState<string>("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const d: Deuda = {
      id: uuidv4(),
      descripcion,
      montoTotal,
      montoPagado: 0,
      categoria,
      fechaLimite,
      prioridad,
      redisponible,
      montoRedisponible,
      tipoCuenta,
      recordatorioAumentoLinea,
      fechaCorte: fechaCorte || undefined,
      porcentajeRecomendado: 30,
      movimientos: []
    };
    agregarDeuda(d);
    // reset
    setDescripcion(""); setMontoTotal(0); setFechaLimite(""); setMontoRedisponible(undefined);
  };

  return (
    <form className="card" onSubmit={onSubmit} style={{ marginBottom: 12 }}>
      <h2>Agregar Deuda / Tarjeta</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        <input required placeholder="Descripción" value={descripcion} onChange={e=>setDescripcion(e.target.value)} />
        <input required type="number" step="0.01" placeholder="Monto total" value={montoTotal} onChange={e=>setMontoTotal(Number(e.target.value))} />
        <input placeholder="Categoría" value={categoria} onChange={e=>setCategoria(e.target.value)} />
        <input type="date" value={fechaLimite} onChange={e=>setFechaLimite(e.target.value)} />
        <select value={prioridad} onChange={e=>setPrioridad(Number(e.target.value))}>
          <option value={1}>Alta</option>
          <option value={2}>Media</option>
          <option value={3}>Baja</option>
        </select>
        <select value={tipoCuenta} onChange={e=>setTipoCuenta(e.target.value as any)}>
          <option value="prestamo">Préstamo</option>
          <option value="tarjeta_credito">Tarjeta crédito</option>
          <option value="otro">Otro</option>
        </select>
        <label style={{ display:"flex", alignItems:"center", gap:8 }}>
          <input type="checkbox" checked={redisponible} onChange={e=>setRedisponible(e.target.checked)} />
          Redisponible (tarjeta)
        </label>
        <input type="number" step="0.01" placeholder="Monto redisponible" value={montoRedisponible ?? ""} onChange={e=>setMontoRedisponible(e.target.value ? Number(e.target.value) : undefined)} />
        <label style={{ display:"flex", alignItems:"center", gap:8 }}>
          <input type="checkbox" checked={recordatorioAumentoLinea} onChange={e=>setRecordatorioAumentoLinea(e.target.checked)} />
          Recordatorio mejora línea (antes de corte)
        </label>
        <input type="date" value={fechaCorte} onChange={e=>setFechaCorte(e.target.value)} />
      </div>
      <div style={{ marginTop: 8 }}>
        <button type="submit" className="btn">Agregar deuda</button>
      </div>
    </form>
  );
};

export default DebtForm;

import React, { useState } from "react";
import { useDebt } from "../../context/mainContext";
import type { Movimiento } from "../../types/models";
import { v4 as uuidv4 } from "uuid";

const DebtDetail: React.FC<{ id: string; onClose: ()=>void }> = ({ id, onClose }) => {
  const { deudas, actualizarDeuda } = useDebt();
  const deuda = deudas.find(d => d.id === id);
  const [tipo, setTipo] = useState<Movimiento["tipo"]>("abono");
  const [monto, setMonto] = useState<number>(0);
  const [nota, setNota] = useState("");

  if (!deuda) return null;

  const agregarMovimiento = () => {
    const mov: Movimiento = {
      id: uuidv4(),
      tipo,
      monto,
      fecha: new Date().toISOString(),
      nota
    };
    const montoPagado = tipo === "abono" ? deuda.montoPagado + monto : deuda.montoPagado;
    const montoTotal = tipo === "aumento" ? deuda.montoTotal + monto : deuda.montoTotal;
    const actualizada = { ...deuda, montoPagado, montoTotal, movimientos: [...deuda.movimientos, mov] };
    actualizarDeuda(id, actualizada);
    setMonto(0); setNota("");
  };

  return (
    <div style={{ marginTop: 12 }}>
      <div className="card">
        <h3>Detalle: {deuda.descripcion}</h3>
        <div className="small">Total: ${deuda.montoTotal.toFixed(2)} • Pagado: ${deuda.montoPagado.toFixed(2)} • Restante: ${(deuda.montoTotal - deuda.montoPagado).toFixed(2)}</div>
        <h4 style={{ marginTop: 8 }}>Movimientos</h4>
        <table>
          <thead><tr><th>Fecha</th><th>Tipo</th><th>Monto</th><th>Nota</th></tr></thead>
          <tbody>
            {deuda.movimientos.map(m => (
              <tr key={m.id}>
                <td className="small">{new Date(m.fecha).toLocaleString()}</td>
                <td className="small">{m.tipo}</td>
                <td>${m.monto.toFixed(2)}</td>
                <td className="small">{m.nota}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: 8 }}>
          <h4>Añadir movimiento</h4>
          <div style={{ display: "flex", gap: 8 }}>
            <select value={tipo} onChange={e=>setTipo(e.target.value as any)}>
              <option value="abono">Abono</option>
              <option value="aumento">Aumento</option>
            </select>
            <input type="number" step="0.01" value={monto} onChange={e=>setMonto(Number(e.target.value))} placeholder="Monto" />
            <input placeholder="Nota" value={nota} onChange={e=>setNota(e.target.value)} />
            <button onClick={agregarMovimiento}>Añadir</button>
            <button onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebtDetail;

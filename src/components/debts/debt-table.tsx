import React, { useState } from "react";
import { useDebt } from "../../context/mainContext";
import DebtForm from "./debt-form";

const DebtTable: React.FC = () => {
  const { deudas, totales, reiniciar, aplicarRedisposicion } = useDebt();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="card">
      <h2>Deudas</h2>
      <DebtForm />
      <table>
        <thead>
          <tr>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Monto Total</th>
            <th>Pagado</th>
            <th>Restante</th>
            <th>Fecha Límite</th>
            <th>Prioridad</th>
            <th>Redisponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {deudas.map(d => (
            <tr key={d.id}>
              <td style={{ cursor: "pointer" }} onClick={() => setExpandedId(expandedId === d.id ? null : d.id)}>{d.descripcion}</td>
              <td>{d.categoria}</td>
              <td>${d.montoTotal.toFixed(2)}</td>
              <td>${d.montoPagado.toFixed(2)}</td>
              <td>${(d.montoTotal - d.montoPagado).toFixed(2)}</td>
              <td className="small">{d.fechaLimite}</td>
              <td className="small">{["Alta","Media","Baja"][d.prioridad-1]}</td>
              <td className="small">{d.redisponible ? `$${(d.montoRedisponible ?? 0).toFixed(2)}` : "No"}</td>
              <td>
                <button onClick={()=>reiniciar(d.id)} className="small">Reiniciar</button>{" "}
                {d.redisponible && <button onClick={()=>aplicarRedisposicion(d.id)} className="small">Redisponer</button>}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot style={{ fontWeight: 700 }}>
          <tr>
            <td>Totales</td><td></td>
            <td>${totales.total.toFixed(2)}</td>
            <td>${totales.pagado.toFixed(2)}</td>
            <td>${totales.restante.toFixed(2)}</td>
            <td colSpan={4}></td>
          </tr>
        </tfoot>
      </table>

      {expandedId && <DebtDetail id={expandedId} onClose={()=>setExpandedId(null)} />}
    </section>
  );
};

export default DebtTable;

// Nota: Import inline para evitar ciclos
import DebtDetail from "./debt-detail";

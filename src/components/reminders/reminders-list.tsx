import React from "react";
import { useDebt } from "../../context/mainContext";
import { calcularPagoRecomendado, debeMostrarRecordatorio } from "../../utils/calculations";

const RemindersList: React.FC = () => {
  const { deudas, registrarPagoRecomendado } = useDebt();

  const recordatorios = deudas.filter(d => debeMostrarRecordatorio(d));

  if (recordatorios.length === 0) {
    return <section className="card"><h2>Recordatorios</h2><p className="small">No hay recordatorios activos.</p></section>;
  }

  return (
    <section className="card">
      <h2>Recordatorios (Mejora de crédito)</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {recordatorios.map(d => {
          const monto = calcularPagoRecomendado(d, d.porcentajeRecomendado ?? 30);
          return (
            <li key={d.id} style={{ borderBottom: "1px solid #eee", padding: 8 }}>
              <div><strong>{d.descripcion}</strong> - Corte: {d.fechaCorte ?? "—"}</div>
              <div className="small">Pagar antes del corte: <strong>${monto.toFixed(2)}</strong> para dejar {d.porcentajeRecomendado ?? 30}%</div>
              <div style={{ marginTop: 6 }}>
                <button onClick={()=>registrarPagoRecomendado(d.id)}>Registrar pago recomendado</button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default RemindersList;

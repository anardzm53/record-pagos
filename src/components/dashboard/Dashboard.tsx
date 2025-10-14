import React from "react";
import { useDebt } from "../../context/mainContext";

const Dashboard: React.FC = () => {
  const { totales } = useDebt();
  return (
    <section className="card" style={{ marginBottom: 12 }}>
      <h2>Resumen</h2>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1, padding: 12, background: "#f3f4f6", borderRadius: 6 }}>
          <div className="small">Total Deudas</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>${totales.total.toFixed(2)}</div>
        </div>
        <div style={{ flex: 1, padding: 12, background: "#f3f4f6", borderRadius: 6 }}>
          <div className="small">Total Pagado</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>${totales.pagado.toFixed(2)}</div>
        </div>
        <div style={{ flex: 1, padding: 12, background: "#f3f4f6", borderRadius: 6 }}>
          <div className="small">Total Pendiente</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>${totales.restante.toFixed(2)}</div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

{/* <div className="card">
  <h2 className="text-xl mb-2">💰 Resumen Financiero</h2>
  <p>Total Deudas: <span className="text-danger font-bold">$15,230.50</span></p>
  <p>Pagado: <span className="text-success font-bold">$8,000.00</span></p>
  <div className="mt-4 flex gap-2">
    <button className="btn btn-primary">+ Nueva Deuda</button>
    <button className="btn btn-secondary">📊 Exportar Excel</button>
  </div>
</div> */}


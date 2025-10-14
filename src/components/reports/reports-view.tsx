import React from "react";
import ExportExcelButton from "./export-excel-button";
import { useDebt } from "../../context/mainContext";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE","#00C49F","#FFBB28","#FF8042","#A78BFA"];

const ReportsView: React.FC = () => {
  const { deudas } = useDebt();

  const porCategoria = deudas.reduce<Record<string, number>>((acc, d) => {
    acc[d.categoria] = (acc[d.categoria] || 0) + (d.montoTotal - d.montoPagado);
    return acc;
  }, {});

  const data = Object.entries(porCategoria).map(([name, value]) => ({ name, value }));

  return (
    <section className="card">
      <h2>Informes</h2>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <div style={{ width: 250, height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
                {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <ExportExcelButton />
        </div>
      </div>
    </section>
  );
};

export default ReportsView;

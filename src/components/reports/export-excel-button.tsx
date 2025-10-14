import React from "react";
import { useDebt } from "../../context/mainContext";
import { exportarExcel } from "../../utils/exportUtils";

const ExportExcelButton: React.FC = () => {
  const { deudas } = useDebt();
  return (
    <button onClick={() => exportarExcel(deudas)} style={{ background: "#10b981", color: "#fff", padding: "8px 12px", borderRadius: 6 }}>
      📤 Exportar a Excel
    </button>
  );
};

export default ExportExcelButton;

import React from "react";
import { MainProvider } from "./context/mainProvider";
import Navbar from "./components/common/nav-bar/nav-bar";
import Dashboard from "./components/dashboard/Dashboard";
import DebtTable from "./components/debts/debt-table";
import RemindersList from "./components/reminders/reminders-list";
import ReportsView from "./components/reports/reports-view";

const App: React.FC = () => {
  return (
    <MainProvider>
      <div className="app">
        <Navbar />
        <main className="container">
          <Dashboard />
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
            <DebtTable />
            <RemindersList />
            <ReportsView />
          </div>
        </main>
      </div>
    </MainProvider>
  );
};

export default App;

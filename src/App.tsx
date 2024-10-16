import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { Sidebar } from "./components/Sidebar";
import { VehicleManagement } from "./components/VehicleManagement";
import { EarningDetails } from "./components/EarningDetails";
import { Reports } from "./components/Reports";
import { ServiceRequest } from "./components/ServiceRequest";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RiderManagement } from "./components/RiderManagement";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Router>
      <main className="w-full h-screen flex flex-row relative">
        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/rider-management" element={<RiderManagement />} />
            <Route path="/vehicle-management" element={<VehicleManagement />} />
            <Route path="/earning-details" element={<EarningDetails />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/service-request" element={<ServiceRequest />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;

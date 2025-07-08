import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DroneProvider } from './context/DroneContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BuildingSelection from './components/BuildingSelection';
import CleaningTasks from './components/CleaningTasks';
import FlightPath from './components/FlightPath';
import DroneMonitor from './components/DroneMonitor';
import ManualControl from './components/ManualControl';
import CleaningEquipment from './components/CleaningEquipment';
import CleaningLogs from './components/CleaningLogs';
import FleetManagement from './components/FleetManagement';
import Emergency from './components/Emergency';
import SafetyChecklist from './components/SafetyChecklist';
import WeatherAlerts from './components/WeatherAlerts';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const handleLogin = (username, password, role) => {
    // Simple authentication logic
    if (username && password) {
      setIsAuthenticated(true);
      setUserRole(role);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <DroneProvider>
      <Router>
        <div className="App">
          <Navbar userRole={userRole} onLogout={handleLogout} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/buildings" element={<BuildingSelection />} />
              <Route path="/tasks" element={<CleaningTasks />} />
              <Route path="/flight-path" element={<FlightPath />} />
              <Route path="/monitor" element={<DroneMonitor />} />
              <Route path="/manual-control" element={<ManualControl />} />
              <Route path="/equipment" element={<CleaningEquipment />} />
              <Route path="/logs" element={<CleaningLogs />} />
              <Route path="/fleet" element={<FleetManagement />} />
              <Route path="/emergency" element={<Emergency />} />
              <Route path="/safety" element={<SafetyChecklist />} />
              <Route path="/weather" element={<WeatherAlerts />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DroneProvider>
  );
}

export default App;
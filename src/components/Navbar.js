import React from 'react';
import { Link } from 'react-router-dom';
import { Drone, Settings, Shield, Users } from 'lucide-react';

function Navbar({ userRole, onLogout }) {
  const isAdmin = userRole === 'admin';
  const isOperator = userRole === 'operator' || userRole === 'admin';
  const isSupervisor = userRole === 'supervisor' || userRole === 'admin';

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Drone className="inline" size={24} />
          DroneClean Pro
        </div>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Dashboard</Link>
          
          {isOperator && (
            <>
              <Link to="/buildings" className="nav-link">Buildings</Link>
              <Link to="/tasks" className="nav-link">Tasks</Link>
              <Link to="/monitor" className="nav-link">Monitor</Link>
              <Link to="/safety" className="nav-link">Safety</Link>
            </>
          )}
          
          {isSupervisor && (
            <>
              <Link to="/logs" className="nav-link">Logs</Link>
              <Link to="/weather" className="nav-link">Weather</Link>
            </>
          )}
          
          {isAdmin && (
            <>
              <Link to="/fleet" className="nav-link">Fleet</Link>
              <Link to="/emergency" className="nav-link">Emergency</Link>
            </>
          )}
        </div>
        
        <div className="nav-user">
          <span>{userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}</span>
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
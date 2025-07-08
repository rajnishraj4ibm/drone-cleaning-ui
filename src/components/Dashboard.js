import React from 'react';
import { useDrone } from '../context/DroneContext';
import { Activity, Building, CheckCircle, AlertTriangle, Battery, Wind } from 'lucide-react';

function Dashboard() {
  const { state } = useDrone();
  const { drones, activeTasks, buildings, weatherData, emergencyStatus } = state;

  const activeDrones = drones.filter(drone => drone.status === 'active').length;
  const availableDrones = drones.filter(drone => drone.status === 'available').length;
  const averageBattery = Math.round(drones.reduce((sum, drone) => sum + drone.battery, 0) / drones.length);

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#2d3748' }}>
        Drone Cleaning Management Dashboard
      </h1>
      
      {emergencyStatus && (
        <div className="alert alert-danger">
          <AlertTriangle size={20} className="inline" />
          Emergency Protocol Active - All operations suspended
        </div>
      )}
      
      <div className="stats-grid">
        <div className="stat-card">
          <Activity size={32} color="#667eea" />
          <div className="stat-value">{activeDrones}</div>
          <div className="stat-label">Active Drones</div>
        </div>
        
        <div className="stat-card">
          <CheckCircle size={32} color="#38a169" />
          <div className="stat-value">{availableDrones}</div>
          <div className="stat-label">Available Drones</div>
        </div>
        
        <div className="stat-card">
          <Building size={32} color="#ed8936" />
          <div className="stat-value">{buildings.length}</div>
          <div className="stat-label">Registered Buildings</div>
        </div>
        
        <div className="stat-card">
          <Battery size={32} color="#3182ce" />
          <div className="stat-value">{averageBattery}%</div>
          <div className="stat-label">Average Battery</div>
        </div>
      </div>
      
      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Active Tasks</h2>
          </div>
          {activeTasks.length === 0 ? (
            <p style={{ color: '#718096' }}>No active cleaning tasks</p>
          ) : (
            <div className="space-y-2">
              {activeTasks.map(task => (
                <div key={task.id} style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '600' }}>{task.building}</span>
                    <span className="status status-active">{task.status}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                  </div>
                  <small style={{ color: '#718096' }}>{task.progress}% Complete</small>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Weather Conditions</h2>
            <Wind size={20} color="#718096" />
          </div>
          <div className="grid grid-2" style={{ gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
                {weatherData.temperature}°C
              </div>
              <div style={{ color: '#718096' }}>{weatherData.condition}</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
                {weatherData.windSpeed} km/h
              </div>
              <div style={{ color: '#718096' }}>Wind Speed</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
                {weatherData.visibility} km
              </div>
              <div style={{ color: '#718096' }}>Visibility</div>
            </div>
            <div>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
                {weatherData.humidity}%
              </div>
              <div style={{ color: '#718096' }}>Humidity</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Drone Fleet Status</h2>
        </div>
        <div className="grid grid-3">
          {drones.map(drone => (
            <div key={drone.id} style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: '600' }}>{drone.name}</span>
                <span className={`status status-${drone.status}`}>{drone.status}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Battery size={16} />
                <span>{drone.battery}%</span>
                <div className="progress-bar" style={{ flex: 1 }}>
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${drone.battery}%`,
                      background: drone.battery > 20 ? 'linear-gradient(90deg, #667eea, #764ba2)' : '#e53e3e'
                    }}
                  ></div>
                </div>
              </div>
              <small style={{ color: '#718096' }}>{drone.location}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
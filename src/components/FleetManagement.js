import React from 'react';
import { useDrone } from '../context/DroneContext';
import { Wrench, Battery, Calendar, AlertTriangle } from 'lucide-react';

function FleetManagement() {
  const { state, dispatch } = useDrone();
  const { drones } = state;

  const updateDroneStatus = (droneId, newStatus) => {
    dispatch({
      type: 'UPDATE_DRONE_STATUS',
      payload: { id: droneId, updates: { status: newStatus } }
    });
  };

  const scheduleMaintenance = (droneId) => {
    updateDroneStatus(droneId, 'maintenance');
    alert('Maintenance scheduled for drone');
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#2d3748' }}>
        <Wrench className="inline" size={32} />
        Fleet Management
      </h1>

      <div className="grid grid-3">
        {drones.map(drone => (
          <div key={drone.id} className="card">
            <div className="card-header">
              <h3 className="card-title">{drone.name}</h3>
              <span className={`status status-${drone.status}`}>{drone.status}</span>
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Battery size={16} />
                <span>Battery: {drone.battery}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${drone.battery}%`,
                    background: drone.battery > 20 ? 'linear-gradient(90deg, #667eea, #764ba2)' : '#e53e3e'
                  }}
                ></div>
              </div>
            </div>

            <div style={{ fontSize: '0.875rem', color: '#718096', marginBottom: '1rem' }}>
              <div>Location: {drone.location}</div>
              <div>Flight Hours: {Math.round(Math.random() * 100)}h</div>
              <div>Last Service: {Math.floor(Math.random() * 30)} days ago</div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {drone.status === 'available' && (
                <button 
                  className="btn btn-primary" 
                  style={{ flex: 1 }}
                  onClick={() => scheduleMaintenance(drone.id)}
                >
                  <Calendar size={14} />
                  Schedule
                </button>
              )}
              {drone.status === 'maintenance' && (
                <button 
                  className="btn btn-success" 
                  style={{ flex: 1 }}
                  onClick={() => updateDroneStatus(drone.id, 'available')}
                >
                  ✓ Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="card-header">
          <h2 className="card-title">Fleet Overview</h2>
        </div>
        <div className="grid grid-4">
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
              {drones.filter(d => d.status === 'available').length}
            </div>
            <div style={{ color: '#718096' }}>Available</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
              {drones.filter(d => d.status === 'active').length}
            </div>
            <div style={{ color: '#718096' }}>Active</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
              {drones.filter(d => d.status === 'maintenance').length}
            </div>
            <div style={{ color: '#718096' }}>Maintenance</div>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
              {Math.round(drones.reduce((sum, drone) => sum + drone.battery, 0) / drones.length)}%
            </div>
            <div style={{ color: '#718096' }}>Avg Battery</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FleetManagement;
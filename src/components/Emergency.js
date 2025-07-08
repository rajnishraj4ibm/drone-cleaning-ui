import React from 'react';
import { useDrone } from '../context/DroneContext';
import { AlertTriangle, Home, Square, RotateCcw } from 'lucide-react';

function Emergency() {
  const { state, dispatch } = useDrone();
  const { emergencyStatus, activeTasks, drones } = state;

  const triggerEmergency = () => {
    dispatch({ type: 'TRIGGER_EMERGENCY', payload: true });
    alert('EMERGENCY PROTOCOL ACTIVATED - All drones returning to base');
  };

  const clearEmergency = () => {
    dispatch({ type: 'TRIGGER_EMERGENCY', payload: false });
    alert('Emergency protocol cleared - Normal operations can resume');
  };

  const returnToHome = () => {
    alert('All active drones commanded to return to home base');
  };

  const emergencyLanding = () => {
    alert('Emergency landing initiated for all drones');
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#2d3748' }}>
        <AlertTriangle className="inline" size={32} />
        Emergency Control Center
      </h1>

      {emergencyStatus && (
        <div className="alert alert-danger" style={{ marginBottom: '2rem' }}>
          <AlertTriangle size={20} className="inline" />
          <strong>EMERGENCY PROTOCOL ACTIVE</strong> - All autonomous operations suspended
        </div>
      )}

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Emergency Actions</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              className={`btn ${emergencyStatus ? 'btn-success' : 'btn-danger'}`}
              style={{ padding: '1.5rem' }}
              onClick={emergencyStatus ? clearEmergency : triggerEmergency}
            >
              {emergencyStatus ? (
                <>
                  <RotateCcw size={24} />
                  Clear Emergency Protocol
                </>
              ) : (
                <>
                  <AlertTriangle size={24} />
                  ACTIVATE EMERGENCY STOP
                </>
              )}
            </button>
            
            <button className="btn btn-primary" onClick={returnToHome}>
              <Home size={16} />
              Return All Drones to Home
            </button>
            
            <button className="btn btn-danger" onClick={emergencyLanding}>
              <Square size={16} />
              Emergency Landing (All Drones)
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Current Status</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div>
              <strong>Emergency Status:</strong> {emergencyStatus ? 'ACTIVE' : 'Normal'}
            </div>
            <div>
              <strong>Active Tasks:</strong> {activeTasks.length}
            </div>
            <div>
              <strong>Drones in Air:</strong> {drones.filter(d => d.status === 'active').length}
            </div>
            <div>
              <strong>System Health:</strong> All systems operational
            </div>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <h4 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Emergency Contacts</h4>
            <div style={{ fontSize: '0.875rem', color: '#718096' }}>
              <div>Control Tower: +1-555-0123</div>
              <div>Safety Officer: +1-555-0124</div>
              <div>Technical Support: +1-555-0125</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Emergency Procedures</h2>
        </div>
        
        <div className="grid grid-2">
          <div>
            <h4 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Weather Emergency</h4>
            <ol style={{ fontSize: '0.875rem', color: '#718096', paddingLeft: '1rem' }}>
              <li>Monitor wind speeds and visibility</li>
              <li>Recall drones if conditions deteriorate</li>
              <li>Secure equipment at landing site</li>
              <li>Wait for safe conditions before resuming</li>
            </ol>
          </div>
          
          <div>
            <h4 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Equipment Failure</h4>
            <ol style={{ fontSize: '0.875rem', color: '#718096', paddingLeft: '1rem' }}>
              <li>Immediately halt affected drone</li>
              <li>Switch to manual control if possible</li>
              <li>Initiate emergency landing protocol</li>
              <li>Isolate affected systems</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Emergency;
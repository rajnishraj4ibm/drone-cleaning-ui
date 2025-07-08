import React, { useState, useEffect } from 'react';
import { useDrone } from '../context/DroneContext';
import { Activity, Camera, Gauge, Navigation, Thermometer, Eye } from 'lucide-react';

function DroneMonitor() {
  const { state, dispatch } = useDrone();
  const { currentTask, telemetry, activeTasks, drones } = state;
  const [isLiveMode, setIsLiveMode] = useState(false);

  // Simulate real-time telemetry updates
  useEffect(() => {
    if (isLiveMode && activeTasks.length > 0) {
      const interval = setInterval(() => {
        const randomTelemetry = {
          altitude: Math.round(20 + Math.random() * 80), // 20-100m
          speed: Math.round(5 + Math.random() * 15), // 5-20 km/h
          heading: Math.round(Math.random() * 360), // 0-360 degrees
          pressure: Math.round(1013 + Math.random() * 20 - 10), // Around 1013 hPa
          temperature: Math.round(18 + Math.random() * 10) // 18-28°C
        };
        dispatch({ type: 'UPDATE_TELEMETRY', payload: randomTelemetry });
        
        // Update task progress
        activeTasks.forEach(task => {
          if (task.progress < 100) {
            const newProgress = Math.min(task.progress + Math.random() * 2, 100);
            // Note: In a real app, you'd update the specific task progress
          }
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isLiveMode, activeTasks.length, dispatch]);

  const activeTask = activeTasks[0]; // Get first active task
  const activeDrone = activeTask ? drones.find(d => d.id === activeTask.droneId) : null;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2d3748' }}>
          <Activity className="inline" size={32} />
          Live Drone Monitoring
        </h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              checked={isLiveMode}
              onChange={(e) => setIsLiveMode(e.target.checked)}
            />
            Live Telemetry
          </label>
          {isLiveMode && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#38a169' }}>
              <div style={{ width: '8px', height: '8px', background: '#38a169', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
              LIVE
            </div>
          )}
        </div>
      </div>

      {!activeTask && (
        <div className="alert alert-info">
          No active cleaning tasks to monitor. Start a task to see live drone data.
        </div>
      )}

      <div className="grid grid-2">
        {/* Video Feed */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Live Video Feed</h2>
            <Camera size={20} color="#718096" />
          </div>
          <div style={{ 
            height: '300px', 
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            position: 'relative'
          }}>
            {isLiveMode ? (
              <>
                <div style={{ textAlign: 'center' }}>
                  <Camera size={48} />
                  <div style={{ marginTop: '1rem' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                      {activeDrone?.name || 'Drone Camera'}
                    </div>
                    <div>Altitude: {telemetry.altitude}m</div>
                  </div>
                </div>
                <div style={{ 
                  position: 'absolute', 
                  top: '10px', 
                  right: '10px',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.875rem'
                }}>
                  🔴 REC
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Eye size={48} />
                <div style={{ marginTop: '1rem' }}>Video feed unavailable</div>
                <div style={{ fontSize: '0.875rem', opacity: '0.8' }}>
                  Enable live mode to view feed
                </div>
              </div>
            )}
          </div>
          
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary" style={{ flex: 1 }}>
              📷 Snapshot
            </button>
            <button className="btn btn-secondary" style={{ flex: 1 }}>
              🎥 Record
            </button>
            <button className="btn btn-secondary" style={{ flex: 1 }}>
              🔍 Zoom
            </button>
          </div>
        </div>

        {/* Telemetry */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Flight Telemetry</h2>
            <Gauge size={20} color="#718096" />
          </div>
          
          <div className="grid grid-2" style={{ gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <Activity size={24} color="#667eea" />
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748', margin: '0.5rem 0' }}>
                {telemetry.altitude}m
              </div>
              <div style={{ color: '#718096' }}>Altitude</div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <Navigation size={24} color="#38a169" />
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748', margin: '0.5rem 0' }}>
                {telemetry.speed} km/h
              </div>
              <div style={{ color: '#718096' }}>Speed</div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <Navigation size={24} color="#ed8936" />
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748', margin: '0.5rem 0' }}>
                {telemetry.heading}°
              </div>
              <div style={{ color: '#718096' }}>Heading</div>
            </div>
            
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <Thermometer size={24} color="#e53e3e" />
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748', margin: '0.5rem 0' }}>
                {telemetry.temperature}°C
              </div>
              <div style={{ color: '#718096' }}>Temperature</div>
            </div>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <div style={{ marginBottom: '0.5rem', color: '#718096' }}>
              Barometric Pressure: {telemetry.pressure} hPa
            </div>
            <div style={{ marginBottom: '0.5rem', color: '#718096' }}>
              GPS Signal: Strong (12 satellites)
            </div>
            <div style={{ marginBottom: '0.5rem', color: '#718096' }}>
              Connection: 4G/5G Strong
            </div>
          </div>
        </div>
      </div>

      {activeTask && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Current Task Progress</h2>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: '600' }}>{activeTask.building} - {activeTask.area}</span>
              <span>{Math.round(activeTask.progress)}% Complete</span>
            </div>
            <div className="progress-bar" style={{ height: '12px' }}>
              <div className="progress-fill" style={{ width: `${activeTask.progress}%` }}></div>
            </div>
          </div>
          
          <div className="grid grid-3">
            <div>
              <div style={{ fontSize: '0.875rem', color: '#718096' }}>Assigned Drone</div>
              <div style={{ fontWeight: '600' }}>{activeDrone?.name}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#718096' }}>Cleaning Mode</div>
              <div style={{ fontWeight: '600' }}>{activeTask.mode}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#718096' }}>Solution Type</div>
              <div style={{ fontWeight: '600' }}>{activeTask.cleaningSolution}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">System Alerts</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div className="alert alert-success" style={{ margin: 0 }}>
              ✅ All systems operational
            </div>
            <div className="alert alert-info" style={{ margin: 0 }}>
              ℹ️ Weather conditions: Optimal for cleaning
            </div>
            {telemetry.altitude > 80 && (
              <div className="alert alert-warning" style={{ margin: 0 }}>
                ⚠️ High altitude detected - Monitor wind conditions
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Quick Controls</h2>
          </div>
          <div className="grid grid-2" style={{ gap: '0.5rem' }}>
            <button className="btn btn-primary">
              📍 Return to Home
            </button>
            <button className="btn btn-secondary">
              ⏸️ Pause Task
            </button>
            <button className="btn btn-danger">
              🛑 Emergency Stop
            </button>
            <button className="btn btn-success">
              ✅ Resume Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DroneMonitor;
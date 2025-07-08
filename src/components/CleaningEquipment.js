import React, { useState } from 'react';
import { useDrone } from '../context/DroneContext';
import { Droplets, RotateCw, Gauge, Settings } from 'lucide-react';

function CleaningEquipment() {
  const { state } = useDrone();
  const { activeTasks, drones } = state;
  const [equipmentSettings, setEquipmentSettings] = useState({
    sprayRate: 50,
    brushRotation: 75,
    squeegePressure: 60,
    waterPressure: 80,
    solutionMix: 'standard',
    brushSpeed: 1200
  });

  const activeTask = activeTasks[0];
  const activeDrone = activeTask ? drones.find(d => d.id === activeTask.droneId) : null;

  const updateSetting = (setting, value) => {
    setEquipmentSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const applySettings = () => {
    alert('Equipment settings applied to active drone');
    console.log('Applied settings:', equipmentSettings);
  };

  const calibrateEquipment = () => {
    alert('Equipment calibration started');
  };

  const emergencyStop = () => {
    alert('Emergency stop - All cleaning equipment disabled');
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#2d3748' }}>
        <Settings className="inline" size={32} />
        Cleaning Equipment Control
      </h1>

      {!activeTask && (
        <div className="alert alert-info">
          Equipment controls are available when a cleaning task is active.
        </div>
      )}

      {activeTask && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <h2 className="card-title">Active Equipment Status</h2>
          </div>
          <div className="grid grid-3">
            <div>
              <div style={{ fontSize: '0.875rem', color: '#718096' }}>Active Task</div>
              <div style={{ fontWeight: '600' }}>{activeTask.building}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.875rem', color: '#718096' }}>Assigned Drone</div>
              <div style={{ fontWeight: '600' }}>{activeDrone?.name}</div>
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
            <h2 className="card-title">Spray System Controls</h2>
            <Droplets size={20} color="#718096" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Spray Rate (%)</label>
            <input
              type="range"
              className="form-input"
              min="0"
              max="100"
              value={equipmentSettings.sprayRate}
              onChange={(e) => updateSetting('sprayRate', parseInt(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#718096' }}>
              <span>Off</span>
              <span>{equipmentSettings.sprayRate}%</span>
              <span>Max</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Water Pressure (PSI)</label>
            <input
              type="range"
              className="form-input"
              min="20"
              max="100"
              value={equipmentSettings.waterPressure}
              onChange={(e) => updateSetting('waterPressure', parseInt(e.target.value))}
            />
            <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#718096' }}>
              {equipmentSettings.waterPressure} PSI
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Solution Mix</label>
            <select
              className="form-select"
              value={equipmentSettings.solutionMix}
              onChange={(e) => updateSetting('solutionMix', e.target.value)}
            >
              <option value="water-only">Water Only</option>
              <option value="standard">Standard Mix (1:10)</option>
              <option value="concentrated">Concentrated (1:5)</option>
              <option value="eco-friendly">Eco-Friendly</option>
              <option value="heavy-duty">Heavy-Duty</option>
            </select>
          </div>

          <div className="grid grid-2" style={{ gap: '0.5rem' }}>
            <button className="btn btn-primary">
              💧 Start Spray
            </button>
            <button className="btn btn-secondary">
              ⏹️ Stop Spray
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Brush System Controls</h2>
            <RotateCw size={20} color="#718096" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Brush Rotation Speed (%)</label>
            <input
              type="range"
              className="form-input"
              min="0"
              max="100"
              value={equipmentSettings.brushRotation}
              onChange={(e) => updateSetting('brushRotation', parseInt(e.target.value))}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#718096' }}>
              <span>Off</span>
              <span>{equipmentSettings.brushRotation}%</span>
              <span>Max</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Brush Speed (RPM)</label>
            <input
              type="number"
              className="form-input"
              min="0"
              max="2000"
              step="100"
              value={equipmentSettings.brushSpeed}
              onChange={(e) => updateSetting('brushSpeed', parseInt(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Brush Pattern</label>
            <select className="form-select">
              <option value="circular">Circular Motion</option>
              <option value="oscillating">Oscillating</option>
              <option value="orbital">Orbital</option>
            </select>
          </div>

          <div className="grid grid-2" style={{ gap: '0.5rem' }}>
            <button className="btn btn-primary">
              🔄 Start Brushes
            </button>
            <button className="btn btn-secondary">
              ⏹️ Stop Brushes
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Squeegee System</h2>
            <Gauge size={20} color="#718096" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Squeegee Pressure (%)</label>
            <input
              type="range"
              className="form-input"
              min="0"
              max="100"
              value={equipmentSettings.squeegePressure}
              onChange={(e) => updateSetting('squeegePressure', parseInt(e.target.value))}
            />
            <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#718096' }}>
              {equipmentSettings.squeegePressure}%
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Squeegee Angle</label>
            <select className="form-select">
              <option value="45">45° (Standard)</option>
              <option value="30">30° (Light)</option>
              <option value="60">60° (Heavy)</option>
              <option value="auto">Auto-Adjust</option>
            </select>
          </div>

          <div className="grid grid-2" style={{ gap: '0.5rem' }}>
            <button className="btn btn-primary">
              📏 Engage Squeegee
            </button>
            <button className="btn btn-secondary">
              📤 Retract
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">System Status</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div className="alert alert-success" style={{ margin: 0 }}>
              ✅ Spray System: Operational
            </div>
            <div className="alert alert-success" style={{ margin: 0 }}>
              ✅ Brush System: Operational
            </div>
            <div className="alert alert-success" style={{ margin: 0 }}>
              ✅ Squeegee System: Operational
            </div>
            <div className="alert alert-info" style={{ margin: 0 }}>
              ℹ️ Solution Tank: 78% Full
            </div>
            <div className="alert alert-info" style={{ margin: 0 }}>
              ℹ️ Water Tank: 65% Full
            </div>
          </div>

          <div style={{ marginTop: '1rem' }}>
            <h4 style={{ marginBottom: '0.5rem', color: '#2d3748' }}>Tank Levels</h4>
            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>Cleaning Solution</span>
                <span>78%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '78%' }}></div>
              </div>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>Fresh Water</span>
                <span>65%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Equipment Control Actions</h2>
        </div>
        
        <div className="grid grid-4">
          <button 
            className="btn btn-primary"
            onClick={applySettings}
          >
            💾 Apply All Settings
          </button>
          <button 
            className="btn btn-secondary"
            onClick={calibrateEquipment}
          >
            ⚙️ Calibrate Equipment
          </button>
          <button 
            className="btn btn-danger"
            onClick={emergencyStop}
          >
            🛑 Emergency Stop
          </button>
          <button className="btn btn-secondary">
            🔄 Reset to Default
          </button>
        </div>
        
        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
          <h4 style={{ marginBottom: '1rem', color: '#2d3748' }}>Current Settings Summary</h4>
          <div className="grid grid-3" style={{ gap: '1rem', fontSize: '0.875rem' }}>
            <div>
              <strong>Spray Rate:</strong> {equipmentSettings.sprayRate}%<br/>
              <strong>Water Pressure:</strong> {equipmentSettings.waterPressure} PSI<br/>
              <strong>Solution Mix:</strong> {equipmentSettings.solutionMix}
            </div>
            <div>
              <strong>Brush Rotation:</strong> {equipmentSettings.brushRotation}%<br/>
              <strong>Brush Speed:</strong> {equipmentSettings.brushSpeed} RPM<br/>
              <strong>Squeegee Pressure:</strong> {equipmentSettings.squeegePressure}%
            </div>
            <div>
              <strong>Status:</strong> {activeTask ? 'Active' : 'Standby'}<br/>
              <strong>Last Updated:</strong> {new Date().toLocaleTimeString()}<br/>
              <strong>Equipment Health:</strong> 95%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CleaningEquipment;
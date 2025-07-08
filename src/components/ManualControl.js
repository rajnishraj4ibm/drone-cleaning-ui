import React, { useState } from 'react';
import { useDrone } from '../context/DroneContext';
import { Gamepad2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCw, RotateCcw } from 'lucide-react';

function ManualControl() {
  const { state } = useDrone();
  const { activeTasks, drones } = state;
  const [isManualMode, setIsManualMode] = useState(false);
  const [controllerState, setControllerState] = useState({
    throttle: 50,
    yaw: 0,
    pitch: 0,
    roll: 0
  });

  const activeTask = activeTasks[0];
  const activeDrone = activeTask ? drones.find(d => d.id === activeTask.droneId) : null;

  const handleControlChange = (control, value) => {
    setControllerState(prev => ({
      ...prev,
      [control]: value
    }));
  };

  const executeCommand = (command) => {
    console.log(`Executing command: ${command}`);
    // In a real app, this would send commands to the drone
  };

  const emergencyLand = () => {
    setIsManualMode(false);
    alert('Emergency landing initiated');
  };

  const returnToAuto = () => {
    setIsManualMode(false);
    alert('Returning to automatic mode');
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#2d3748' }}>
        <Gamepad2 className="inline" size={32} />
        Manual Drone Control
      </h1>

      {!activeTask && (
        <div className="alert alert-warning">
          No active tasks found. Manual control is only available during active cleaning operations.
        </div>
      )}

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Control Mode</h2>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="radio"
                  checked={!isManualMode}
                  onChange={() => setIsManualMode(false)}
                />
                Automatic Mode
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input
                  type="radio"
                  checked={isManualMode}
                  onChange={() => setIsManualMode(true)}
                />
                Manual Override
              </label>
            </div>
            
            {isManualMode && (
              <div className="alert alert-danger">
                <strong>Warning:</strong> Manual control engaged. Exercise extreme caution.
              </div>
            )}
          </div>

          {activeTask && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>Active Task Info</h3>
              <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
                <div><strong>Building:</strong> {activeTask.building}</div>
                <div><strong>Drone:</strong> {activeDrone?.name}</div>
                <div><strong>Progress:</strong> {activeTask.progress}%</div>
                <div><strong>Mode:</strong> {isManualMode ? 'Manual Override' : 'Automatic'}</div>
              </div>
            </div>
          )}

          <div className="grid grid-2" style={{ gap: '0.5rem' }}>
            <button 
              className="btn btn-danger"
              onClick={emergencyLand}
            >
              🚁 Emergency Land
            </button>
            <button 
              className="btn btn-success"
              onClick={returnToAuto}
              disabled={!isManualMode}
            >
              🤖 Return to Auto
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Flight Controls</h2>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label className="form-label">Throttle</label>
            <input
              type="range"
              className="form-input"
              min="0"
              max="100"
              value={controllerState.throttle}
              onChange={(e) => handleControlChange('throttle', parseInt(e.target.value))}
              disabled={!isManualMode}
            />
            <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#718096' }}>
              {controllerState.throttle}%
            </div>
          </div>

          {/* Virtual Joystick */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ position: 'relative', width: '150px', height: '150px' }}>
              <div style={{
                width: '150px',
                height: '150px',
                border: '2px solid #cbd5e0',
                borderRadius: '50%',
                position: 'relative',
                background: '#f7fafc'
              }}>
                {/* Directional buttons */}
                <button
                  className="btn btn-secondary"
                  style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    width: '30px',
                    height: '30px',
                    padding: '0'
                  }}
                  onMouseDown={() => executeCommand('move_forward')}
                  disabled={!isManualMode}
                >
                  <ArrowUp size={16} />
                </button>
                
                <button
                  className="btn btn-secondary"
                  style={{ 
                    position: 'absolute', 
                    bottom: '10px', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    width: '30px',
                    height: '30px',
                    padding: '0'
                  }}
                  onMouseDown={() => executeCommand('move_backward')}
                  disabled={!isManualMode}
                >
                  <ArrowDown size={16} />
                </button>
                
                <button
                  className="btn btn-secondary"
                  style={{ 
                    position: 'absolute', 
                    left: '10px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    width: '30px',
                    height: '30px',
                    padding: '0'
                  }}
                  onMouseDown={() => executeCommand('move_left')}
                  disabled={!isManualMode}
                >
                  <ArrowLeft size={16} />
                </button>
                
                <button
                  className="btn btn-secondary"
                  style={{ 
                    position: 'absolute', 
                    right: '10px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    width: '30px',
                    height: '30px',
                    padding: '0'
                  }}
                  onMouseDown={() => executeCommand('move_right')}
                  disabled={!isManualMode}
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-2" style={{ gap: '1rem' }}>
            <button
              className="btn btn-secondary"
              onMouseDown={() => executeCommand('rotate_left')}
              disabled={!isManualMode}
            >
              <RotateCcw size={16} />
              Rotate Left
            </button>
            <button
              className="btn btn-secondary"
              onMouseDown={() => executeCommand('rotate_right')}
              disabled={!isManualMode}
            >
              <RotateCw size={16} />
              Rotate Right
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Advanced Controls</h2>
        </div>
        
        <div className="grid grid-3">
          <div>
            <label className="form-label">Yaw Control</label>
            <input
              type="range"
              className="form-input"
              min="-100"
              max="100"
              value={controllerState.yaw}
              onChange={(e) => handleControlChange('yaw', parseInt(e.target.value))}
              disabled={!isManualMode}
            />
            <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#718096' }}>
              {controllerState.yaw}°
            </div>
          </div>
          
          <div>
            <label className="form-label">Pitch Control</label>
            <input
              type="range"
              className="form-input"
              min="-45"
              max="45"
              value={controllerState.pitch}
              onChange={(e) => handleControlChange('pitch', parseInt(e.target.value))}
              disabled={!isManualMode}
            />
            <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#718096' }}>
              {controllerState.pitch}°
            </div>
          </div>
          
          <div>
            <label className="form-label">Roll Control</label>
            <input
              type="range"
              className="form-input"
              min="-45"
              max="45"
              value={controllerState.roll}
              onChange={(e) => handleControlChange('roll', parseInt(e.target.value))}
              disabled={!isManualMode}
            />
            <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#718096' }}>
              {controllerState.roll}°
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Quick Commands</h2>
          </div>
          <div className="grid grid-2" style={{ gap: '0.5rem' }}>
            <button 
              className="btn btn-primary"
              onClick={() => executeCommand('hover')}
              disabled={!isManualMode}
            >
              ⏸️ Hover
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => executeCommand('ascend')}
              disabled={!isManualMode}
            >
              ⬆️ Ascend
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => executeCommand('descend')}
              disabled={!isManualMode}
            >
              ⬇️ Descend
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => executeCommand('return_home')}
              disabled={!isManualMode}
            >
              🏠 Return Home
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Safety Limits</h2>
          </div>
          <div style={{ fontSize: '0.875rem', color: '#718096' }}>
            <div style={{ marginBottom: '0.5rem' }}>Maximum Altitude: 120m</div>
            <div style={{ marginBottom: '0.5rem' }}>Maximum Speed: 25 km/h</div>
            <div style={{ marginBottom: '0.5rem' }}>Minimum Safe Distance: 3m</div>
            <div style={{ marginBottom: '0.5rem' }}>Emergency RTH: Active</div>
            <div style={{ marginBottom: '0.5rem' }}>Collision Avoidance: Enabled</div>
          </div>
          
          {isManualMode && (
            <div className="alert alert-warning" style={{ marginTop: '1rem' }}>
              Manual override bypasses some safety systems. Operator must maintain visual contact and safe operation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManualControl;
import React, { useState } from 'react';
import { useDrone } from '../context/DroneContext';
import { Play, Square, Clock, Droplets, RotateCcw } from 'lucide-react';

function CleaningTasks() {
  const { state, dispatch } = useDrone();
  const { selectedBuilding, drones, activeTasks, currentTask } = state;
  const [taskForm, setTaskForm] = useState({
    area: '',
    intensity: 'medium',
    mode: 'auto',
    droneId: '',
    cleaningSolution: 'standard'
  });

  const availableDrones = drones.filter(drone => drone.status === 'available');

  const handleStartTask = () => {
    if (!selectedBuilding || !taskForm.droneId) {
      alert('Please select a building and drone first');
      return;
    }

    const task = {
      id: Date.now(),
      building: selectedBuilding.name,
      droneId: parseInt(taskForm.droneId),
      area: taskForm.area,
      intensity: taskForm.intensity,
      mode: taskForm.mode,
      cleaningSolution: taskForm.cleaningSolution,
      status: 'active',
      progress: 0,
      startTime: new Date().toISOString(),
      estimatedDuration: Math.round(selectedBuilding.height / 10) // Simple calculation
    };

    dispatch({ type: 'START_TASK', payload: task });
    dispatch({ 
      type: 'UPDATE_DRONE_STATUS', 
      payload: { 
        id: parseInt(taskForm.droneId), 
        updates: { status: 'active', location: selectedBuilding.name } 
      } 
    });

    // Reset form
    setTaskForm({
      area: '',
      intensity: 'medium',
      mode: 'auto',
      droneId: '',
      cleaningSolution: 'standard'
    });
  };

  const handleStopTask = (taskId) => {
    const task = activeTasks.find(t => t.id === taskId);
    if (task) {
      const completedTask = {
        ...task,
        status: 'completed',
        endTime: new Date().toISOString(),
        duration: Math.round((Date.now() - new Date(task.startTime)) / 1000 / 60) // minutes
      };
      
      dispatch({ type: 'COMPLETE_TASK', payload: completedTask });
      dispatch({ 
        type: 'UPDATE_DRONE_STATUS', 
        payload: { 
          id: task.droneId, 
          updates: { status: 'available', location: 'Base Station' } 
        } 
      });
    }
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#2d3748' }}>
        <Droplets className="inline" size={32} />
        Cleaning Task Management
      </h1>

      {!selectedBuilding && (
        <div className="alert alert-warning">
          Please select a target building first before creating a cleaning task.
        </div>
      )}

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Create New Cleaning Task</h2>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleStartTask(); }}>
            <div className="form-group">
              <label className="form-label">Target Building</label>
              <input
                type="text"
                className="form-input"
                value={selectedBuilding?.name || ''}
                disabled
                placeholder="No building selected"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Cleaning Area</label>
              <select
                className="form-select"
                value={taskForm.area}
                onChange={(e) => setTaskForm({...taskForm, area: e.target.value})}
                required
              >
                <option value="">Select area</option>
                <option value="full-building">Full Building</option>
                <option value="north-face">North Face</option>
                <option value="south-face">South Face</option>
                <option value="east-face">East Face</option>
                <option value="west-face">West Face</option>
                <option value="custom">Custom Selection</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Cleaning Intensity</label>
              <select
                className="form-select"
                value={taskForm.intensity}
                onChange={(e) => setTaskForm({...taskForm, intensity: e.target.value})}
              >
                <option value="light">Light - Quick rinse</option>
                <option value="medium">Medium - Standard clean</option>
                <option value="heavy">Heavy - Deep clean</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Cleaning Mode</label>
              <select
                className="form-select"
                value={taskForm.mode}
                onChange={(e) => setTaskForm({...taskForm, mode: e.target.value})}
              >
                <option value="auto">Automatic</option>
                <option value="semi-auto">Semi-Automatic</option>
                <option value="manual">Manual Control</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Assign Drone</label>
              <select
                className="form-select"
                value={taskForm.droneId}
                onChange={(e) => setTaskForm({...taskForm, droneId: e.target.value})}
                required
              >
                <option value="">Select drone</option>
                {availableDrones.map(drone => (
                  <option key={drone.id} value={drone.id}>
                    {drone.name} - Battery: {drone.battery}%
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Cleaning Solution</label>
              <select
                className="form-select"
                value={taskForm.cleaningSolution}
                onChange={(e) => setTaskForm({...taskForm, cleaningSolution: e.target.value})}
              >
                <option value="standard">Standard Solution</option>
                <option value="eco-friendly">Eco-Friendly</option>
                <option value="heavy-duty">Heavy-Duty</option>
                <option value="water-only">Water Only</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={!selectedBuilding || availableDrones.length === 0}
            >
              <Play size={16} />
              Start Cleaning Task
            </button>
          </form>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Active Tasks</h2>
            <Clock size={20} color="#718096" />
          </div>
          
          {activeTasks.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '2rem' }}>
              No active cleaning tasks
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {activeTasks.map(task => {
                const drone = drones.find(d => d.id === task.droneId);
                return (
                  <div key={task.id} style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: '600' }}>{task.building}</span>
                      <span className="status status-active">{task.status}</span>
                    </div>
                    
                    <div style={{ fontSize: '0.875rem', color: '#718096', marginBottom: '0.5rem' }}>
                      Drone: {drone?.name} | Area: {task.area} | Mode: {task.mode}
                    </div>
                    
                    <div style={{ marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${task.progress}%` }}></div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        className="btn btn-danger"
                        style={{ flex: 1 }}
                        onClick={() => handleStopTask(task.id)}
                      >
                        <Square size={16} />
                        Stop Task
                      </button>
                      <button className="btn btn-secondary">
                        <RotateCcw size={16} />
                        Pause
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {selectedBuilding && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <div className="card-header">
            <h3 className="card-title">Task Estimation for {selectedBuilding.name}</h3>
          </div>
          <div className="grid grid-4">
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
                {selectedBuilding.floors * 4}
              </div>
              <div style={{ color: '#718096' }}>Windows</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
                {Math.round(selectedBuilding.height / 10)}h
              </div>
              <div style={{ color: '#718096' }}>Est. Duration</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
                {Math.round(selectedBuilding.height * 0.8)}L
              </div>
              <div style={{ color: '#718096' }}>Solution Needed</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
                {Math.round(selectedBuilding.height / 3)}
              </div>
              <div style={{ color: '#718096' }}>Flight Segments</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CleaningTasks;
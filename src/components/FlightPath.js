import React, { useState } from 'react';
import { useDrone } from '../context/DroneContext';
import { Route, Map, CheckCircle, AlertTriangle, MapPin } from 'lucide-react';

function FlightPath() {
  const { state, dispatch } = useDrone();
  const { selectedBuilding, flightPath } = state;
  const [pathGenerated, setPathGenerated] = useState(false);
  const [pathConfirmed, setPathConfirmed] = useState(false);
  const [pathSettings, setPathSettings] = useState({
    altitude: 30,
    speed: 10,
    pattern: 'zigzag',
    overlap: 20,
    safetyBuffer: 5
  });

  const generateFlightPath = () => {
    if (!selectedBuilding) {
      alert('Please select a building first');
      return;
    }

    const mockPath = {
      id: Date.now(),
      building: selectedBuilding.name,
      waypoints: generateWaypoints(),
      totalDistance: Math.round(selectedBuilding.height * 2.5),
      estimatedTime: Math.round(selectedBuilding.height / 8),
      altitudeProfile: pathSettings.altitude,
      safetyChecks: {
        noFlyZones: true,
        weatherClearance: true,
        airspaceAuthorization: true,
        emergencyLanding: true
      }
    };

    dispatch({ type: 'SET_FLIGHT_PATH', payload: mockPath });
    setPathGenerated(true);
  };

  const generateWaypoints = () => {
    const waypoints = [];
    const floors = selectedBuilding.floors;
    const floorHeight = selectedBuilding.height / floors;
    
    for (let i = 0; i < floors; i += 2) {
      waypoints.push({
        id: i + 1,
        altitude: pathSettings.altitude + (i * floorHeight),
        coordinates: { lat: 40.7128 + (i * 0.0001), lng: -74.0060 + (i * 0.0001) },
        action: 'clean',
        duration: 2
      });
    }
    return waypoints;
  };

  const confirmFlightPath = () => {
    setPathConfirmed(true);
    alert('Flight path confirmed and uploaded to drone systems');
  };

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#2d3748' }}>
        <Route className="inline" size={32} />
        Flight Path Planning
      </h1>

      {!selectedBuilding && (
        <div className="alert alert-warning">
          Please select a target building to generate flight path.
        </div>
      )}

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Path Generation Settings</h2>
          </div>
          
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
            <label className="form-label">Flight Altitude (meters)</label>
            <input
              type="number"
              className="form-input"
              value={pathSettings.altitude}
              onChange={(e) => setPathSettings({...pathSettings, altitude: parseInt(e.target.value)})}
              min="10"
              max="120"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Flight Speed (km/h)</label>
            <input
              type="number"
              className="form-input"
              value={pathSettings.speed}
              onChange={(e) => setPathSettings({...pathSettings, speed: parseInt(e.target.value)})}
              min="5"
              max="25"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Flight Pattern</label>
            <select
              className="form-select"
              value={pathSettings.pattern}
              onChange={(e) => setPathSettings({...pathSettings, pattern: e.target.value})}
            >
              <option value="zigzag">Zigzag Pattern</option>
              <option value="spiral">Spiral Pattern</option>
              <option value="grid">Grid Pattern</option>
              <option value="custom">Custom Path</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Coverage Overlap (%)</label>
            <input
              type="range"
              className="form-input"
              value={pathSettings.overlap}
              onChange={(e) => setPathSettings({...pathSettings, overlap: parseInt(e.target.value)})}
              min="0"
              max="50"
            />
            <span style={{ fontSize: '0.875rem', color: '#718096' }}>{pathSettings.overlap}%</span>
          </div>

          <div className="form-group">
            <label className="form-label">Safety Buffer (meters)</label>
            <input
              type="number"
              className="form-input"
              value={pathSettings.safetyBuffer}
              onChange={(e) => setPathSettings({...pathSettings, safetyBuffer: parseInt(e.target.value)})}
              min="2"
              max="10"
            />
          </div>

          <button 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            onClick={generateFlightPath}
            disabled={!selectedBuilding}
          >
            <Map size={16} />
            Generate Optimized Path
          </button>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Flight Path Visualization</h2>
          </div>
          
          <div style={{ 
            height: '400px', 
            background: pathGenerated ? 'linear-gradient(45deg, #e0f2fe, #f3e5f5)' : '#f7fafc',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            border: '2px dashed #cbd5e0'
          }}>
            {pathGenerated ? (
              <div style={{ textAlign: 'center', width: '100%', padding: '2rem' }}>
                <Map size={48} color="#667eea" />
                <div style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: 'bold', color: '#2d3748' }}>
                  Flight Path Generated
                </div>
                <div style={{ marginTop: '0.5rem', color: '#718096' }}>
                  {flightPath?.waypoints?.length} waypoints planned
                </div>
                
                {/* Simulated flight path visualization */}
                <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                  {flightPath?.waypoints?.slice(0, 8).map((waypoint, index) => (
                    <div key={waypoint.id} style={{ 
                      width: '40px', 
                      height: '40px', 
                      background: '#667eea', 
                      borderRadius: '50%', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Map size={48} color="#cbd5e0" />
                <div style={{ marginTop: '1rem', color: '#718096' }}>
                  Flight path visualization will appear here
                </div>
                <div style={{ fontSize: '0.875rem', color: '#a0aec0' }}>
                  Generate a path to view the route
                </div>
              </div>
            )}
          </div>
          
          {pathGenerated && (
            <div style={{ marginTop: '1rem' }}>
              <button 
                className={`btn ${pathConfirmed ? 'btn-success' : 'btn-primary'}`}
                style={{ width: '100%' }}
                onClick={confirmFlightPath}
                disabled={pathConfirmed}
              >
                {pathConfirmed ? (
                  <>
                    <CheckCircle size={16} />
                    Path Confirmed & Uploaded
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} />
                    Confirm Flight Path
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {flightPath && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <div className="card-header">
            <h2 className="card-title">Flight Path Details</h2>
          </div>
          
          <div className="grid grid-4">
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
                {flightPath.waypoints?.length}
              </div>
              <div style={{ color: '#718096' }}>Waypoints</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
                {flightPath.totalDistance}m
              </div>
              <div style={{ color: '#718096' }}>Total Distance</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
                {flightPath.estimatedTime}min
              </div>
              <div style={{ color: '#718096' }}>Est. Time</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748' }}>
                {pathSettings.altitude}m
              </div>
              <div style={{ color: '#718096' }}>Max Altitude</div>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>Safety Clearances</h3>
            <div className="grid grid-2">
              {Object.entries(flightPath.safetyChecks).map(([check, status]) => (
                <div key={check} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {status ? (
                    <CheckCircle size={16} color="#38a169" />
                  ) : (
                    <AlertTriangle size={16} color="#e53e3e" />
                  )}
                  <span style={{ textTransform: 'capitalize' }}>
                    {check.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>Waypoint List</h3>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Point</th>
                    <th>Altitude</th>
                    <th>Action</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {flightPath.waypoints?.map(waypoint => (
                    <tr key={waypoint.id}>
                      <td>#{waypoint.id}</td>
                      <td>{waypoint.altitude}m</td>
                      <td>{waypoint.action}</td>
                      <td>{waypoint.duration}min</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlightPath;
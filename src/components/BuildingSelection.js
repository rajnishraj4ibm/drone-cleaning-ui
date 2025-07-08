import React, { useState } from 'react';
import { useDrone } from '../context/DroneContext';
import { Building, MapPin, Layers, CheckCircle } from 'lucide-react';

function BuildingSelection() {
  const { state, dispatch } = useDrone();
  const { buildings, selectedBuilding } = state;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBuildings = buildings.filter(building =>
    building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    building.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectBuilding = (building) => {
    dispatch({ type: 'SELECT_BUILDING', payload: building });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2d3748' }}>
          <Building className="inline" size={32} />
          Select Target Building
        </h1>
        {selectedBuilding && (
          <div className="alert alert-success" style={{ margin: 0, padding: '0.5rem 1rem' }}>
            <CheckCircle size={16} className="inline" />
            {selectedBuilding.name} selected
          </div>
        )}
      </div>

      <div className="card">
        <div className="form-group">
          <label className="form-label">Search Buildings</label>
          <input
            type="text"
            className="form-input"
            placeholder="Search by name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-2">
        {filteredBuildings.map(building => (
          <div 
            key={building.id} 
            className={`card ${selectedBuilding?.id === building.id ? 'border-2 border-blue-500' : ''}`}
            style={{ 
              cursor: 'pointer',
              border: selectedBuilding?.id === building.id ? '2px solid #667eea' : '1px solid #e2e8f0',
              transition: 'all 0.3s'
            }}
            onClick={() => handleSelectBuilding(building)}
          >
            <div className="card-header">
              <h3 className="card-title">{building.name}</h3>
              {selectedBuilding?.id === building.id && (
                <CheckCircle size={20} color="#667eea" />
              )}
            </div>
            
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <MapPin size={16} color="#718096" />
                <span style={{ color: '#718096' }}>{building.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Layers size={16} color="#718096" />
                <span style={{ color: '#718096' }}>{building.floors} floors</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Building size={16} color="#718096" />
                <span style={{ color: '#718096' }}>{building.height}m height</span>
              </div>
            </div>
            
            <div className="grid grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '0.5rem', background: '#f7fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2d3748' }}>
                  {building.floors * 4}
                </div>
                <div style={{ fontSize: '0.875rem', color: '#718096' }}>Est. Windows</div>
              </div>
              <div style={{ textAlign: 'center', padding: '0.5rem', background: '#f7fafc', borderRadius: '8px' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#2d3748' }}>
                  {Math.round(building.height / 3)}h
                </div>
                <div style={{ fontSize: '0.875rem', color: '#718096' }}>Est. Time</div>
              </div>
            </div>
            
            <button 
              className={`btn ${selectedBuilding?.id === building.id ? 'btn-success' : 'btn-primary'}`}
              style={{ width: '100%' }}
              onClick={(e) => {
                e.stopPropagation();
                handleSelectBuilding(building);
              }}
            >
              {selectedBuilding?.id === building.id ? 'Selected' : 'Select Building'}
            </button>
          </div>
        ))}
      </div>

      {selectedBuilding && (
        <div className="card" style={{ marginTop: '2rem', background: 'linear-gradient(135deg, #e0f2fe 0%, #f3e5f5 100%)' }}>
          <div className="card-header">
            <h3 className="card-title">Building Information</h3>
          </div>
          <div className="grid grid-2">
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#2d3748' }}>Cleaning Zones</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '0.25rem 0' }}>✓ North Face - {Math.ceil(selectedBuilding.floors / 2)} floors</li>
                <li style={{ padding: '0.25rem 0' }}>✓ South Face - {Math.ceil(selectedBuilding.floors / 2)} floors</li>
                <li style={{ padding: '0.25rem 0' }}>✓ East Face - {selectedBuilding.floors} floors</li>
                <li style={{ padding: '0.25rem 0' }}>✓ West Face - {selectedBuilding.floors} floors</li>
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: '0.5rem', color: '#2d3748' }}>Safety Considerations</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '0.25rem 0' }}>⚠️ Wind patterns at height</li>
                <li style={{ padding: '0.25rem 0' }}>⚠️ No-fly zones near helipads</li>
                <li style={{ padding: '0.25rem 0' }}>⚠️ Glass reflection considerations</li>
                <li style={{ padding: '0.25rem 0' }}>⚠️ Building security protocols</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuildingSelection;
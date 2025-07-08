import React, { useState } from 'react';
import { useDrone } from '../context/DroneContext';
import { CheckSquare, AlertTriangle, CheckCircle } from 'lucide-react';

function SafetyChecklist() {
  const { state } = useDrone();
  const { selectedBuilding, drones } = state;
  const [checklist, setChecklist] = useState({
    battery: false,
    cleaningFluid: false,
    sensors: false,
    gps: false,
    communication: false,
    weatherCheck: false,
    noFlyZone: false,
    equipmentTest: false,
    emergencyProcedures: false,
    insuranceValid: false
  });

  const handleCheckChange = (item) => {
    setChecklist(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const allChecked = Object.values(checklist).every(Boolean);
  const completedCount = Object.values(checklist).filter(Boolean).length;

  const markFlightReady = () => {
    if (allChecked) {
      alert('✅ Pre-flight checklist completed! Drone marked as flight-ready.');
    } else {
      alert('⚠️ Please complete all checklist items before marking flight-ready.');
    }
  };

  const checklistItems = [
    { key: 'battery', label: 'Battery Level Check (>80%)', critical: true },
    { key: 'cleaningFluid', label: 'Cleaning Fluid Levels', critical: true },
    { key: 'sensors', label: 'Sensor Calibration', critical: true },
    { key: 'gps', label: 'GPS Signal Strong', critical: true },
    { key: 'communication', label: 'Communication Link Test', critical: true },
    { key: 'weatherCheck', label: 'Weather Conditions Acceptable', critical: true },
    { key: 'noFlyZone', label: 'No-Fly Zone Clearance', critical: true },
    { key: 'equipmentTest', label: 'Cleaning Equipment Test', critical: false },
    { key: 'emergencyProcedures', label: 'Emergency Procedures Reviewed', critical: false },
    { key: 'insuranceValid', label: 'Insurance & Permits Valid', critical: false }
  ];

  return (
    <div>
      <h1 style={{ marginBottom: '2rem', color: '#2d3748' }}>
        <CheckSquare className="inline" size={32} />
        Pre-Flight Safety Checklist
      </h1>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h2 className="card-title">Checklist Progress</h2>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span>Completed: {completedCount}/{checklistItems.length}</span>
            <span>{Math.round((completedCount / checklistItems.length) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(completedCount / checklistItems.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {selectedBuilding && (
          <div style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
            <strong>Target Building:</strong> {selectedBuilding.name}
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Safety Checklist Items</h2>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {checklistItems.map(item => (
            <div 
              key={item.key}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1rem',
                padding: '1rem',
                background: checklist[item.key] ? '#c6f6d5' : '#f7fafc',
                borderRadius: '8px',
                border: item.critical ? '2px solid #fed7d7' : '1px solid #e2e8f0'
              }}
            >
              <input
                type="checkbox"
                checked={checklist[item.key]}
                onChange={() => handleCheckChange(item.key)}
                style={{ transform: 'scale(1.2)' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '600', color: '#2d3748' }}>
                  {item.label}
                  {item.critical && <span style={{ color: '#e53e3e', marginLeft: '0.5rem' }}>*</span>}
                </div>
              </div>
              {checklist[item.key] ? (
                <CheckCircle size={20} color="#38a169" />
              ) : (
                item.critical && <AlertTriangle size={20} color="#e53e3e" />
              )}
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button 
            className={`btn ${allChecked ? 'btn-success' : 'btn-secondary'}`}
            onClick={markFlightReady}
            disabled={!allChecked}
            style={{ padding: '1rem 2rem' }}
          >
            {allChecked ? (
              <>
                <CheckCircle size={20} />
                Mark Flight Ready
              </>
            ) : (
              <>
                <AlertTriangle size={20} />
                Complete Checklist First
              </>
            )}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Safety Notes</h2>
        </div>
        <div style={{ fontSize: '0.875rem', color: '#718096' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            * Critical items must be completed before flight authorization
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            • Always maintain visual contact with drone during operation
          </p>
          <p style={{ marginBottom: '0.5rem' }}>
            • Weather conditions can change rapidly - monitor continuously
          </p>
          <p>
            • Emergency stop procedures should be reviewed before each flight
          </p>
        </div>
      </div>
    </div>
  );
}

export default SafetyChecklist;
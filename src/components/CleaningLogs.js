import React, { useState } from 'react';
import { useDrone } from '../context/DroneContext';
import { FileText, Download, Calendar, Filter } from 'lucide-react';

function CleaningLogs() {
  const { state } = useDrone();
  const { cleaningLogs } = state;
  const [filterDate, setFilterDate] = useState('');
  const [filterBuilding, setFilterBuilding] = useState('');

  // Mock data for demonstration
  const mockLogs = [
    {
      id: 1,
      building: 'Corporate Plaza A',
      drone: 'Drone Alpha',
      date: '2024-01-15',
      duration: 45,
      status: 'completed',
      area: 'full-building',
      efficiency: 92
    },
    {
      id: 2,
      building: 'Tech Tower',
      drone: 'Drone Beta',
      date: '2024-01-14',
      duration: 38,
      status: 'completed',
      area: 'north-face',
      efficiency: 88
    },
    {
      id: 3,
      building: 'Glass Pavilion',
      drone: 'Drone Gamma',
      date: '2024-01-13',
      duration: 52,
      status: 'partial',
      area: 'east-face',
      efficiency: 76
    }
  ];

  const allLogs = [...cleaningLogs, ...mockLogs];

  const filteredLogs = allLogs.filter(log => {
    const matchesDate = !filterDate || log.date.includes(filterDate);
    const matchesBuilding = !filterBuilding || log.building.toLowerCase().includes(filterBuilding.toLowerCase());
    return matchesDate && matchesBuilding;
  });

  const exportData = () => {
    alert('Exporting cleaning logs as CSV...');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2d3748' }}>
          <FileText className="inline" size={32} />
          Cleaning Logs & Reports
        </h1>
        <button className="btn btn-primary" onClick={exportData}>
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="card-header">
          <h2 className="card-title">Filter Logs</h2>
          <Filter size={20} color="#718096" />
        </div>
        <div className="grid grid-2">
          <div className="form-group">
            <label className="form-label">Filter by Date</label>
            <input
              type="date"
              className="form-input"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Filter by Building</label>
            <input
              type="text"
              className="form-input"
              placeholder="Search building name..."
              value={filterBuilding}
              onChange={(e) => setFilterBuilding(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Cleaning History</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Building</th>
                <th>Drone</th>
                <th>Area</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(log => (
                <tr key={log.id}>
                  <td>{log.date}</td>
                  <td>{log.building}</td>
                  <td>{log.drone}</td>
                  <td>{log.area}</td>
                  <td>{log.duration}min</td>
                  <td>
                    <span className={`status status-${log.status === 'completed' ? 'active' : 'maintenance'}`}>
                      {log.status}
                    </span>
                  </td>
                  <td>{log.efficiency}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-3">
        <div className="stat-card">
          <div className="stat-value">{allLogs.length}</div>
          <div className="stat-label">Total Operations</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {Math.round(allLogs.reduce((sum, log) => sum + log.efficiency, 0) / allLogs.length)}%
          </div>
          <div className="stat-label">Avg Efficiency</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">
            {Math.round(allLogs.reduce((sum, log) => sum + log.duration, 0) / 60)}h
          </div>
          <div className="stat-label">Total Hours</div>
        </div>
      </div>
    </div>
  );
}

export default CleaningLogs;
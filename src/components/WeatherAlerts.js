import React, { useState, useEffect } from 'react';
import { useDrone } from '../context/DroneContext';
import { Cloud, Wind, Eye, Droplets, Sun, AlertTriangle } from 'lucide-react';

function WeatherAlerts() {
  const { state, dispatch } = useDrone();
  const { weatherData } = state;
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulate weather alerts based on conditions
    const newAlerts = [];
    
    if (weatherData.windSpeed > 15) {
      newAlerts.push({
        type: 'warning',
        message: 'High wind speeds detected. Consider postponing operations.',
        icon: Wind
      });
    }
    
    if (weatherData.visibility < 5) {
      newAlerts.push({
        type: 'danger',
        message: 'Low visibility conditions. Flight operations should be suspended.',
        icon: Eye
      });
    }
    
    if (weatherData.humidity > 80) {
      newAlerts.push({
        type: 'info',
        message: 'High humidity may affect cleaning solution performance.',
        icon: Droplets
      });
    }
    
    setAlerts(newAlerts);
  }, [weatherData]);

  const updateWeather = () => {
    // Simulate weather update
    const newWeather = {
      condition: ['Clear', 'Partly Cloudy', 'Overcast', 'Light Rain'][Math.floor(Math.random() * 4)],
      windSpeed: Math.round(5 + Math.random() * 20),
      visibility: Math.round(5 + Math.random() * 15),
      temperature: Math.round(15 + Math.random() * 15),
      humidity: Math.round(30 + Math.random() * 50)
    };
    
    dispatch({ type: 'UPDATE_WEATHER', payload: newWeather });
  };

  const getWeatherIcon = () => {
    switch (weatherData.condition) {
      case 'Clear': return <Sun size={48} color="#f6ad55" />;
      case 'Light Rain': return <Droplets size={48} color="#4299e1" />;
      default: return <Cloud size={48} color="#718096" />;
    }
  };

  const isFlightSafe = weatherData.windSpeed <= 15 && weatherData.visibility >= 5;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#2d3748' }}>
          <Cloud className="inline" size={32} />
          Weather Monitoring
        </h1>
        <button className="btn btn-primary" onClick={updateWeather}>
          🔄 Update Weather
        </button>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Current Conditions</h2>
          </div>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            {getWeatherIcon()}
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2d3748', marginTop: '1rem' }}>
              {weatherData.condition}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d3748' }}>
              {weatherData.temperature}°C
            </div>
          </div>
          
          <div className="grid grid-2" style={{ gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <Wind size={24} color="#4299e1" />
              <div style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{weatherData.windSpeed} km/h</div>
              <div style={{ fontSize: '0.875rem', color: '#718096' }}>Wind Speed</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <Eye size={24} color="#38a169" />
              <div style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{weatherData.visibility} km</div>
              <div style={{ fontSize: '0.875rem', color: '#718096' }}>Visibility</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
              <Droplets size={24} color="#4299e1" />
              <div style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>{weatherData.humidity}%</div>
              <div style={{ fontSize: '0.875rem', color: '#718096' }}>Humidity</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: isFlightSafe ? '#c6f6d5' : '#fed7d7', borderRadius: '8px' }}>
              {isFlightSafe ? '✅' : '❌'}
              <div style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>
                {isFlightSafe ? 'Safe' : 'Unsafe'}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#718096' }}>Flight Status</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Weather Alerts</h2>
            <AlertTriangle size={20} color="#ed8936" />
          </div>
          
          {alerts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#718096' }}>
              <Sun size={48} color="#38a169" />
              <div style={{ marginTop: '1rem' }}>No weather alerts</div>
              <div style={{ fontSize: '0.875rem' }}>Conditions are favorable for drone operations</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {alerts.map((alert, index) => (
                <div key={index} className={`alert alert-${alert.type}`}>
                  <alert.icon size={16} className="inline" />
                  {alert.message}
                </div>
              ))}
            </div>
          )}
          
          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ color: '#2d3748', marginBottom: '0.5rem' }}>Flight Limits</h4>
            <div style={{ fontSize: '0.875rem', color: '#718096' }}>
              <div>Max Wind Speed: 15 km/h</div>
              <div>Min Visibility: 5 km</div>
              <div>Operating Temp: 0°C to 40°C</div>
              <div>No precipitation during flight</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Weather History (Last 24h)</h2>
        </div>
        
        <div style={{ height: '200px', background: '#f7fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: '#718096' }}>
            <Cloud size={48} />
            <div style={{ marginTop: '1rem' }}>Weather Chart Placeholder</div>
            <div style={{ fontSize: '0.875rem' }}>Historical weather data visualization would appear here</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherAlerts;
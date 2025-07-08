import React, { createContext, useContext, useReducer } from 'react';

const DroneContext = createContext();

const initialState = {
  selectedBuilding: null,
  activeTasks: [],
  drones: [
    { id: 1, name: 'Drone Alpha', status: 'available', battery: 95, location: 'Base Station' },
    { id: 2, name: 'Drone Beta', status: 'active', battery: 78, location: 'Building A' },
    { id: 3, name: 'Drone Gamma', status: 'maintenance', battery: 12, location: 'Maintenance Bay' }
  ],
  buildings: [
    { id: 1, name: 'Corporate Plaza A', address: '123 Business Ave', floors: 25, height: 100 },
    { id: 2, name: 'Tech Tower', address: '456 Innovation Blvd', floors: 40, height: 150 },
    { id: 3, name: 'Glass Pavilion', address: '789 Modern St', floors: 18, height: 75 }
  ],
  currentTask: null,
  flightPath: null,
  telemetry: {
    altitude: 0,
    speed: 0,
    heading: 0,
    pressure: 0,
    temperature: 22
  },
  emergencyStatus: false,
  weatherData: {
    condition: 'Clear',
    windSpeed: 5,
    visibility: 10,
    temperature: 22,
    humidity: 45
  },
  cleaningLogs: []
};

function droneReducer(state, action) {
  switch (action.type) {
    case 'SELECT_BUILDING':
      return { ...state, selectedBuilding: action.payload };
    case 'START_TASK':
      return { 
        ...state, 
        currentTask: action.payload,
        activeTasks: [...state.activeTasks, action.payload]
      };
    case 'UPDATE_TELEMETRY':
      return { ...state, telemetry: { ...state.telemetry, ...action.payload } };
    case 'SET_FLIGHT_PATH':
      return { ...state, flightPath: action.payload };
    case 'UPDATE_DRONE_STATUS':
      return {
        ...state,
        drones: state.drones.map(drone =>
          drone.id === action.payload.id ? { ...drone, ...action.payload.updates } : drone
        )
      };
    case 'TRIGGER_EMERGENCY':
      return { ...state, emergencyStatus: action.payload };
    case 'UPDATE_WEATHER':
      return { ...state, weatherData: { ...state.weatherData, ...action.payload } };
    case 'ADD_CLEANING_LOG':
      return { 
        ...state, 
        cleaningLogs: [...state.cleaningLogs, action.payload]
      };
    case 'COMPLETE_TASK':
      return {
        ...state,
        currentTask: null,
        activeTasks: state.activeTasks.filter(task => task.id !== action.payload.id),
        cleaningLogs: [...state.cleaningLogs, action.payload]
      };
    default:
      return state;
  }
}

export function DroneProvider({ children }) {
  const [state, dispatch] = useReducer(droneReducer, initialState);

  return (
    <DroneContext.Provider value={{ state, dispatch }}>
      {children}
    </DroneContext.Provider>
  );
}

export function useDrone() {
  const context = useContext(DroneContext);
  if (!context) {
    throw new Error('useDrone must be used within a DroneProvider');
  }
  return context;
}
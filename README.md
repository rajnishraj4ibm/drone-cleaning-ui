# DroneClean Pro - High-Rise Glass Cleaning Drone Management System

A comprehensive React application for managing high-rise building glass cleaning operations using autonomous drones.

## 🚁 Features

This application implements all the basic use cases for a high-rise glass cleaning drone system:

### 1. 🏢 Building Management
- **Select Target Building**: Choose from registered buildings for cleaning operations
- **Building Information**: View building details, floors, height, and safety considerations
- **Search and Filter**: Find buildings by name or address

### 2. 🧼 Task Management
- **Create Cleaning Tasks**: Configure cleaning area, intensity, mode, and drone assignment
- **Active Task Monitoring**: Real-time tracking of ongoing cleaning operations
- **Task Estimation**: Automatic calculation of duration, solution needed, and flight segments

### 3. ✈️ Flight Path Planning
- **Automated Path Generation**: AI-optimized flight paths based on building geometry
- **Path Customization**: Adjust altitude, speed, pattern, and safety buffers
- **Safety Clearances**: Automated checks for no-fly zones, weather, and airspace
- **Path Confirmation**: Review and approve flight paths before execution

### 4. 🔍 Live Monitoring
- **Real-time Telemetry**: Monitor altitude, speed, heading, temperature, and pressure
- **Live Video Feed**: Simulated camera feed from active drones
- **System Alerts**: Real-time notifications for operational status
- **Quick Controls**: Emergency actions and task management

### 5. 🕹️ Manual Control
- **Manual Override**: Take direct control during operations
- **Virtual Joystick**: Intuitive flight controls with safety limits
- **Advanced Controls**: Fine-tune yaw, pitch, and roll
- **Emergency Actions**: Immediate landing and return-to-home functions

### 6. 🧽 Equipment Control
- **Spray System**: Adjust spray rate, water pressure, and solution mix
- **Brush System**: Control rotation speed, pattern, and RPM
- **Squeegee System**: Manage pressure and angle settings
- **Tank Monitoring**: Real-time fluid level tracking

### 7. 🧾 Logs & Reports
- **Historical Data**: View completed cleaning operations
- **Performance Metrics**: Efficiency ratings and duration tracking
- **Export Functionality**: Download logs as CSV files
- **Filtering**: Search by date, building, or drone

### 8. ⚙️ Fleet Management
- **Drone Status**: Monitor battery levels, location, and operational status
- **Maintenance Scheduling**: Track service history and schedule maintenance
- **Fleet Overview**: Comprehensive dashboard of all drones
- **Status Updates**: Real-time fleet health monitoring

### 9. 🚨 Emergency Controls
- **Emergency Stop**: Immediate halt of all operations
- **Return to Home**: Command all drones to return to base
- **Emergency Landing**: Initiate safe landing protocols
- **Emergency Procedures**: Step-by-step emergency response guides

### 10. 🛡️ Pre-Flight Safety
- **Safety Checklist**: Comprehensive pre-flight inspection items
- **Progress Tracking**: Visual completion status
- **Critical Items**: Mandatory safety checks before flight authorization
- **Flight Readiness**: Final approval for operations

### 11. 👥 Role-Based Access
- **User Authentication**: Role-based login system
- **Access Control**: Different permissions for operators, supervisors, and administrators
- **Operator**: Access to buildings, tasks, monitoring, and safety
- **Supervisor**: Additional access to logs and weather
- **Administrator**: Full access including fleet and emergency controls

### 12. ☁️ Weather Monitoring
- **Real-time Conditions**: Current weather data and flight safety status
- **Weather Alerts**: Automatic warnings for unsafe conditions
- **Flight Limits**: Configurable safety thresholds
- **Historical Data**: Weather tracking and trends

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the application files**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Login Credentials
The application uses a demo authentication system. You can log in with:
- **Username**: any value
- **Password**: any value
- **Role**: Choose from Operator, Supervisor, or Administrator

Different roles provide access to different features:
- **Operator**: Core operational features
- **Supervisor**: Operational features + logs and weather
- **Administrator**: All features including fleet management and emergency controls

## 🎯 Usage Guide

### 1. Getting Started
1. Log in with your preferred role
2. Start by selecting a target building from the Buildings page
3. Create a new cleaning task from the Tasks page
4. Generate and confirm a flight path
5. Monitor the operation in real-time

### 2. Creating a Cleaning Task
1. Navigate to "Tasks" in the navigation menu
2. Ensure a building is selected
3. Configure the cleaning parameters:
   - Select cleaning area (full building or specific face)
   - Choose cleaning intensity (light, medium, heavy)
   - Select operating mode (automatic, semi-automatic, manual)
   - Assign an available drone
   - Choose cleaning solution type
4. Click "Start Cleaning Task"

### 3. Monitoring Operations
1. Go to "Monitor" to view live drone data
2. Enable "Live Telemetry" for real-time updates
3. Monitor video feed, telemetry data, and task progress
4. Use quick controls for emergency actions if needed

### 4. Emergency Procedures
1. Access the Emergency page (Administrator only)
2. Use "Emergency Stop" to halt all operations
3. Use "Return to Home" for controlled drone recall
4. Follow emergency procedures outlined in the interface

## 🛠️ Technology Stack

- **Frontend**: React 18
- **Routing**: React Router v6
- **State Management**: React Context API + useReducer
- **Icons**: Lucide React
- **Styling**: Custom CSS with modern design
- **Build Tool**: Create React App

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Navbar.js       # Navigation component
│   ├── Login.js        # Authentication
│   ├── Dashboard.js    # Main dashboard
│   ├── BuildingSelection.js
│   ├── CleaningTasks.js
│   ├── FlightPath.js
│   ├── DroneMonitor.js
│   ├── ManualControl.js
│   ├── CleaningEquipment.js
│   ├── CleaningLogs.js
│   ├── FleetManagement.js
│   ├── Emergency.js
│   ├── SafetyChecklist.js
│   └── WeatherAlerts.js
├── context/
│   └── DroneContext.js  # Global state management
├── App.js              # Main application component
├── App.css             # Application styles
└── index.js            # Application entry point
```

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with gradient backgrounds
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Intuitive Navigation**: Role-based menu system
- **Visual Feedback**: Progress bars, status indicators, and real-time updates
- **Interactive Controls**: Virtual joystick, sliders, and form controls
- **Professional Color Scheme**: Blue/purple gradients with semantic colors

## 🔧 Customization

The application is built with modularity in mind:

- **Mock Data**: Easy to replace with real API calls
- **Styling**: Customizable CSS variables and themes
- **Components**: Reusable and extensible React components
- **State Management**: Centralized state with easy extensions
- **Role System**: Expandable permission system

## 📊 Demo Data

The application includes realistic mock data for demonstration:
- 3 sample buildings with different characteristics
- 3 drones with varying status and battery levels
- Sample cleaning logs and task history
- Simulated weather data and telemetry
- Interactive controls with visual feedback

## 🛡️ Safety Features

The application emphasizes safety with:
- Pre-flight safety checklists
- Weather monitoring and alerts
- Emergency stop procedures
- Safety limit enforcement
- Real-time status monitoring
- Role-based access controls

## 🚀 Future Enhancements

Potential future features could include:
- Real drone API integration
- Advanced weather service integration
- Machine learning for path optimization
- IoT sensor integration
- Advanced reporting and analytics
- Multi-language support
- Mobile application version

## 📝 License

This is a demonstration application created for showcasing React development capabilities in the drone operations domain.

## 🤝 Support

This application demonstrates a comprehensive drone management system with modern web development practices and intuitive user experience design.

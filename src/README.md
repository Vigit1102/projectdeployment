# React User Management Application

This is a React-based user management application with features including user authentication, user creation, listing, and updates.

## Features

- User Authentication
- User Management (Create, Read, Update)
- Protected Routes
- Responsive Navigation
- User Checklist

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will start running at [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from create-react-app

## Project Structure

```
src/
  ├── Components/
  │   ├── Auth/       # Authentication components
  │   ├── Header/     # Navigation components
  │   ├── Login/      # Login related components
  │   └── User/       # User management components
  ├── Models/         # Data models
  ├── Redux/          # State management
  ├── App.tsx         # Main application component
  └── index.tsx       # Application entry point
``` 
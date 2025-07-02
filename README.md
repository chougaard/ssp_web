# SmartService React App

A modern React application for managing service assets with an interactive map view.

## Features

- **React 18** with hooks and functional components
- **Interactive Map** using Leaflet for asset location visualization
- **Component-based Architecture** for scalability
- **State Management** with React hooks
- **Responsive Design** with CSS Grid/Flexbox
- **Dark Theme** professional UI

## Components Structure

```
src/
├── components/
│   ├── Sidebar.js              # Navigation sidebar
│   ├── AssetsSection.js        # Main assets container
│   ├── AssetsTable.js          # Assets data table
│   ├── ServiceTabs.js          # Filter tabs
│   └── MapSection.js           # Interactive map
├── data/
│   └── assetsData.js           # Sample asset data
├── App.js                      # Main app component
├── App.css                     # App styles
├── index.js                    # App entry point
└── index.css                   # Global styles
```

## Installation & Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - One-way operation to eject from Create React App

## Key Dependencies

- **React & React-DOM** - Core React libraries
- **Leaflet** - Interactive mapping library
- **React Scripts** - Build tools and configuration

## Future Enhancements

- Add routing with React Router
- Implement Redux for state management
- Add API integration
- Create asset creation/editing forms
- Add authentication
- Implement search functionality
- Add testing with Jest/React Testing Library

## Development Notes

The app is ready for backend integration with RESTful APIs or GraphQL. State management can be easily extended with Redux or Context API for larger applications. 
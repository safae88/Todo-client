import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Importing the CSS file for styling
import App from './App'; // Importing the main App component
import reportWebVitals from './reportWebVitals'; //for measuring performance in the app, optional

const root = ReactDOM.createRoot(document.getElementById('root')); // Creating a root element for rendering the React application
root.render(
  <React.StrictMode>
    {/* Like a police officer for your React app,
     it helps you find potential problems in your 
     code and gives you warnings about things that 
     might cause issues in the future. */}
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


reportWebVitals(); // Calling the reportWebVitals 
// function to start measuring performance 
// in the app. OPTIONAL

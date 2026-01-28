/* ============================================================
   🌉 UNIBRIDGE - MAIN ENTRY POINT
   ============================================================ */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/globals.css';

// Initialize dark mode from localStorage before render
const initializeDarkMode = () => {
  try {
    const settings = JSON.parse(localStorage.getItem('unibridge-settings') || '{}');
    if (settings.state?.darkMode) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {
    console.warn('Failed to initialize dark mode:', e);
  }
};

initializeDarkMode();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
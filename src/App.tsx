import React from 'react';
import { WikiList } from './components/WikiList';

export const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Wikipedia Article Search</h1>
      </header>
      <main>
        <WikiList />
      </main>
    </div>
  );
};

// Add styles for the App component
const styles = `
.app {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.app-header {
  background-color: #007bff;
  color: white;
  padding: 1rem;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.app-header h1 {
  margin: 0;
  font-size: 2rem;
}
`;

// Insert styles into the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

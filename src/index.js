import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // Importamos Provider
import { store } from './store/store'; // Importamos nuestro store
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}> {/* Envuelve App con Provider */}
      <App />
    </Provider>
  </React.StrictMode>
);


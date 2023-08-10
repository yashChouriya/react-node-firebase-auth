import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap/dist/js/bootstrap.js';
import App from './App';
import { ChatContextProvider } from './frontend/utils/chatContext';
// import { ContextProvider } from './frontend/utils/socketProvider';
import { SocketProvider } from './frontend/utils/newSocketProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SocketProvider>
    <ChatContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  </SocketProvider>

);

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';

async function enableMocking() {
  if (
    import.meta.env.DEV === false ||
    import.meta.env.VITE_ENABLE_MSW === 'false'
  ) {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );;
});

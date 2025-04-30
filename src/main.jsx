import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ChatProvider } from './contexts/ChatContext.jsx';

async function enableMocking() {
  if (import.meta.env.MODE !== 'development') return;

  const { worker } = await import('../mocks/browser');
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ChatProvider>
        <App />
      </ChatProvider>
    </BrowserRouter>
  );
});

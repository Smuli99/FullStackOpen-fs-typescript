import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { DiagnosisProvider } from './contexts.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <DiagnosisProvider>
      <App />
    </DiagnosisProvider>
  </BrowserRouter>
);

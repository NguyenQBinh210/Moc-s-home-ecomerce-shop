import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './context/AuthContext.jsx';
import { AdminAuthProvider } from './context/AdminAuthContext.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AdminAuthProvider>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
          />
        </AdminAuthProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

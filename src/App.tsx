import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { SOSProvider } from '@/context/SOSContext';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { router } from '@/routes/router';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <NotificationProvider>
          <SOSProvider>
            <RouterProvider router={router} />
            <ToastContainer />
          </SOSProvider>
        </NotificationProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

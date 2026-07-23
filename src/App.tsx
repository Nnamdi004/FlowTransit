import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ToastProvider } from '@/context/ToastContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { router } from '@/routes/router';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <NotificationProvider>
          <RouterProvider router={router} />
          <ToastContainer />
        </NotificationProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;

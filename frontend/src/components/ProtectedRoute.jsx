import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthService } from '../services/authService';

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsAuth(false);
        return;
      }

      const response = await AuthService.status({ token });

      setIsAuth(!!response.id);
    };

    verify();
  }, []);

  if (isAuth === null) return <div>Loading...</div>;

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;

import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  
  // Verificar si el usuario está autenticado
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
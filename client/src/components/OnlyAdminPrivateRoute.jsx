import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  
  // Verificar si el usuario es administrador
  return currentUser?.isAdmin ? <Outlet /> : <Navigate to="/dashboard" />;
}
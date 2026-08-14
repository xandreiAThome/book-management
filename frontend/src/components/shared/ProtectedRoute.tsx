import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import type { UserRole } from '../../models/types';

export function ProtectedRoute({ allowedRole }: { allowedRole: UserRole }) {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div>Loading session...</div>;
  }
  
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== allowedRole) {
    return <Navigate to={user.role === 'TEACHER' ? '/teacher' : '/student'} replace />;
  }
  return <Outlet />;
}

import { useAuth } from '../../lib/auth-context';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex justify-between items-center p-4 border-b mb-6">
      <h1 className="text-xl font-bold">Simple Books Management</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span>Hello, {user.username} ({user.role})</span>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </nav>
  );
}

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { ProtectedRoute } from './components/shared/ProtectedRoute';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  {
    element: <ProtectedRoute allowedRole="TEACHER" />,
    children: [{ path: '/teacher', element: <TeacherDashboard /> }],
  },
  {
    element: <ProtectedRoute allowedRole="STUDENT" />,
    children: [{ path: '/student', element: <StudentDashboard /> }],
  },
]);

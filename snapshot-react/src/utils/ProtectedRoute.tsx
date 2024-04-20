import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute(token: string): JSX.Element {
  if (!token) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

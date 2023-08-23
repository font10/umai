import { Navigate, Outlet } from 'react-router-dom'
import { useCookies } from 'react-cookie';

export const ProtectedRoute = ({ redirectTo="/login" }) => {
  const [cookies, _] = useCookies(["access_token"])
  
  if(cookies.access_token === undefined) {
    return <Navigate to={redirectTo} />
  }

  return <Outlet />
}

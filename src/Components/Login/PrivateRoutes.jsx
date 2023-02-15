
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = ({isAuthenticated}) => {
    let auth = isAuthenticated;
    
    console.log('asdfasdfs');
    return (
        auth ? <Outlet to="/dashboard"/> : <Navigate to="/dashboard" />
    )
}

export default PrivateRoutes
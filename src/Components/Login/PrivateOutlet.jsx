import { Navigate, Outlet } from "react-router";


export default function PrivateOutlet({ isAuthenticated }) {
    console.log(isAuthenticated);
    return isAuthenticated ? < Outlet /> : <Navigate to="/login"></Navigate>
}
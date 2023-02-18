import { Navigate, Outlet } from "react-router";


export default function PrivateOutlet({ isAuthenticated }) {
    console.log(isAuthenticated);
    console.log(sessionStorage.getItem("previouslyLogin"));
    let sessionCheck = sessionStorage.getItem("previouslyLogin") || isAuthenticated;
    return sessionCheck ? < Outlet /> : <Navigate to="/login"></Navigate>
}
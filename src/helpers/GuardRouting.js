import { Navigate } from "react-router-dom";

export default function GuardRouting({ children }) {
    
    
    if (!localStorage.getItem("userToken")) {
        return <Navigate to="/" />;
    }

    return children
}
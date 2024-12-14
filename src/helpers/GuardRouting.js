import { Navigate } from "react-router-dom";

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { saveLastRoute } from "../services/routePersistence";

const GuardRouting = ({ children, requireAuth = true }) => {
    const { isAuthenticated } = useSelector((state) => state.user);
    const location = useLocation();

    if (requireAuth && !isAuthenticated) {
      saveLastRoute(location.pathname);
      return null;
    }

    return children;
};

export default GuardRouting;
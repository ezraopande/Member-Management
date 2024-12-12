import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MenuLink = ({ to, isMinimized, icon, label, closeSidebar, userRole, requiredRole }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    if (requiredRole && userRole !== requiredRole) {
        return null;
    }

    return (
        <li>
            <Link
                to={to}
                onClick={closeSidebar}
                className={`flex items-center py-2 px-4 rounded transition-all ${
                    isMinimized ? 'justify-center' : 'space-x-2'
                } ${
                    isActive
                        ? 'bg-[#283643] text-white'
                        : 'hover:bg-[#283643] hover:text-white'
                } text-sm font-bold`}
            >
                <i className={`${icon} ${isMinimized ? 'mr-0' : 'mr-2'}`}></i>
                {!isMinimized && <span className="text-sm font-bold">{label}</span>}
            </Link>
        </li>
    );
};

export default MenuLink;

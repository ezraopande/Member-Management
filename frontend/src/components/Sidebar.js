import React from 'react';
import { useSelector } from 'react-redux';
import MenuLink from '../components/ui/MenuLink';

const Sidebar = ({ isMinimized, isMobileOpen, closeSidebar }) => {
    const user = useSelector((state) => state.user.user) || { name: 'Guest', photo: '', role: 2 };
    const userRole = user?.role;
    const settings = useSelector((state) => state.settings.data);

    return (
        <>
            {isMobileOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                ></div>
            )}

            <div
                className={`bg-[#2D3D4D] text-[#afb9cf] ${
                    isMobileOpen ? 'block fixed z-50' : 'hidden'
                } md:block ${isMinimized ? 'w-18' : 'w-60'} h-screen md:relative md:h-auto transition-all`}
            >
                <div className="flex items-center justify-center p-4">
                    <img
                        src={isMinimized ? settings.favicon : settings.logo}
                        alt="Logo"
                        className={`${isMinimized ? 'w-8' : 'w-32'} h-auto`}
                    />
                </div>
                <ul className="space-y-2 mt-6">
                    <MenuLink
                        to="/dashboard"
                        isMinimized={isMinimized}
                        icon="fas fa-home"
                        label="Dashboard"
                        closeSidebar={closeSidebar}
                    />
                    <MenuLink
                        to="/members"
                        isMinimized={isMinimized}
                        icon="fas fa-users"
                        label="Members"
                        closeSidebar={closeSidebar}
                        userRole={userRole}
                        requiredRole={1}
                    />
                    <MenuLink
                        to="/roles"
                        isMinimized={isMinimized}
                        icon="fas fa-user-tag"
                        label="User Roles"
                        closeSidebar={closeSidebar}
                        userRole={userRole}
                        requiredRole={1}
                    />
                    <MenuLink
                        to="/activity-logs"
                        isMinimized={isMinimized}
                        icon="fas fa-list-alt"
                        label="Activity Logs"
                        closeSidebar={closeSidebar}
                    />
                    <MenuLink
                        to="/control-panel"
                        isMinimized={isMinimized}
                        icon="fas fa-cog"
                        label="Control Panel"
                        closeSidebar={closeSidebar}
                        userRole={userRole}
                        requiredRole={1}
                    />
                    <MenuLink
                        to="/api-docs"
                        isMinimized={isMinimized}
                        icon="fas fa-code"
                        label="API Documentation"
                        closeSidebar={closeSidebar}
                        userRole={userRole}
                        requiredRole={1}
                    />
                </ul>
            </div>
        </>
    );
};

export default Sidebar;

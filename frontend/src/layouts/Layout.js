import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        if (window.innerWidth >= 768) {
            setIsSidebarMinimized(!isSidebarMinimized);
        } else {
            setIsMobileSidebarOpen(!isMobileSidebarOpen);
        }
    };

    const closeSidebar = () => {
        setIsMobileSidebarOpen(false);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Sidebar
                isMinimized={isSidebarMinimized}
                isMobileOpen={isMobileSidebarOpen}
                closeSidebar={closeSidebar}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar toggleSidebar={toggleSidebar} />
                <div className="flex-1 overflow-auto p-6 bg-gray-100">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;

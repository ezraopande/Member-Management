import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../components/ui/ProfileDropdown';

const Topbar = ({ toggleSidebar }) => {
    return (
        <div className="bg-white shadow-md p-3 flex justify-between items-center border-b max-w-full">
            <div className="flex items-center space-x-4">
                <button onClick={toggleSidebar} className="text-xl">
                    <i className="fas fa-bars"></i>
                </button>
                <h1 className="text-xl">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
                <ProfileDropdown />
            </div>
        </div>
    );
};

export default Topbar;

import React from 'react';

const DashboardCard = ({ icon, title, value, iconBgColor = 'bg-gray-100' }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between transition-transform transform hover:scale-105 hover:shadow-lg">
            <div className={`p-4 rounded-lg flex items-center justify-center text-white ${iconBgColor}`}>
                {icon}
            </div>
            <div className="text-right">
                <h2 className="text-sm font-medium text-gray-500">{title}</h2>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
};

export default DashboardCard;


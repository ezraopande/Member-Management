import React, { useEffect, useState } from 'react';
import activityLogService from '../services/activityLogService';
import Table from '../components/ui/Table';

const ActivityLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await activityLogService.getActivityLogs();
                setLogs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    const columns = [
        {
            name: 'Username',
            selector: (row) => row.username || 'System',
            sortable: true,
        },
        {
            name: 'User ID',
            selector: (row) => row.user_id || 'System',
            sortable: true,
        },
        {
            name: 'Action',
            selector: (row) => row.action,
            sortable: true,
        },
        {
            name: 'Details',
            selector: (row) => row.details,
            sortable: true,
        },
        {
            name: 'IP Address',
            selector: (row) => row.ip_address,
            sortable: true,
        },
        {
            name: 'Timestamp',
            selector: (row) => new Date(row.createdAt).toLocaleString(),
            sortable: true,
        },
    ];

    return (
            
        <div className="bg-gray-100">
            {!loading && (
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Activity Logs</h1>
                </div>
            )}            
            <Table columns={columns} data={logs} loading={loading} error={error} />
        </div>
    );
};

export default ActivityLogs;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardService from '../services/dashboardService';
import memberService from '../services/memberService';
import DashboardCard from '../components/DashboardCard';
import Spinner from '../components/ui/Spinner';
import Table from '../components/ui/Table';
import Avatar from '../components/ui/Avatar';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStatsAndMembers = async () => {
            try {
                const statsData = await dashboardService.getDashboardStats();
                const membersData = await memberService.getMembers();
                setStats(statsData);
                setMembers(membersData);
                setFilteredMembers(membersData);
                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchStatsAndMembers();
    }, []);

    const filterMembers = (search, role) => {
        let filtered = members;

        if (search) {
            filtered = filtered.filter((member) =>
                member.name.toLowerCase().includes(search) ||
                member.user.username.toLowerCase().includes(search) ||
                member.email.toLowerCase().includes(search) ||
                member.role.role_name.toLowerCase().includes(search)
            );
        }

        if (role) {
            filtered = filtered.filter((member) => member.role.role_name.toLowerCase() === role);
        }

        setFilteredMembers(filtered);
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        filterMembers(term, roleFilter);
    };

    const handleRoleChange = (e) => {
        const role = e.target.value.toLowerCase();
        setRoleFilter(role);
        filterMembers(searchTerm, role);
    };

    if (loading) return <Spinner />;

    if (error) return <div>{error}</div>;

    const memberColumns = [
        {
            name: <span style={{ textTransform: 'uppercase' }}>Photo</span>,
            selector: (row) => <Avatar photo={row.photo} name={row.name} />,
            sortable: false,
        },
        {
            name: <span style={{ textTransform: 'uppercase' }}>Name</span>,
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: <span style={{ textTransform: 'uppercase' }}>Username</span>,
            selector: (row) => row.user.username,
            sortable: true,
        },
        {
            name: <span style={{ textTransform: 'uppercase' }}>Email</span>,
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: <span style={{ textTransform: 'uppercase' }}>Role</span>,
            selector: (row) => row.role.role_name,
            sortable: true,
        },
    ];

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <DashboardCard 
                    icon={<i className="fas fa-user"></i>} 
                    title="Total Admins" 
                    value={stats?.adminCount || '0'} 
                    iconBgColor="bg-purple-500"
                />
                <DashboardCard 
                    icon={<i className="fas fa-users"></i>} 
                    title="Total Members" 
                    value={stats?.memberCount || '0'} 
                    iconBgColor="bg-blue-500"
                />
                <DashboardCard 
                    icon={<i className="fas fa-shield-alt"></i>} 
                    title="Total Roles" 
                    value={stats?.roleCount || '0'} 
                    iconBgColor="bg-orange-500"
                />
                <DashboardCard 
                    icon={<i className="fas fa-history"></i>} 
                    title="Total Activity Logs" 
                    value={stats?.activityCount || '0'} 
                    iconBgColor="bg-green-500"
                />
            </div>

            <div className="bg-white shadow-md rounded p-4">
                <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
                    <h2 className="text-lg font-bold mb-2 sm:mb-0">Members List</h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            className="border rounded px-4 py-2"
                            placeholder="Search members..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <select
                            className="border rounded px-4 py-2"
                            value={roleFilter}
                            onChange={handleRoleChange}
                        >
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                </div>
                <Table columns={memberColumns} data={filteredMembers} />
            </div>
        </div>
    );
};

export default Dashboard;

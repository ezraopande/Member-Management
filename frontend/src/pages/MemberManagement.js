import React, { useEffect, useState } from 'react';
import memberService from '../services/memberService';
import Table from '../components/ui/Table';
import { CSVLink } from 'react-csv';
import CreateMemberModal from '../components/CreateMemberModal';
import EditMemberModal from '../components/EditMemberModal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Avatar from '../components/ui/Avatar';
import DashboardCard from '../components/DashboardCard';

const MemberManagement = () => {
    const [members, setMembers] = useState([]);
    const [filteredMembers, setFilteredMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [totalMembers, setTotalMembers] = useState(0);
    const [adminCount, setAdminCount] = useState(0);
    const [userCount, setUserCount] = useState(0);


    const fetchMembers = async () => {
        try {
            const data = await memberService.getMembers();
            setMembers(data);
            setFilteredMembers(data);

            const adminCount = data.filter((member) => member.role_id === 1).length;
            const userCount = data.filter((member) => member.role_id === 2).length;
    
            setTotalMembers(data.length);
            setAdminCount(adminCount);
            setUserCount(userCount);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchMembers();
    }, []);

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

    const filterMembers = (search, role) => {
        let filtered = members;

        if (search) {
            filtered = filtered.filter((member) =>
                member.name.toLowerCase().includes(search) ||
                member.user.username.toLowerCase().includes(search) ||
                member.email.toLowerCase().includes(search)
            );
        }

        if (role) {
            filtered = filtered.filter((member) => member.role.role_name.toLowerCase() === role);
        }

        setFilteredMembers(filtered);
    };

    const handleCreateMember = () => {
        setCreateModalVisible(true);
    };

    const closeCreateModal = () => {
        setCreateModalVisible(false);
    };

    const handleMemberCreated = async () => {
        await fetchMembers();
        closeCreateModal();
    };

    const handleEditMember = (member) => {
        setSelectedMember(member);
        setEditModalVisible(true);
    };

    const closeEditModal = () => {
        setEditModalVisible(false);
        setSelectedMember(null);
    };

    const handleMemberUpdated = async () => {
        await fetchMembers();
        closeEditModal();
    };

    const handleDeleteMember = async (id) => {
        if (window.confirm('Are you sure you want to delete this member?')) {
            try {
                await memberService.deleteMember(id);
                await fetchMembers();
            } catch (err) {
                alert('Failed to delete member');
            }
        }
    };

    const columns = [
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
        {
            name: <span style={{ textTransform: 'uppercase' }}>Actions</span>,
            button: true,
            cell: (row) => (
                <div className="flex space-x-2">
                    <button
                        className="text-blue-500"
                        onClick={() => handleEditMember(row)}
                    >
                        <FaEdit />
                    </button>
                    <button
                        className="text-red-500"
                        onClick={() => handleDeleteMember(row.id)}
                    >
                        <FaTrash />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="bg-gray-100">
            {!loading && (
                <div>
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold">Members</h1>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                        <DashboardCard 
                            icon={<i className="fas fa-users"></i>} 
                            title="Total Members" 
                            value={totalMembers}
                            iconBgColor="bg-purple-500"
                        />
                        <DashboardCard 
                            icon={<i className="fas fa-user-shield"></i>} 
                            title="Admins" 
                            value={adminCount}
                            iconBgColor="bg-blue-500"
                        />
                        <DashboardCard 
                            icon={<i className="fas fa-user"></i>} 
                            title="Users" 
                            value={userCount}
                            iconBgColor="bg-green-500"
                        />
                    </div>
                
                    <div className="bg-white p-2 rounded shadow mb-4 flex flex-wrap justify-between items-center">
                        <div className="flex flex-wrap gap-4">
                            <input
                                type="text"
                                placeholder="Search members..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className="border rounded px-4 py-2"
                            />
                            <select
                                value={roleFilter}
                                onChange={handleRoleChange}
                                className="border rounded px-4 py-2"
                            >
                                <option value="">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <CSVLink
                                data={filteredMembers}
                                filename="members.csv"
                                className="bg-blue-500 text-white p-2 rounded"
                            >
                                Export to CSV
                            </CSVLink>
                            <button
                                className="bg-green-500 text-white p-2 rounded"
                                onClick={handleCreateMember}
                            >
                                Create Member
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Table 
                columns={columns} 
                data={filteredMembers} 
                loading={loading} 
                error={error} 
            />

            {createModalVisible && (
                <CreateMemberModal
                    closeModal={closeCreateModal}
                    handleMemberCreated={handleMemberCreated}
                />
            )}

            {editModalVisible && selectedMember && (
                <EditMemberModal
                    member={selectedMember}
                    closeModal={closeEditModal}
                    handleMemberUpdated={handleMemberUpdated}
                />
            )}
        </div>
    );
};

export default MemberManagement;

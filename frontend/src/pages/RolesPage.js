import React, { useEffect, useState } from 'react';
import rolesService from '../services/rolesService';
import Table from '../components/ui/Table';
import { toast } from 'react-toastify';
import LoadingButton from '../components/ui/LoadingButton';

const RolesPage = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ name: '' });
    const [editingRoleId, setEditingRoleId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const data = await rolesService.getRoles();
                setRoles(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRoles();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (editingRoleId) {
                await rolesService.updateRole(editingRoleId, formData);
                toast.success('Role updated successfully');
            } else {
                await rolesService.createRole(formData);
                toast.success('Role created successfully');
            }
            setEditingRoleId(null);
            setFormData({ name: '' });
            const updatedRoles = await rolesService.getRoles();
            setRoles(updatedRoles);
        } catch (err) {
            toast.error('Error saving role');
            setIsLoading(false);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (role) => {
        setEditingRoleId(role.id);
        setFormData({ name: role.name });
    };

    const handleDelete = async (roleId) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            try {
                await rolesService.deleteRole(roleId);
                toast.success('Role deleted successfully');
                const updatedRoles = await rolesService.getRoles();
                setRoles(updatedRoles);
            } catch (err) {
                toast.error('Error deleting role');
            }
        }
    };

    const columns = [
        { name: '#', selector: (row, index) => index + 1, sortable: true },
        { name: 'NAME', selector: (row) => row.name, sortable: true },
        {
            name: 'ACTION',
            cell: (row) => (
                <div className="flex space-x-2">
                    <button
                        className="text-blue-500"
                        onClick={() => handleEdit(row)}
                    >
                        Edit
                    </button>
                    <button
                        className="text-red-500"
                        onClick={() => handleDelete(row.id)}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-xl font-bold mb-4">Roles</h2>
                <Table columns={columns} data={roles} loading={loading} error={error} />
            </div>
            <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-xl font-bold mb-4">
                    {editingRoleId ? 'Edit Role' : 'Create Role'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Role Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full border rounded px-4 py-2"
                            required
                        />
                    </div>
                    <LoadingButton isLoading={isLoading} type="submit" size="w-1/2">
                        {editingRoleId ? 'Update Role' : 'Create Role'}
                    </LoadingButton>
                </form>
            </div>
        </div>
    );
};

export default RolesPage;

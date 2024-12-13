import api from '../api';

const getRoles = async () => {
    try {
        const response = await api.get('/roles');
        return response.data;
    } catch (err) {
        throw new Error('Failed to fetch roles');
    }
};

const createRole = async (roleData) => {
    try {
        const response = await api.post('/roles', roleData);
        return response.data;
    } catch (err) {
        throw new Error('Failed to create role');
    }
};

const updateRole = async (roleId, roleData) => {
    try {
        const response = await api.put(`/roles/${roleId}`, roleData);
        return response.data;
    } catch (err) {
        throw new Error('Failed to update role');
    }
};

const deleteRole = async (roleId) => {
    try {
        const response = await api.delete(`/roles/${roleId}`);
        return response.data;
    } catch (err) {
        throw new Error('Failed to delete role');
    }
};

export default {
    getRoles,
    createRole,
    updateRole,
    deleteRole,
};

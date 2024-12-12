import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const registerUser = createAsyncThunk('auth/register', async (formData, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/register', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchUserProfile = createAsyncThunk('/members/profile', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/members/profile', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

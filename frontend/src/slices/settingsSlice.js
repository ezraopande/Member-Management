import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const fetchSettings = createAsyncThunk('settings/fetchSettings', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/control-panel/settings');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch settings');
    }
});

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        data: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default settingsSlice.reducer;

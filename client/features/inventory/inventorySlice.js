import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchInitialInventory, createInventoryItem } from './inventoryAPI';

const initialState = {
    inventory: [],
    loading: true
};

export const fetchInitialInventoryAsync = createAsyncThunk(
    'inventory/fetchInventory',
    async () => {
        const response = await fetchInitialInventory();
        return response.data;
    }
);

export const createInventoryItemAsync = createAsyncThunk(
    'inventory/createInventoryItem',
    async (newItem) => {
        const response = await createInventoryItem(newItem);
        return response.data.newDocument;
    }
);

export const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitialInventoryAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchInitialInventoryAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.inventory = action.payload;
            })
            .addCase(createInventoryItemAsync.fulfilled, (state, action) => {
                state.inventory = [action.payload, ...state.inventory];
            });
    },
});

export const selectInventory = (state) => state.inventory.inventory;

export default inventorySlice.reducer;

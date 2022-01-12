import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchInitialInventory, createInventoryItem, updateInventoryItem, deleteInventoryItem } from './inventoryAPI';

const initialState = {
    inventory: [],
    loading: true,
    createLoading: false,
    updateLoading: false
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

export const updateInventoryItemAsync = createAsyncThunk(
    'inventory/updateInventoryItem',
    async (updatedItem) => {
        const response = await updateInventoryItem(updatedItem);
        return response.data.newDocument;
    }
);

export const deleteInventoryItemAsync = createAsyncThunk(
    'inventory/deleteInventoryItem',
    async (id) => {
        const response = await deleteInventoryItem(id);
        return response.data._id;
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
            .addCase(createInventoryItemAsync.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createInventoryItemAsync.fulfilled, (state, action) => {
                state.createLoading = false;
                state.inventory = [action.payload, ...state.inventory];
            })
            .addCase(updateInventoryItemAsync.pending, (state) => {
                state.updateLoading = true;
            })
            .addCase(updateInventoryItemAsync.fulfilled, (state, action) => {
                let updateIndex = state.inventory.findIndex(
                    (item) => item._id === action.payload._id
                );
                state.updateLoading = false;
                state.inventory[updateIndex] = action.payload;
            })
            .addCase(deleteInventoryItemAsync.pending, (state) => {
                state.deleteLoading = true;
            })
            .addCase(deleteInventoryItemAsync.fulfilled, (state, action) => {
                let deleteIndex = state.inventory.findIndex(
                    (item) => item._id === action.payload._id
                );
                state.inventory = [
                    ...state.inventory.slice(0, deleteIndex),
                    ...state.inventory.slice(deleteIndex + 1)
                ];
            });
    },
});

export const selectInventory = (state) => state.inventory.inventory;

export default inventorySlice.reducer;

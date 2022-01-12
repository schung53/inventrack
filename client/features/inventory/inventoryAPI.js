import axios from 'axios';

export function fetchInitialInventory() {
    return axios.get('/fetchInitial');
}

export function createInventoryItem(newItem) {
    return axios.post('/create', newItem);
}

export function updateInventoryItem(updatedItem) {
    return axios.post('/update', updatedItem);
}

export function deleteInventoryItem(id) {
    return axios.post(`/delete?id=${id}`);
}

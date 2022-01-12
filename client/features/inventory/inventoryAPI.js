import axios from 'axios';

export function fetchInitialInventory() {
    return axios.get('/fetchInitial');
}

export function createInventoryItem(newItem) {
    return axios.post('/create', newItem);
}

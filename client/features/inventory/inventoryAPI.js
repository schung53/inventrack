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
    return axios.get(`/delete?id=${id}`);
}

export function uploadImage(file) {
    console.log(file)
    var formData = new FormData();
    formData.append("file", file);
    for(var pair of formData.entries()) {
        console.log(pair[0]+', '+pair[1]);
    }

    return axios.post('/image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

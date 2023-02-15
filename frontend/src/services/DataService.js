import store from "./DataStore.js"
// TODO: Maybe there is a better place to put this setting
const BASE_URL = 'http://localhost:8082';

export async function getAllListings(count = 25) {
    const response = await fetch(`${BASE_URL}/listings/${count}`);
    return await response.json();
}

export async function getUser(id) {
    const response = await fetch(`${BASE_URL}/user/${id}`);
    return await response.json();
}

export async function getItem(id) {
    const response = await fetch(`${BASE_URL}/item/${id}`);
    return await response.json();
}

export async function getAllitems() {
    const response = await fetch(`${BASE_URL}/items`);
    return await response.json();
}

export async function getListingsByName(name) {
    const response = await fetch(`${BASE_URL}/listings/byName/${name}`);
    return await response.json();
}

export async function registerUser(data) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function loginUser(data) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function createListing(data) {
    const response = await fetch(`${BASE_URL}/listings`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${store.state.token}` },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function modifyListing(data) {
    const response = await fetch(`${BASE_URL}/listings`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${store.state.token}` },
        body: JSON.stringify(data)
    });
    return await response.json();
}

export async function deleteListing(data) {
    const response = await fetch(`${BASE_URL}/listings`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${store.state.token}` },
        body: JSON.stringify(data)
    });
    return await response.json();
}
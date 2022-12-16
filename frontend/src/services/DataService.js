// TODO: Maybe there is a better place to put this setting
const BASE_URL = 'http://localhost:3030';

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
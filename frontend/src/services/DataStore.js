export async function getToken() {
    return localStorage.getItem("token");
}

export async function setToken() {
    localStorage.setItem("token");
}

export async function hasToken() {
    return localStorage.getItem("token") != null;
}
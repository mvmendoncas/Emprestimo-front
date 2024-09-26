import api from "../http-common";

export async function registerAgiota(data){
    return await api.post("/agiota/register", data)
}  

export async function listAgiotaBorrowings() {
    return await api.get("borrowing/agiota")
}

export async function acceptedRequest(id) {
    return await api.post(`borrowing/${id}/accept`)
}

export async function currentUserAgiota() {
    return await api.get("agiota/current")
}

export async function editAgiota(id, data) {
    return await api.patch(`agiota/${id}`, data); 
}

export async function searchAgiota(id) {
    return await api.get(`agiota/${id}`)
}

export async function deleteAgiota(id) {
    return await api.delete(`agiota/${id}`)
}

export async function denyRequest(id) {
    return await api.post(`borrowing/${id}/denied`)
}
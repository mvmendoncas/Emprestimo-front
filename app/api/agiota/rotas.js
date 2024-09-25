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
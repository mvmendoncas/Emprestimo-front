import api from "../http-common";

export const getCurrentUserId = async () => {
    const response = await api.get('/agiota/current');
    return response.data.id
} 

export async function registerBorrowing(data) {
    return await api.post("/borrowing", data)
}

export async function listBorrowing() {
    return await api.get("/borrowing")
}

export async function findBorrowing(id) {
    return await api.get("/borrowing/" + id)
}

export async function requestBorrowing(id) {
    return await api.post(`borrowing/${id}/request`)
}
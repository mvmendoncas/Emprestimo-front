import api from "../http-common";

export const getCurrentUserId = async () => {
    const response = await api.get('/agiota/current');
    return response.data.id
} 

export async function registerBorrowing(data) {
    return await api.post("/borrowing", data)
}
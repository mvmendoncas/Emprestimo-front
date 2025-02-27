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

export async function viewInstallments(id) {
    return await api.get(`borrowing/${id}/installments`)
}

export async function payInstallment(id, value) {
    return await api.post(`borrowing/${id}/installments/${value}/pay`)
}

export async function evaluateAgiota(id, note) {
    return await api.post(`borrowing/evaluate-agiota/${id}`, note)
}


export async function evaluateCustomer(id, note) {
    return await api.post(`borrowing/evaluate-customer/${id}`, note)
}
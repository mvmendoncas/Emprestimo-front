import api from "../http-common";

export async function  registerCustomer(data) {
    return await api.post("customer/register", data)
}

export async function currentUserCustomer() {
    return await api.get("customer/current")
}

export async function listCustomerBorrowings() {
    return await api.get("borrowing/customer")
}

export async function editCustomer(id, data) {
    return await api.patch(`customer/${id}`, data); 
}

export async function searchCustomer(id) {
    return await api.get(`customer/${id}`)
}

export async function deleteCustomer(id) {
    return await api.delete(`customer/${id}`)
}
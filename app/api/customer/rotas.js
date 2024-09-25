import api from "../http-common";

export async function  registerCustomer(data) {
    return await api.post("customer/register", data)
}

export async function currentUser() {
    return await api.get("customer/current")
}

export async function listCustomerBorrowings() {
    return await api.get("borrowing/customer")
}
import api from "../http-common";

export async function  registerCustomer(data) {
    return await api.post("customer/register", data)
}

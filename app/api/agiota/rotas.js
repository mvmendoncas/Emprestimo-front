import api from "../http-common";

export async function registerAgiota(data){
    return await api.post("/agiota/register", data)
}  
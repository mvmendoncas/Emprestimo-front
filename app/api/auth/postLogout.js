import api from "../http-common-keycloak";

export async function postLogout(){
    return await api.post("realms/master/protocol/openid-connect/logout",{
        client_id: "agiota-application",
        client_secret: "tx4rtkcNtwGrux4NOzohhHi3V1ILyI7q",
    })
}  
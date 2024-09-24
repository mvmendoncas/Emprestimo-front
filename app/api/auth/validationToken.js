import api from "../api/http-common-keycloak";

export async function postValidateToken(token){
    console.log("chama", token);
    return await api.post("realms/agiota/protocol/openid-connect/token/introspect",{
        token: token,
        client_id: "agiota-application",
        client_secret: "tx4rtkcNtwGrux4NOzohhHi3V1ILyI7q",
        
    })
}  
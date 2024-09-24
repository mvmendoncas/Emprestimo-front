import axios from 'axios';

export async function postLogin(login, password){
    const url = "http://localhost:8081/auth/login"; // URL completo do backend
    return await axios.post(url, {
        username: login,
        password: password,
    }, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
}

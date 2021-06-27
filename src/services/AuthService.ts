// src/services/AuthService.js
import axios, { AxiosResponse } from 'axios';
const url = 'http://localhost:3000/';

export default {
    signIn(credentials: any): Promise<any> {
        return axios
            .post(url + 'login/', credentials)
            .then(response => response.data);
    },
    signUp(credentials: any): Promise<any> {
        return axios
            .post(url + 'login/register', credentials)
            .then(response => response.data);
    },
    decode(token: String): Promise<any> {
        return axios
            .get(url + 'login/tokeninfo', { headers: { 'authorization': token }})
            .then(response => response.data);
    }
};
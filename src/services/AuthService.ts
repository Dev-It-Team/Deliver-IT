// src/services/AuthService.js
import axios from 'axios';
const url = 'http://localhost:3000/';

export default {
    signUp(credentials: any): Promise<any> {
        return axios
            .post(url + 'login/register', credentials)
            .then(response => response.data);
    },
    decode(): Promise<any> {
        return axios
            .get(url + 'login/tokeninfo')
            .then(response => response.data);
    },
    recoverUserInformation(idUser: string): Promise<any> {
        return axios
            .get(url + 'users/' + idUser)
            .then(response => response.data);
    },
    updateUser(user: Object, idUser: string): Promise<any> {
        return axios
            .put(url + 'users/' + idUser, user)
            .then(response => response.data);
    },
    loginLog(idUser: string, description: Object): Promise<any> {
        return axios
            .post(url + 'users/' + idUser + '/logs', description)
            .then(response => response.data);
    },
    logOutLog(idUser: string, description: Object): Promise<any> {
        return axios
            .post(url + 'users/' + idUser + '/logs', description)
            .then(response => response.data);
    }
};
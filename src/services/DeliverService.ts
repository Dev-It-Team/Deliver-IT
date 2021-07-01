// src/services/DeliverService.js
import axios from 'axios';
const url = 'http://localhost:3000/';

export default {
    createDeliver(newDeliver: Object): Promise<any> {
        return axios
            .post(url + 'deliveryDrivers/', newDeliver)
            .then(response => response.data);
    },
    updateDeliver(newDeliver: Object, idDeliver: string): Promise<any> {
        return axios
            .put(url + 'deliveryDrivers/' + idDeliver, newDeliver)
            .then(response => response.data);
    },
    getDeliver(idUser: string): Promise<any> {
        return axios
            .get(url + 'deliveryDrivers/' + idUser)
            .then(response => response.data);
    },
    getOrders(idDeliver: string): Promise<any> {
        return axios
            .get(url + 'orders/' + idDeliver)
            .then(response => response.data);
    },
};
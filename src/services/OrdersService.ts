import axios from 'axios';
const url = 'http://localhost:3000/users/';

export default {
    createOrder(orderContent: any): Promise<any> {
        return axios
            .post(url + orderContent.IdUser + "/orders/", orderContent)
            .then(response => response.data);
    },
    getOrders(idUser: Number): Promise<any> {
        return axios
            .get(url + idUser + "/orders/")
            .then(response => response.data);
    },
    acceptOrder(updatedOrder: any): Promise<any> {
        return axios
            .put(url + updatedOrder.IdUser + "/orders/"  + updatedOrder._id, updatedOrder)
            .then(response => response.data);
    }
}
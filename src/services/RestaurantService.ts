// src/services/RestaurantService.js
import axios from 'axios';
const url = 'http://localhost:3000/restaurants/';

export default {
    createRestaurant(newRestaurant: Object): Promise<any> { 
        return axios
            .post(url, newRestaurant)
            .then(response => response.data);
    },
    updateRestaurant(newRestaurant: Object, idRestaurant: string): Promise<any> { 
        return axios
            .put(url + idRestaurant, newRestaurant)
            .then(response => response.data);
    },
    uploadFile(newFile: Object): Promise<any> { 
        return axios
            .post(url + 'upload/', newFile, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => response.data);
    },
    getRestaurants(): Promise<any> {
        return axios
            .get(url)
            .then(response => response.data);
    },
    getRestaurant(idRestaurant: string): Promise<any> {
        return axios
            .get(url + idRestaurant)
            .then(response => response.data);
    },
    getMyRestaurant(idUser: string): Promise<any> {
        return axios
            .get(url + idUser)
            .then(response => response.data);
    },
    getRestaurantProducts(idRestaurant: string): Promise<any> {
        return axios
            .get(url + idRestaurant + '/products')
            .then(response => response.data);
    },
    createProduct(idRestaurant: string, newProduct: Object): Promise<any> {
        return axios
            .post(url + idRestaurant + '/products', newProduct)
            .then(response => response.data);
    },
    updateProduct(idRestaurant: string, newProduct: Object, idProduct: string): Promise<any> {
        return axios
            .put(url + idRestaurant + '/products/' + idProduct, newProduct)
            .then(response => response.data);
    },
    deleteProduct(idRestaurant: string, idProduct: string): Promise<any> {
        return axios
            .delete(url + idRestaurant + '/products/' + idProduct)
            .then(response => response.data);
    },
    getRestaurantMenus(idRestaurant: string): Promise<any> {
        return axios
            .get(url + idRestaurant + '/menus')
            .then(response => response.data);
    },
    createMenu(idRestaurant: string, newMenu: Object): Promise<any> {
        return axios
            .post(url + idRestaurant + '/menus', newMenu)
            .then(response => response.data);
    },
    updateMenu(idRestaurant: string, newMenu: Object, idMenu: string): Promise<any> {
        return axios
            .post(url + idRestaurant + '/menus/' + idMenu, newMenu)
            .then(response => response.data);
    },
    deleteMenu(idRestaurant: string, idMenu: Object): Promise<any> {
        return axios
            .delete(url + idRestaurant + '/menus/' + idMenu)
            .then(response => response.data);
    },
};
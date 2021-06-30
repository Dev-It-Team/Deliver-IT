// src/services/RestaurantService.js
import axios from 'axios';
const url = 'http://localhost:3000/';

export default {
    createRestaurant(newRestaurant: Object): Promise<any> { 
        return axios
            .post(url + 'restaurants/', newRestaurant)
            .then(response => response.data);
    },
    updateRestaurant(newRestaurant: Object, idRestaurant: String): Promise<any> { 
        return axios
            .put(url + 'restaurants/' + idRestaurant, newRestaurant)
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
            .get(url + 'restaurants/')
            .then(response => response.data);
    },
    getRestaurant(idRestaurant: Object): Promise<any> {
        return axios
            .get(url + 'restaurants/', idRestaurant)
            .then(response => response.data);
    },
    getMyRestaurant(idUser: String): Promise<any> {
        return axios
            .get(url + 'restaurants/' + idUser)
            .then(response => response.data);
    },
    getRestaurantProducts(idRestaurant: String): Promise<any> {
        return axios
            .get(url + 'restaurants/' + idRestaurant + '/products')
            .then(response => response.data);
    },
    createProduct(idRestaurant: String, newProduct: Object): Promise<any> {
        return axios
            .post(url + 'restaurants/' + idRestaurant + '/products', newProduct)
            .then(response => response.data);
    },
    updateProduct(idRestaurant: String, newProduct: Object, idProduct: String): Promise<any> {
        return axios
            .put(url + 'restaurants/' + idRestaurant + '/products/' + idProduct, newProduct)
            .then(response => response.data);
    },
    deleteProduct(idRestaurant: String, idProduct: String): Promise<any> {
        return axios
            .delete(url + 'restaurants/' + idRestaurant + '/products/' + idProduct)
            .then(response => response.data);
    },
    getRestaurantMenus(idRestaurant: String): Promise<any> {
        return axios
            .get(url + 'restaurants/' + idRestaurant + '/menus')
            .then(response => response.data);
    },
    createMenu(idRestaurant: String, newMenu: Object): Promise<any> {
        return axios
            .post(url + 'restaurants/' + idRestaurant + '/menus', newMenu)
            .then(response => response.data);
    },
    updateMenu(idRestaurant: String, newMenu: Object, idMenu: String): Promise<any> {
        return axios
            .post(url + 'restaurants/' + idRestaurant + '/menus/' + idMenu, newMenu)
            .then(response => response.data);
    },
    deleteMenu(idRestaurant: String, idMenu: Object): Promise<any> {
        return axios
            .delete(url + 'restaurants/' + idRestaurant + '/menus/' + idMenu)
            .then(response => response.data);
    },
};
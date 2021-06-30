// src/services/RestaurantService.js
import axios from 'axios';
const url = 'http://localhost:3000/';

export default {
    createRestaurant(newRestaurant: Object): Promise<any> { 
        return axios
            .post(url + 'restaurants/', newRestaurant)
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
    getMyRestaurant(idUser: Object): Promise<any> {
        return axios
            .get(url + 'restaurants/', idUser)
            .then(response => response.data);
    },
};
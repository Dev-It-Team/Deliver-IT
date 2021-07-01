// src/services/UploadService.js
import axios from 'axios';
const url = 'http://localhost:3000/';

export default {
    uploadFile(newFile: Object): Promise<any> { 
        return axios
            .post(url + 'upload/', newFile, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => response.data);
    },
};
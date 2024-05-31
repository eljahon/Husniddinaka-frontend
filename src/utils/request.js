import axios from 'axios';
import {useToast} from "primevue/usetoast";

let config = {
    baseURL: import.meta.env.VITE_BASE_URL
};

const request = axios.create(config);
request.interceptors.request.use(function (config) {
    if (localStorage.getItem('token')) {
        config.headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        };
    }
    return config;
});
request.interceptors.response.use(
    function (response) {
        if (response.data) return response.data;

        return response;
    },
    function (error) {
        const {
            message,
            response: { status }
        } = error;
        console.log(message, status);

        useToast().add({ severity: 'error', summary: 'Error Message', detail: message+"" + status, life: 3000 });
        return Promise.reject(error);
    }
);

export default request;

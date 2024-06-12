import axios from 'axios';
import {useToast} from "primevue/usetoast";

let config = {
    baseURL: import.meta.env.VITE_BASE_URL
};

const request = axios.create(config);
function showToast(severity, summary, detail) {
    const toast = useToast();
    toast.add({ severity, summary, detail, life: 3000 });
}
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
        showToast('error', 'Error Message',message+"" + status,)
        // useToast().add({ severity: '', summary: , detail: , life: 3000 });
        return Promise.reject(error);
    }
);

export default request;

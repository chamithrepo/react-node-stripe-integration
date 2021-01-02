import axios from 'axios';

var Axios = axios.create();

Axios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        Promise.reject(error)
    });

Axios.interceptors.response.use((response) => {
    return response
}, function (error) {
    return Promise.reject(error);
});
export default Axios;
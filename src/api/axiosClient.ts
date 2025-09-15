import axios from "axios";

const axiosClient = axios.create({
    baseURL: 'http://localhost:5188',
    timeout: 20000,
    // headers: {
    //     'Content-Type': 'application/json'
    // }
});

export default axiosClient;
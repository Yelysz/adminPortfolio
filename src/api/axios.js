import axios from 'axios';

const instance = axios.create({
     baseURL: "https://yelysz-portfolioadmin.onrender.com/api",
     withCredentials: true,
})

export default instance;
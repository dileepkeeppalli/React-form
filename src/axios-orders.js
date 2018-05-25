import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-a826a.firebaseio.com/'
});

export default instance;
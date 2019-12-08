import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const createNew = (data) => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const request = axios.post(baseUrl, data, {headers: {authorization: `bearer ${token}`}});
    return request.then(response => response.data);
};

export default { getAll, createNew };

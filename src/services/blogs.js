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
const updateLike = (id, like) => {
    const token = JSON.parse(localStorage.getItem('user')).token

    const request = axios.put(`${baseUrl}/${id}`, {likes: like},  {headers: {authorization: `bearer ${token}`}});
    return request.then(response=> response.data)
}

const deletePost =  (id) => {
    const token = JSON.parse(localStorage.getItem('user')).token
    const request = axios.delete(`${baseUrl}/${id}`, {headers: {authorization: `bearer ${token}`}});
    return request.then(response=> response.data);
}
export default { getAll, createNew, updateLike, deletePost };

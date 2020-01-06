import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };
    const reset = () => {
        setValue('');
    };
    return {
        type,
        value,
        reset,
        onChange
    };
};
export const useResource = (url) {

    const [resources, setResources] = useState([])

    // eslint-disable-next-line no-unused-vars
    let token = null
    const setToken = newToken => { token = `bearer ${newToken}`}
    const getAll = () => {
        axios.get(baseUrl).then(response => setResources(response.data))
    }
    const create = (resource) => {
        axios.post(baseUrl,resource, { headers: { Authorization: token } })
          .then(response => setResources(resources.concat(response.data)))
    }

    const service = {
        create, getAll, setToken
    }

    return [
        resources, service
    ]
}


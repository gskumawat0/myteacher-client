import axios from 'axios';

export function apiCall(method, url, data) {
    return new Promise((resolve, reject) => {
        return axios({
                method,
                headers: {
                    Authorization: window.localStorage.jwtToken
                },
                url,
                data,
            })
            .then(res => {
                return resolve(res.data);
            })
            .catch((err) => {
                if (err.response) {
                    return reject(err.response.data);
                }
                else if (err.request) {
                    return reject(err);
                }
                else {
                    return reject(err);
                }
            })
    });
}

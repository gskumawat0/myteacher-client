import axios from 'axios';

export function apiCall(method, url, data) {
    console.log(method, url, data)
    debugger
    return new Promise((resolve, reject) => {
        return axios({
                method,
                url,
                data
            })
            .then(res => {
                console.log(res);
                return resolve(res.data);
            })
            .catch((err) => {
                if (err.response) {
                    // debugger
                    return reject(err.response.data);
                }
                else if (err.request) {
                    // debugger
                    return reject(err);
                }
                else {
                    // debugger
                    return reject(err);
                }
            })
    });
}

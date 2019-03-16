import axios from 'axios';

export function apiCall(method, url, data) {
  console.log(data)
    return new Promise((resolve, reject) => {
        return axios({
                method,
                url,
                params: { origin: "*" },
                headers: {
                  "Content-Type": "application/json"
              },
                data
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

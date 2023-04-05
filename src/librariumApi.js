import axios from 'axios';

const librariumApi = axios.create({
    baseURL: 'http://localhost:5109/api',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});
 librariumApi.interceptors.request.use(function (req) {
    if (window.localStorage.getItem('userAccessToken')) {
        req.headers.authorization = `Bearer ${JSON.parse(window.localStorage.getItem('userAccessToken'))}`;
    }
    return req;
})

export default librariumApi;

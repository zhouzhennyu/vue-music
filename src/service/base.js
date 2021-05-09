import axios from 'axios';

const ERR_OK = 0
const baseURL = process.env.NODE_ENV === 'production' ? 'http://ustbhuangyi.com/music-next/' : '/'

axios.defaults.baseURL = baseURL;

export function get(url, params) {
    return axios.get(url, {
        params
    }).then(res => {
        const data = res.data;
        if (data.code === ERR_OK) {
            return data.result;
        }
    }).catch(err => {
        console.log(err);
    })
}
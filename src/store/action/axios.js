import 'es6-promise';
import axios from 'axios';
axios.defaults.headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Service-Catalog': 'serviceCatalog',
  'CSRF-Token': 'weee',
  'sessiontoken':'18514813922',
  'timeout':1000 * 100
}
const get = (url, params)=>{
  console.log(url)
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(res => {
               return resolve(res.data);
            })
            .catch(err => {
              return reject(err.data)
            })
    });
}
const post = (url, params) => {
  console.log(url , params)
  return new Promise((resolve, reject) => {
    axios.post(url, {
      ...params
    })
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.data)
      })
  });
}
export default {
  get,
  post,
}
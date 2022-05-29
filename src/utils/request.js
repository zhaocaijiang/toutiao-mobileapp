import axios from 'axios'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
export default request

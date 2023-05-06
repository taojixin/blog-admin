import axios from 'axios'
import { baseURL, TIMEOUT } from './config'

class Request{
  constructor(baseURL, timeout=10000) {{
    this.instance = axios.create({
      baseURL,
      timeout
    })

    // 请求拦截器
    this.instance.interceptors.request.use(config => {
      if (localStorage.getItem("adminToken")) {
        config.headers.authorization = localStorage.getItem("adminToken")
      }
      return config
    }, err => {
      return err
    })

    // 响应拦截器
    this.instance.interceptors.response.use(res => {
      return res
    }, err => {
      return err
    })
  }}

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({...config, method: 'get'})
  }

  post(config) {
    return this.request({...config, method: 'post'})
  }
}

export default new Request(baseURL, TIMEOUT)
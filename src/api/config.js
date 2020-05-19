// 配置axios

import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : ''
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'
axios.defaults.timeout = 10000



// 拦截器
axios.interceptors.request.use(function (config) {
    return config
}, function(err) {
    return Promise.reject(err)
})

axios.interceptors.response.use(function(res) {
    return res.data
}, function (err) {
    return Promise.reject(err)
})

export default axios
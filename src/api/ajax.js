// 封装axiso请求

import axios from 'axios'
import { Toast } from 'antd-mobile'

const ajax = (url, data={}, type='GET') => {
  return new Promise((resolve, reject) => {
    let promise
    if(type==='GET') {
      promise = axios.get(url, {
        params: data
      })
    }else {
      promise = axios.post(url, data)
    }
    promise.then(res => {
      resolve(res.data)
    }).catch(err => {
      Toast.fail('请求出错了' + err)
    })
  })
}

export default ajax
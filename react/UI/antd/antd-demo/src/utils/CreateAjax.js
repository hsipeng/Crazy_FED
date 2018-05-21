
import axios from 'axios'
import querystring from 'querystring'
import {parse} from 'url'

import {api_base_url} from './config'
import logger from './logger'
import {ApiHttpError} from './error'


let client = axios.create({
  timeout: 5000,
  paramsSerializer: params => querystring.stringify(params),
  headers:{'Content-Type': 'application/json'},
  responseType: 'json'
})
// const token = sessionStorage.getItem('reactToken')

// if(token != 'null' && token != null){
//     client.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 注意Bearer后有个空格
// }


client.interceptors.request.use(
  config => {
    let {method, url, params, data} = config
    logger.info("请求信息-->",method, url, params || data)
    return config
  },
  error => {
    logger.info("错误信息-->",error)
    return Promise.reject(new ApiHttpError(400, error.message))
  }
)
client.interceptors.response.use(
  response => {
    let {status, data, config: {url}} = response
    let {path} = parse(url)
    logger.info("返回成功信息-->",status, path, data)
    return response
  },
  error => {
    logger.info("返回失败信息-->",error)
    if (error.response) {
      let {status, statusText} = error.response
      return Promise.reject(new ApiHttpError(status, statusText))
    } else {
      if (error.message.startsWith('timeout of ')) {
        return Promise.reject(new ApiHttpError(408, '请求超时'))
      } else {
        return Promise.reject(new ApiHttpError(500, error.message))
      }
    }
  }
)

export function postAjax (dispatch,TYPES,url, data = {}, {onUploadProgress} = {}) {
  return requestApi(dispatch,TYPES,{
    url,
    method: 'POST',
    data: data,
    onUploadProgress
  })
}
export function getAjax (dispatch,TYPES,url, data = {}, {onUploadProgress} = {}) {
  return requestApi(dispatch,TYPES,{
    url,
    method: 'GET',
    data: data,
    onUploadProgress
  })
}
export function requestApi (dispatch,TYPES,config){
  config.baseURL = api_base_url
  return client.request(config)
    .then(response => {
      logger.info("success",response)
       dispatch({
                type: TYPES,
                payload: {'list':response.data.content,'status':1}
            })
    },reject=>{
      logger.info("reject",reject)
       dispatch({
                type: TYPES,
                payload: {'list':null,'status':-1}
            })
    })
}

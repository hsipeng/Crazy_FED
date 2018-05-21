// 配置中间件
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'

const middlewares = [thunk]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger())
}

export default middlewares

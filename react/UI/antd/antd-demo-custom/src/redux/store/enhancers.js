// 配置 Store 增强器
const enhancers = []

if (__DEV__) {

  if (!__COMPONENT_DEVTOOLS__) {    
    const devToolsExtension = window.devToolsExtension
    if (devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  if (__COMPONENT_DEVTOOLS__) {
    const DevTools = require('COMPONENT/DevTools').default
    enhancers.push(DevTools.instrument())
  }
}

export default enhancers

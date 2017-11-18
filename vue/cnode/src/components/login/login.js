import api from '../../util/api'

export default {
  login (token) {
    return api.post('/accesstoken', {
      accesstoken: token
    }).then(res => {
      if (res.data.success) {
        return res.data
      } else {
        return null
      }
    })
  }
}

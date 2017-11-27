const Http = require('./util/api')

console.log(Http.get('/topics', { tab: 'ask', page: 1, limit: 20 }))

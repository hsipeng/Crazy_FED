var express = require('express')
var multer = require('multer')
var upload = require('./lib/multerUtil')
var config = require('../config')

var app = express()

app.post('/upload', upload.single('file'), function(req, res, next) {
    // req.file 是 `avatar` 文件的信息
    // req.body 将具有文本域数据，如果存在的话
    let re = {}
    re.data = req.file
    re.status = 'ok'
    re.data.webPath = config.webPath + req.file.filename
    res.send(re)
})

app.post('/images/upload', upload.array('images', config.fileLimit), function(req, res, next) {
    // req.files 是 `photos` 文件数组的信息
    // req.body 将具有文本域数据，如果存在的话
    let re = {}
    re.status = 'ok'
    req.files.forEach(function(element, index) {
        // statements
        element.webPath = config.webPath + element.filename
    });
    re.data = req.files
    res.send(re)
})
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))

app.listen(config.port, function() {
    console.log('listenning at http://localhost:' + config.port + '/')
})

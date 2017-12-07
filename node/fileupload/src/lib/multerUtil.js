var multer = require('multer')
var uuid = require('node-uuid')
var path = require('path')
var config = require('../../config')
var storage = multer.diskStorage({
  //上传路径， 自动创建目录
  destination: function(req, file, cb) {
    cb(null, config.uploadPath)
  },
  filename: function(req, file, cb) {
    var fileFormat = (file.originalname).split(".")
    cb(null, uuid.v4().replace('-', '') + "." + fileFormat[fileFormat.length - 1])
  }
})

var limits = {
  fieldNameSize: 100,
  fieldSize: 1024,
  fields: Infinity,
  fileSize: config.maxSize,
  files: 50,
  parts: Infinity,
  headerPairs: 2000
}
var fileFilter = function(req, file, cb) {

  var filetypes = new RegExp(config.filetypes);
  var mimetype = filetypes.test(file.mimetype);
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb("Error: File upload only supports the following filetypes - " + filetypes);
}
var upload = multer({
  storage: storage,
  limits: limits,
  fileFilter: fileFilter
})

module.exports = upload

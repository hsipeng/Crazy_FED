var config = {
    port: 3000,
    uploadPath: './uploads',
    webPath: 'http://localhost:3000/uploads/',
    maxSize: 5210000, // 最大大小。单位byte
    filetypes: 'jpg|png|pdf|jpeg|zip', // 文件类型
    fileLimit: 12 // 批量上传限制个数
}

module.exports = config

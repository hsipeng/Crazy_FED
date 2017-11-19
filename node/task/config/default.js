module.exports = {
	port:3000,
    databasedev:{
        DATABASE: 'thzy12',
        USER: 'root',
        PASSWORD: '123456',
        PORT: '3306',
        HOST: '127.0.0.1'
    },
    email:{
        USER: 'xxxxx@xx@com', //你的邮箱账号
        PASSWORD: 'xxx', //你的邮箱密码
        HOST: 'imap.exmail.qq.com', //邮箱服务器的主机地址
        PORT: 993, //邮箱服务器的端口地址
        TLS: true, //使用安全传输协议
        TLSOPTIONS: { rejectUnauthorized: false } //禁用对证书有效性的检查
    }
}

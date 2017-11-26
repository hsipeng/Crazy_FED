var mysql = require('mysql')
var config = require('../config/default.js')
const moment = require('moment')

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
})

var query = function (sql, val) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return resolve(err)
      } else {
        connection.query(sql, val, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

let insertData = function (n) {
  let _sql = `INSERT INTO tb_driver_news(id, title, auther, pulish_time, href, imgs_url, content, createAt, updateAt) VALUES (null, '${n.title}', '${n.auther}', '${n.publishtime}', '${n.href}', '${n.imgsUrl}', '${n.content}', NOW(), NOW());`
  return query(_sql)
}

let selectData = function (t) {
  let re = /^[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
  if (!re.test(t) || t === undefined || t === null) {
    t = moment().format('Y-M-D')
  }
  let _sql = `SELECT * FROM tb_driver_news WHERE DATE_FORMAT(createAt,'%Y-%m-%d') = '${t}';`
  return query(_sql)
}
module.exports = {
  insertData,
  selectData
}

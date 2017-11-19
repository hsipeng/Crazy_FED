var mysql = require('mysql');
var config = require('../config/default.js')

var pool = mysql.createPool({
	host:config.database.HOST,
	user:config.database.USER,
	password:config.database.PASSWORD,
	database:config.database.DATABASE,
});


var query = function(sql,val){
	return new Promise((resolve,reject)=>{
		pool.getConnection((err,connection)=>{
			if (err){
				return resolve(err)
			} else{
				connection.query(sql,val,(err,rows)=>{
					if (err) {
						reject(err)
					}else{
						resolve(rows)
					}
					connection.release()
				})
			}
		})
	})
}


let insertData = function( title, content) {
	let _sql = `INSERT INTO kppw_task VALUES (null, "${title}", "${content}", '3', '170', '051085387080', '0', '3', null, '0.00', '0', null, NOW(), null, DATE_ADD(NOW(),INTERVAL 4320 MINUTE), null, null, null, null, '0.00', '0.00', '0.00', '1', '37', '0', '1', '0', '22', null, '1', '0', null, '5', '0', NOW(), null, NOW());`
	return query(_sql)
  }

let getTasks = function (title) {
  let _sql = `select id,title FROM kppw_task where title="${title}" limit 0,1`
  return query(_sql)
}

let insertArticle = function (title, content) {
  let _sql = `INSERT INTO kppw_article (id, cat_id, user_id, user_name, title, author, \`from\`, fromurl, url, summary, pic, thumb, tag, created_at, status, content, view_times, seotitle, keywords, description, display_order, is_recommended, updated_at) VALUES (NULL, '55', '0', NULL, '${title}', '1', NULL, NULL, NULL, '', NULL, NULL, NULL, NOW(), NULL, '${content}', '0', '', '', '', '1', NULL, NOW());`
  // console.log(_sql)
  return query(_sql)
}

let getNews = function (title) {
  let _sql = `select id,title FROM kppw_article where title="${title}" limit 0,1`
  return query(_sql)
}

module.exports = {
    insertData,
    insertArticle,
    getNews,
    getTasks
}

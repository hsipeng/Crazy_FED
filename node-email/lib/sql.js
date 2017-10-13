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
	console.log(title+':'+content)
	let _sql = `INSERT INTO kppw_task VALUES (null, "${title}", "${content}", '3', '170', '051085387080', '0', '3', null, '0.00', '0', null, NOW(), null, DATE_ADD(NOW(),INTERVAL 4320 MINUTE), null, null, null, null, '0.00', '0.00', '0.00', '1', '37', '0', '1', '0', '21', null, '1', '0', null, '5', '0', NOW(), null, NOW());`
	console.log(_sql)
	return query(_sql)
  }


module.exports = {
    insertData
}
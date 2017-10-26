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
	let _sql = `INSERT INTO oiewp_posts (
	post_id,
	articleUUID,
	post_author,
	post_keywords,
	post_source,
	post_date,
	post_content,
	post_title,
	post_excerpt,
	post_status,
	comment_status,
	post_modified,
	post_content_filtered,
	post_parent,
	post_type,
	post_mime_type,
	comment_count,
	smeta,
	post_hits,
	post_like,
	islimit,
	istop,
	recommended,
	term_id,
	region_id,
	is_delete,
	parten_id,
	industry_id
)
VALUES
	(
		NULL,
		'',
		'OIEWP网络采集',
		'{\"keyword1\":\"span\",\"keyword2\":\"font\",\"keyword3\":\"size\"}',
		'oiewp平台数据',
		'2017-05-25 09:30:00',
		'${ content}',
		'${ title}',
		'${ title}',
		'0',
		'1',
		'2017-05-25 09:30:00',
		NULL,
		'0',
		NULL,
		'',
		'0',
		NULL,
		'0',
		'0',
		'0',
		'0',
		'0',
		'35',
		NULL,
		'0',
		'6',
		NULL
	)`;

	console.log(_sql)
	return query(_sql)
  }


module.exports = {
    insertData
}

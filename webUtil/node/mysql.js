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


let insertData = function(info) {
	// console.log(info)
	let _sql = `INSERT INTO hangye88.chasj_product (id, productUUID, name, age, fax, 
		homePage, postCode, province, city, mobile, 
		addr, comTel, tel, hasCar, hasHourse, 
		industry, position, company, createAt, updateAt, 
		deleteAt, status) VALUES (NULL, NULL, '${info.contact==undefined ? '':info.contact}', NULL, '${info.fax==undefined ? '':info.fax}', 
			'${info.homePage==undefined ? '':info.homePage}', '${info.postCode==undefined ? '':info.postCode}', '${info.province==undefined ? '':info.province}', '${info.city==undefined ? '':info.city}', '${info.mobile==undefined ? '':info.mobile}'
			,' ${info.addr==undefined ? '':info.addr}', '${info.comTel==undefined ? '':info.comTel}', '${info.tel==undefined ? '':info.tel}', NULL, NULL, 
			'${info.type==undefined ? '':info.type}', NULL, '${info.comName==undefined ? '':info.comName}', NOW(), NULL,
			 NULL, 0);`;

	// console.log(_sql)
	return query(_sql)
  }


module.exports = {
    insertData
}

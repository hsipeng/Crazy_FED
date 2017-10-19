const db = require('./lib/sql.js')

var subject = 'test01'
var titlecate = subject.replace('任务速配—', '').replace('转发：', '').replace('Fw:', '');
let cate = titlecate.indexOf('@') >0 ? titlecate.split('@')[0]:'综合开发'
var title = titlecate.indexOf('@') >0 ?titlecate.split('@')[1]:titlecate
var content = 'test'
var cateId = 0
if (cate == '' || cate == null) {
    cateId = 170
} else {
    db.getCate(cate)
        .then(res => {
            res = JSON.parse(JSON.stringify(res))
            if (res[0].id!=='undefined'&&res[0].id > 0) {
                db.insertData(title, content,res[0].id)
                    .then(res => {
                        var re = JSON.parse(JSON.stringify(res));
                        if (re.affectedRows > 0) {
                            console.log('success: ' + title + ' is inserted.')
                        }
                    }).catch(() => {
                        console.log('error: ' + title + ' is not inserted.')
                    })

            }
        }).catch(() => {
                        console.log('error:  cate' + cate + ' is not exist.')
    })
}

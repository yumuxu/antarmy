var db = require('../dao/dao');

exports.saveBlog=function(req,res){
	var obj = new Object();
	obj.title = req.body.title;
	obj.content = req.body.content;
	
	db.saveBlog(obj,function(err){
		if (err){
			res.end('save fail!');
		}else{
			res.end('save success!');
		}
	});
}

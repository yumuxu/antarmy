var db = require('../dao/dao');

exports.register = function(req,res,next){
	var obj = new Object();
	obj.usrname = req.body.usrname;
	obj.password = req.body.password;
	
	db.saveUsrpwd(obj,function(err){
		if (err){
			res.end("register fail!");
		}else{
			res.end("register success!");
		}
	});
};

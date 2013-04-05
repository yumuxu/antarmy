var db = require("../dao/dao");
var auth = require("./authContr.js");
exports.authLogin = function(req,res,next){
	var t_name = req.body.usrname;
	var t_pwd  = req.body.password;
	db.getPwd({usrname:t_name},function(err,doc){
		if (err)
			console.log(err);
		else{
			if (t_pwd === doc.password){
				auth.gen_session({username:t_name,password:t_pwd},res);
				res.redirect('recommend-list');
			}else{
				res.redirect('/');
			}
		}
	});
}

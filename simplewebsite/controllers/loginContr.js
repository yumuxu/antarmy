var db = require("../dao/dao");

exports.authLogin = function(req,res,next){
	var t_name = req.body.usrname;
	var t_pwd  = req.body.password;
	db.getPwd({usrname:t_name},function(err,doc){
		if (err)
			console.log(err);
		else{
			if (t_pwd === doc.password){
				res.redirect('post-new');
			}else{
				res.redirect('/');
			}
		}
	});
}

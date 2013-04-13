var crypto = require("crypto");
var config = require("../configure");
var db = require("../dao/dao.js");
function encrypto(str,secret){
	var cipher = crypto.createCipher('aes192',secret);
	var enc = cipher.update(str,'utf8','hex');
	enc += cipher.final('hex');
	return enc;
}

function decrypto(str,secret){
	var decipher = crypto.createDecipher("aes192",secret);
	var dec = decipher.update(str,'hex','utf8');
	dec += decipher.final('utf8');
	
	return dec;
}

exports.gen_session = function(user,res){
	//var auth_token = encrypto(user.username + '\t'+user.password,config.session_secret);
	var auth_token = user.username+"\t"+user.password;
	res.cookie(config.auth_cookie_name,auth_token,{path:'/',maxAge:1000*60*60*24});
}

exports.auth = function(req,res,next){
	console.log(req.cookies);
	var auth_token = "";
	if (typeof(req.cookies)!=="undefined"&&
		typeof(auth_token=req.cookies[config.auth_cookie_name])!=="undefined"){
		auth_token = auth_token.split("\t");
		console.log(auth_token);
		db.getPwd({usrname:auth_token[0]},function(err,doc){
		//	console.log(doc.password);
			if (auth_token[1] === doc.password){
				next();
			}else{
				res.redirect("/");
			}
		});
	}else{
		res.redirect("/");
	}
}

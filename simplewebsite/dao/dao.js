var util = require("util");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var dbstr = require("../configure").db;

//用户模式
var userschema = new Schema({
	usrname:String
   ,password:String
});
//blog 模式
var blogschema = new Schema({
	title:String
	,content:String
});

var Usrmodel = mongoose.model('user',userschema,'user');

var Blogmodel = mongoose.model('blog',blogschema,'blog');

exports.connect = function(callback){
	mongoose.connect(dbstr);
}

exports.disconnect = function(callback){
	mongoose.disconnect(callback);
}

exports.getPwd = function(obj,callback){
	Usrmodel.findOne(obj,'password',function(err,adv){
		if (err){
			util.log('fATAL'+rrr);
			callback(err,null);
		}
		callback(null,adv);
	});
}
exports.saveUsrpwd = function(obj,callback){
	var newUsr = new Usrmodel();
	newUsr.usrname = obj.usrname;
	newUsr.password = obj.password;
    newUsr.save(function(err){
		if (err){
			util.log("FATAL:"+err);
			callback(err);
		}else{
			callback(null);
		}
	});
}

exports.saveBlog = function(obj,callback){
	var newBlog = new Blogmodel();
	newBlog.title = obj.title;
	newBlog.content = obj.content;
	
	newBlog.save(function(err){
		if (err){
			util.log('FATAL:'+err);
			callback(err);
		}else{
			callback(null);
		}
	});
}

/*
console.log('xxx');
mongoose.connect(dbstr);
Usrmodel.findOne({usrname:'admin'},function(err,adv){
	console.log('ddd');
	console.log(err);
	console.log(adv);
});
*/

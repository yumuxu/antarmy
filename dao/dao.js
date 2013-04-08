var util = require("util");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var dbstr = require("../configure").db;

//Appfog
if (process.env.VCAP_SERVICES){
	var env = JSON.parse(process.env.VCAP_SERVICES);
	var mongo = env['mongodb-1.8'][0]['credentials'];
}else{
	var mongo = {
	"hostname":"localhost",
	"port":27017,
	"username":"",
	"password":"",
	"name":"",
	"db":"taotea"
	}
}
var generater_mongo_url = function(obj){
	obj.hostname = (obj.hostname || 'localhost');
	obj.port = (obj.port || 27017);
	obj.db = (obj.db ||'taotea');
	
	if(obj.username && obj.password){
		return "mongodb://"+obj.username + ":" + obj.password+"@"+obj.hostname+":"+obj.port+"/"+obj.db;
	}else{
		return "mongodb://"+obj.hostname+":"+obj.port+"/"+obj.db;
	}
}

var mongourl = generater_mongo_url(mongo);

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
//item 模式
var itemschema = new Schema({
	recommend:String
	,price: Number
	,url:String
	,imgPath:String
	,isRecom:String
});

var Usrmodel = mongoose.model('user',userschema,'user');

var Blogmodel = mongoose.model('blog',blogschema,'blog');

var Itemmodel = mongoose.model('item',itemschema,'item');

exports.connect = function(callback){
	mongoose.connect(mongourl);
}

exports.disconnect = function(callback){
	mongoose.disconnect(callback);
}

exports.findItems = function(cond,opti,callback){
	Itemmodel.find(cond,null,opti,function(err,docs){
		if(err) throw err;
		callback(docs);
	});
}

exports.delItemById = function(id,callback){
	Itemmodel.findByIdAndRemove(id,function(err){
		if(err) throw err;
		callback();
	});
}

exports.updateItem = function(cond,obj,callback){
	Itemmodel.findOneAndUpdate(cond,{$set:{recommend:obj.recommend,price:obj.price,imgPath:obj.imgPath,isRecom:obj.isRecom,url:obj.url}},function(err){
		if (err) throw err;
		callback();
	});
}

exports.saveItem = function(obj,callback){
	var newItem  = new Itemmodel(obj);
	newItem.save(function(err){
		if (err){
			util.log("FATAL:"+err);
			callback(err);
		}else{
			callback(null);
		}
	});
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

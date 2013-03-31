var express = require("express");
var stylus = require("stylus");
var nib = require("nib");
var dao = require("./dao/dao.js");
var mongoose = require("mongoose");
var control = require("./controllers/loginContr.js");
var regcon = require("./controllers/regiContr.js");
var blogCon = require("./controllers/blogContr.js");
var fs = require("fs");

var app = express();

function compile(str,path){
	return stylus(str)
	   .set('filename',path)
	   .use(nib());
}

dao.connect(function(err){
	if (err)
		throw err;
});

// 2013-03-31 yumuxu 将配置写在configure里
app.configure(function(){
	app.set('views',__dirname+'/views');
    app.set('view engine','jade');
    app.use(express.logger('dev'));
    app.use(stylus.middleware({
		src:__dirname+'/publics',
		compile:compile
	} ));
    app.use(express.bodyParser({uploadDir:"./upload"}));
    app.use(express.static(__dirname+'/publics'));
    app.use(express.favicon(__dirname+'/favicon.ico'));
});

app.get('/',function(req,res){

	res.render('index',{title:'home'});
});
app.post('/login',control.authLogin);
app.post('/register',regcon.register);
app.get('/post-new',function(req,res){
	res.render('post-new');
});
app.post('/post-new',blogCon.saveBlog);
app.get('/recommend-new',function(req,res){
	res.render('recommend-new');
});
app.post("/uploadImg",function(req,res){
	console.log(req.files.uploadImg.name);
    var tmp_path = req.files.uploadImg.path;
	var target_path = "./publics/images/"+req.files.uploadImg.name;
	
	fs.rename(tmp_path,target_path,function(err){
		if (err) throw err;
		
		//删除临时文件
//		fs.unlink("./"+tmp_path,function(err){
//			if (err){
//				console.log(err);
//			}
			res.end("images/"+req.files.uploadImg.name);
//		});
	});
//	res.end(req.files.uploadImg.path.substr(8));
});
app.on('close',function(){
	dao.disconnect(function(err){});
});
app.listen(3000);


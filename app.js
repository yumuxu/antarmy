var express = require("express");
var stylus = require("stylus");
var nib = require("nib");
var dao = require("./dao/dao.js");
var mongoose = require("mongoose");
var control = require("./controllers/loginContr.js");
var regcon = require("./controllers/regiContr.js");
var blogCon = require("./controllers/blogContr.js");
var recomCon = require("./controllers/recommendContr.js");
var auth = require("./controllers/authContr.js");
var log = require("./controllers/logContr.js");
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
	app.use(express.cookieParser());
    app.use(express.static(__dirname+'/publics'));
    app.use(express.favicon(__dirname+'/favicon.ico'));
	app.use(express.errorHandler({dumpException:true}));
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
//----------------------------------------
app.get('/recommend-new',function(req,res){
	var obj = new Object();
	obj.recommend='';
	obj.price = "";
	obj.url="";
	obj.isRecom = 'Y';
	obj.imgPath = "";
	res.render('recommend-new',{recomItem:obj});
});
app.get('/recommend-new/:id',recomCon.getItemByid);
app.post("/uploadImg",recomCon.remImgUpload);

app.post("/uploadField",recomCon.newRecommend);

app.get("/recommend-list",auth.auth,recomCon.getRemList);

app.post("/recommend-del",recomCon.delRecom);

app.get("/act",log.log,function(req,res){
//	var user_agent1 = req.headers['user-agent1'];
	console.log(JSON.stringify(req.headers) + "------"+req.path);
	res.end('ddddd');
});

app.post("/act",function(req,res){
	console.log(req.headers);
	res.end("qqqq");
});

app.on('close',function(){
	dao.disconnect(function(err){});
});
app.listen(3020);


var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var driverschema = new Schema({
	sid:String,//设备唯一编号 40位
	dt:String,//设备类型  0，未知设备1，IPhone2,IPod,3:Ipad，50：未知的Android,51:Android
	mtype:String,//设备类型
	lang:String,//用户当前语言环境
	net:String,//上网方式 0：未知，1：wifi,2:nowifi,3:3G,4,EDGE
	mac:String,
	osver:String,//固件版本号
	adtid:String,//广告跟踪ID
	token:String,//设备token
	openid:String,//第三方替代
	pid:Number,//产品编号，
	pt:Number,//产品系列-仅用于推送获取证书
	ch:String,//用户下载本产品的渠道编号
	ver:Number//程序版本号，用数值表示
});

var Drivermodel = mongoose.model("driver",driverschema,"driver");

exports.saveDriver = function(obj,callback){
	
	findByMac(obj.mac,function(docs){
		if(docs.length==0){
			var dri = new Drivermodel(obj);
			dri.save(function(err){
				if(err) throw err;
				callback(null);
			});		
		}else{
			Drivermodel.update({mac:obj.mac},obj,function(err,n){
				if (err) throw err;
				callback(null);
			});
		}
		
	});
};


function findByMac(p_mac,callback){
	Drivermodel.find({mac:p_mac},function(err,docs){
		if (err) throw err;
		callback(docs);
	});
};

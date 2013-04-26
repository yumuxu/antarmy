var Dri = require("../models/UserManager.js");

exports.parseUseragent = function(agent,callback){
	if (agent){
		agent = agent.substr(1,agent.length-1);
		var buff = new Buffer(agent,'base64');
		agent = buff.toString();
		var agArray = agent.split("&");
		var obj = {};
		for(var i = 0; i < agArray.length; ++i){
			var items = agArray[i].split("=");
			obj[items[0]] = items[1];
		}
		//yumuxu2013-04-25添加一个访问时间
		obj["visittm"] = new Array();
		obj["visittm"].push(new Date());
		Dri.saveDriver(obj,function(){});
		callback(true);
	}else{
		callback(false);
	}
};

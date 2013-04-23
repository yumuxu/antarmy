var Log = require("../models/LogManager.js");

exports.log = function(req,res,next){
	var log = {time:new Date(),
			   user_agent:req.headers["user-agent"],
			   host:req.headers["host"],
 			   path:req.path};
	Log.saveLog(log,function(){
		next();
	});
};

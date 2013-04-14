var Log = require("../models/LogManager.js");

exports.log = function(req,res,next){
	var log = {time:new Date(),
			  headers:req.headers,
			  path:req.path};
	Log.saveLog(log,function(){
		next();
	});
};

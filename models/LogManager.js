var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var logschema = new Schema({
	time:Date,
	user_agent:String,
	host:String,
	path:String
});

var Logmodel = mongoose.model("log",logschema,"log");

exports.saveLog = function(obj,callback){
	var log = new Logmodel(obj);
	log.save(function(err){
		if (err) throw err;
		callback(null);
	});
};

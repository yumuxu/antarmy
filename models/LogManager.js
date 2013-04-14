var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var logschema = new Schema({
	time:Date,
	headers:Object,
	path:String
});

var Logmodel = mongoose.model("log",logschema,"log");

exports.saveLog = function(obj,callback){
	console.log(obj);
	var log = new Logmodel(obj);
	log.save(function(err){
		if (err) throw err;
		callback(null);
	});
};

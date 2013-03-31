var fs = rquire('fs');
var formidable = require('formidable');

exprots.remImgUpload = function(req,res){
	var form = new formidable.IncomingForm();
	
	form.parse(req,function(err,fields,files){
		console.log(files.upload.path);
		res.end('success!');
	});
};

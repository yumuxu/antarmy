var fs = require('fs');
//var formidable = require('formidable');

exports.remImgUpload = function(req,res){
	console.log(req.files.uploadImg.name);
    var tmp_path = req.files.uploadImg.path;
	var target_path = "./publics/images/"+req.files.uploadImg.name;
	
	fs.rename(tmp_path,target_path,function(err){
		if (err) throw err;
		//删除临时文件
		res.end("images/"+req.files.uploadImg.name);
	});
};

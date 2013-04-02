var fs = require('fs');
var db = require("../dao/dao");
//var formidable = require('formidable');

exports.remImgUpload = function(req,res){
	//console.log(req.files.uploadImg.name);
    var tmp_path = req.files.uploadImg.path;
	var target_path = "./publics/images/"+req.files.uploadImg.name;
	
	fs.rename(tmp_path,target_path,function(err){
		if (err) throw err;
		//删除临时文件
		res.end("images/"+req.files.uploadImg.name);
	});
};

//yumux 2013-04-02 保存其他阈值
exports.remFieldUpload = function(req, res){
	var obj = new Object();
	obj.recommend = req.body.txtRecom;
	obj.price = req.body.txtPrice;
	obj.url = req.body.txtUrl;
	obj.imgPath = req.body.hdImgPath;

	db.saveItem(obj,function(err){
		if (err) throw err;
		res.redirect("/recommend-list");
	});
}

//yumux 2013-04-02 获取前十的推荐列表
exports.getRemList = function(req,res){
	db.findItems(null,{limit:10},function(docs){
    	res.render("recommend-list",{recomList:docs});		
	});

}

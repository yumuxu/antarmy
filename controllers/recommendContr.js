var fs = require('fs');
var db = require("../dao/dao");

exports.getItemByid = function(req,res){
	db.findItems({"_id":req.params.id},null,function(docs){
		res.render("recommend-new",{recomItem:docs[0]});
	});
};

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

function makeItem(req){
	var obj = new Object();
	obj.recommend = req.body.txtRecom;
	obj.price = req.body.txtPrice;
	obj.url = req.body.txtUrl;
	obj.imgPath = req.body.hdImgPath;
	obj.isRecom = req.body.selIsRecom;
	
	return obj;
}

//yumux 2013-04-04 判断是更新还是添加
exports.newRecommend = function(req,res){
	if (req.body.hdID == ""){
		remFieldUpload(req,res);
	}else{
		updateRecom(req,res);
	}
}

exports.delRecom = function(req,res){
	console.log(req.body.id);
	db.delItemById(req.body.id,function(){
		res.end("OK");
	});
}

//yumuxu 2013-04-04 更新值
function updateRecom(req,res){
	var obj = makeItem(req);
	db.updateItem({_id:req.body.hdID},obj,function(){
		res.redirect("/recommend-list");
	});
}

//yumux 2013-04-02 保存其他阈值
function remFieldUpload(req, res){
	var obj = makeItem(req);
	console.log(req.params.id);
	db.saveItem(obj,function(err){
		if (err) throw err;
		res.redirect("/recommend-list");
	});
}

//yumux 2013-04-02 获取前十的推荐列表
exports.getRemList = function(req,res){
	db.findItems(null,{},function(docs){
    	res.render("recommend-list",{recomList:docs});		
	});

}

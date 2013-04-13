$(document).ready(function(){
	if ($("#imgMain").attr("src")=="/"){
		$("#imgMain").hide();
    }
	$("#formImg").ajaxForm(function(data,status){
		$("#imgMain").attr("src",data);
		$("#imgMain").show();
		$("#hdImgPath").attr("value",data);
	});
});

$(document).ready(function(){
	$(".editImg").click(function(){
		var t_id = $(this).parent().parent().attr("value");
		location.href='recommend-new/'+t_id;
	});
	$(".delImg").click(function(){
		var t_id  = $(this).parent().parent().attr("value");
		$.post("/recommend-del",{id:t_id},function(data){
			if(data == "OK")
				location.href='recommend-list';
			else
				alert(data);
		});
	});
});

(function(){
    $('.tabscontent').hide();
	$('.tabscontent').eq(0).show();
    $('#tabheader div').click(function(){
		$('#tabheader div').removeClass("curtabs")
			.addClass("tabs");
		$(this).removeClass("tabs")
			.addClass("curtabs");
		var index = $(this).attr('index');
		$(".tabscontent").not($("#content"+index)).hide();
		$("#content"+index).show();
	});
})();

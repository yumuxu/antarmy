var myEditor = new YAHOO.widget.Editor('editor',{
	animate:true,
	width:'100%',
    height:'500px'
});
myEditor.render();

$('#btnSave').click(function(){
	myEditor.saveHTML();
	var html = myEditor.get('element').value;
	var title = $('#iptTitle').val();
	$.post('/post-new',{title:title,content:html},function(data,statu){
		alert(data);
	})
});

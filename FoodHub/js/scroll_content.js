$(function(){
	var list_show = 3;
	var row_show = 2;

	var li_list = $('#project_list ul li');
	var list_height = li_list.height();
	
	li_list.slice(list_show * row_show, li_list.length).hide();

	$(window).scroll(function() {
		var show_num = parseInt($(window).scrollTop() / list_height) + row_show;
		li_list.slice(1, show_num * list_show).delay(600).fadeIn(800);
	});	
});
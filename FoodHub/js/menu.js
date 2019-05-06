$(function(){

	var menu = $("header.mobile nav");
	var toggle = $("header.mobile .nav_toggle");
	
	menu.hide();
	
	
	toggle.click(function(){
		menu.fadeIn(200);
	});
	menu.click(function(){
		menu.fadeOut(200);
	});
	
	$(document).ready(function(){       
    	var scroll_position = 0;
    	var window_height = $(window).height();
    	var window_width = 	$(window).width();
    	//768
            $(document).scroll(function() { 
                scroll_position = $(this).scrollTop();
                if ( window_width <= 1024 && window_width > 768){
	                if( scroll_position < window_height *1.4 ) {
	                    $("#background").removeClass();
	                } else if( window_height *1.4 <= scroll_position && scroll_position < window_height *2.3) {
	                    $("#background").removeClass().addClass('bg2');
	                } else if( window_height *2.3 <= scroll_position && scroll_position < window_height *3.2) {
	                    $("#background").removeClass().addClass('bg3');
	                } else if( window_height *3.2 <= scroll_position && scroll_position < window_height *4) {
	                    $("#background").removeClass().addClass('bg4');
	                }

	            } else if ( window_width <= 768 && window_width > 425){
	                if( scroll_position < window_height *1.4 ) {
	                    $("#background").removeClass();
	                } else if( window_height *1.4 <= scroll_position && scroll_position < window_height *2.3) {
	                    $("#background").removeClass().addClass('bg2');
	                } else if( window_height *2.3 <= scroll_position && scroll_position < window_height *3.2) {
	                    $("#background").removeClass().addClass('bg3');
	                } else if( window_height *3.2 <= scroll_position && scroll_position < window_height *4) {
	                    $("#background").removeClass().addClass('bg4');
	                }


	            } else if ( window_width <= 425 && window_width > 376){
	                if( scroll_position < window_height *1.4 ) {
	                    $("#background").removeClass();
	                } else if( window_height *1.4 <= scroll_position && scroll_position < window_height *2.3) {
	                    $("#background").removeClass().addClass('bg2');
	                } else if( window_height *2.3 <= scroll_position && scroll_position < window_height *3.2) {
	                    $("#background").removeClass().addClass('bg3');
	                } else if( window_height *3.2 <= scroll_position && scroll_position < window_height *4) {
	                    $("#background").removeClass().addClass('bg4');
	                }

	            } else if ( window_width <= 375 && window_width > 321){
	                if( scroll_position < window_height *1.3 ) {
	                    $("#background").removeClass();
	                } else if( window_height *1.3 <= scroll_position && scroll_position < window_height *2.3) {
	                    $("#background").removeClass().addClass('bg2');
	                } else if( window_height *2.3 <= scroll_position && scroll_position < window_height *3.6) {
	                    $("#background").removeClass().addClass('bg3')
	                } else if( window_height *3.6 <= scroll_position && scroll_position < window_height *4.3) {
	                    $("#background").removeClass().addClass('bg4');
	                }

	            } else if ( window_width <= 320){
	                if( scroll_position < window_height *1.4 ) {
	                    $("#background").removeClass();
	                } else if( window_height *1.4 <= scroll_position && scroll_position < window_height *2.3) {
	                    $("#background").removeClass().addClass('bg2');
	                } else if( window_height *2.3 <= scroll_position && scroll_position < window_height *3.2) {
	                    $("#background").removeClass().addClass('bg3');
	                } else if( window_height *3.2 <= scroll_position && scroll_position < window_height *4) {
	                    $("#background").removeClass().addClass('bg4');
	                }

	            }    	
        	});
    });  
           
});
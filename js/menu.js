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

	$('.mail a').hover(
	    function() {
	        var $this = $(this); // caching $(this)
	        $this.data('manpingchen@gmail.com', $this.text());
	        $this.text("Drop me a mail ㋡");
	    },
	    function() {
	        var $this = $(this); // caching $(this)
	        $this.text($this.data('manpingchen@gmail.com'));
	    }
	);
	
	$(document).ready(function(){       
    	var scroll_position = 0;
    	var window_height = $(window).height();
    	var window_width = 	$(window).width();
    	//768
            $(document).scroll(function() { 
                scroll_position = $(this).scrollTop();
                if ( window_width >= 1024 ){
	                if( scroll_position < window_height *0.4 ) {
	                    $("#main_film").removeClass();
	                    //$("#home_service .work_wrap").removeClass('hide').addClass('show');
	                    //$("#home_website .work_wrap").removeClass('hide').addClass('show');
	                } else if( window_height *0.2 <= scroll_position && window_height *0.9 >= scroll_position) {
	                    $("#main_film").removeClass().addClass('hide');
	                    //$("#home_service .work_wrap").removeClass('hide').addClass('show');
	                    //$("#home_service .work_wrap").animate({ "right": "calc( 100% / 3)" }, 1000);
	                } else if( window_height *0.9 < scroll_position) {
	                    //$("#home_webbsite .work_wrap").removeClass('show').addClass('hide');
	                    //$("#home_website .work_wrap").animate({ "left": "calc( 100% / 3)" }, 1000);
	                } 

	            }    	
        	});
    });  

    // Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });
         

});
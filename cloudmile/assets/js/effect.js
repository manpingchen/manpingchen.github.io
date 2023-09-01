$(function () {
    // $('nav ul').find('li').each(function () {
    //     var currentNav = $(this).attr('data-sec'),
    //         Nav = '#' + currentNav;
    //     if (hash == Nav) {
    //         $('nav ul li[data-sec="' + currentNav + '"]').find('a').addClass('current')
    //     } else if (hash == ''){
    //         $('nav ul li[data-sec="index"]').find('a').addClass('current')
    //     }
    // });

    $('body').on('click touch', 'a.aniscroll', function (e) {
        e.preventDefault();

        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top,
            url = window.location.pathname,
            hash = window.location.hash;
        
        $(this).addClass('current').parent("li").siblings().find('a').removeClass('current');
        $('html, body').stop().animate({
            scrollTop: offsetTop - $('header').height()
        }, 850);
    });

    $("body").on('click touch', '.tab a', function (e) {
        e.preventDefault();
        var tab = $(this).attr("data-tab");
    
        $(".wrap-idols").removeClass("show");
        $(".tab a").removeClass("current");
        $(".wrap-idols[data-tab-id="+ tab+"]").addClass("show");
        $(this).addClass("current");
    })

    $('body').on('click touch', '.openNav',function(){
        $('nav.navbar').toggleClass('open');
        
        if ($(window).width() <= 768) {
            $('.navbar ul').find('li').each(function(){
                $(this).find('a').click(function () {
                    $('nav.navbar').removeClass('open')
                })
            })
        }
    });
})

$(window).load(function () {
    $('body').on('click touch', '.overlay-control', function (e) {
        e.preventDefault();
        var targetID = $(this).attr('data-overlay-target');

        // $("#" + targetID).css("display", "flex");
        $("#" + targetID).addClass('open');
        $('body').css("overflow", "hidden");
    })
})

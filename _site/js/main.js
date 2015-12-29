$(document).ready(function(){
  $(".button-collapse").sideNav();
  $('.scrollspy').scrollSpy();

  $(window).scroll(function(e){
    //Table of contents scroll effect
    var $el = $('.toc-wrapper');
    var isPositionFixed = ($el.css('position') == 'fixed');
    if ($(this).scrollTop() > 100 && !isPositionFixed){
      $el.css({'position': 'fixed', 'top': '0px'});
    }
    if ($(this).scrollTop() < 100 && isPositionFixed)
    {
      $el.css({'position': 'absolute', 'top': '100px'});
    }

    //Scroll to top button
    if ( $(window).scrollTop() > 300 ) {
  		$('a.back-to-top').fadeIn('slow');
  	} else {
  		$('a.back-to-top').fadeOut('slow');
  	}
  });

  $('a.back-to-top').click(function() {
  	$('html, body').animate({
  		scrollTop: 0
  	}, 700);
  	return false;
  });

  $(".gotoPost").on('click', function() {
    window.location.href = $(this).find('.postLink').attr('href');
  });

});

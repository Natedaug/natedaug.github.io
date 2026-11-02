$(document).ready(function(){
  $(".button-collapse").sideNav();
  $('.scrollspy').scrollSpy();
  var $archive = $('.toc-wrapper');
  function updateArchivePosition() {
    $archive.toggleClass('toc-fixed', $(window).scrollTop() > 100);
  }

  updateArchivePosition();

  $(window).scroll(function(e){
    updateArchivePosition();

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

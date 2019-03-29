var $ = require('jquery');
 
$(window).on('load', function(){
	// page loding animation
	$('.js-overlay').addClass('is-hide');

	// thumb pick
	var $pickThumb = $('.js-pick-thumb');
	$pickThumb.on('click', function(){
		var thumb = $(this).attr('src');
		$('.js-pick-panel').attr('src', thumb);

		$pickThumb.removeClass('is-active');
		$(this).addClass('is-active');
		
		return false;
	});

	// pagetop
	var $pageTopBtn = $('.js-pagetop-btn');
	$pageTopBtn.on('click', function(){
		$('html, body').animate({scrollTop: 0}, 200);
		return false;
	});
});
var $ = require('jquery');
 
$(function(){
	// thumb pick
	var $pickThumb = $('.js-pick-thumb');
	$pickThumb.on('click', function(){
		var num = $(this).data('thumb-num');
		$('.js-pick-panel').attr('src', 'http://satyr.io/600x600/'+num);
	});

	// pagetop
	var $pageTopBtn = $('.js-pagetop-btn');
	$pageTopBtn.on('click', function(){
		$('html, body').animate({'scrollTop': 0})
	});
});
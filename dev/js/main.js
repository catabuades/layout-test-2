// Browser detection for when you get desparate. A measure of last resort.
// http://rog.ie/post/9089341529/html5boilerplatejs

// var b = document.documentElement;
// b.setAttribute('data-useragent',  navigator.userAgent);
// b.setAttribute('data-platform', navigator.platform);

// sample CSS: html[data-useragent*='Chrome/13.0'] { ... }


// remap jQuery to $
(function ($) {

	/* trigger when page is ready */
	$(document).ready(function (){

		//SLICK SLIDER HOME
		// $('.separator-image').slick({
	 //        slidesToShow: 1,
	 //        swipeToSlide: false,
	 //        arrows: false
	 //    });

	    $('.separator-image').slick({
	    	arrows: false,
	    	autoplay: true,
  			autoplaySpeed: 10000,
  			slidesToShow: 1,
  			slidesToScroll: 1,
  			swipeToSlide: true,
  			fade: true,
  			cssEase: 'linear',
  			infinite: true
	    });
	});

}(window.jQuery || window.$));
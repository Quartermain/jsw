'use strict';

var jsw = {
	init: function(){

		if($(".hero-banner").length) 		{
			jsw.heroBanner.init('.hero-banner .owl-carousel', ".hero-banner .dots-container");
		}
	},

	heroBanner: {
		init: function(tagert, dotsID, enableNav) {
			'use strict';
			var	dotsOpt = dotsID;
			var	navOpt = enableNav;

			if(navOpt !== undefined && navOpt !== false) {
				navOpt = true;
			} else {
				navOpt = false;
			}

			if(dotsOpt === undefined && dotsOpt === false) {
				dotsOpt = false;
			}

			$(tagert).owlCarousel({
				items: 1,
			    margin: 0,
			    dots: true,
			    dotsContainer: dotsOpt,
			    responsiveClass: true
			});
		}
	}
}

$(document).ready(function(){
	'use strict';
	jsw.init();
});

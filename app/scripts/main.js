'use strict';

var jsw = {
    init: function () {

        if ($(".hero-banner").length) {
            jsw.heroBanner.init('.hero-banner .owl-carousel', ".hero-banner .dots-container");
            jsw.heroBanner.init('.sliderBanner .owl-carousel');
            jsw.heroBanner.init('.sliderPartner .owl-carousel');
        }
        jsw.videoPopup();
        jsw.scrollDown();
        jsw.scrollTop();
        jsw.backgroundVideo();
    },

    heroBanner: {
        init: function (tagert, dotsID, enableNav) {
            'use strict';
            var dotsOpt = dotsID;
            var navOpt = enableNav;

            if (navOpt !== undefined && navOpt !== false) {
                navOpt = true;
            } else {
                navOpt = false;
            }

            if (dotsOpt === undefined && dotsOpt === false) {
                dotsOpt = false;
            }

            var slider = $(tagert).owlCarousel({
                items: 1,
                margin: 0,
                nav: navOpt,
                dots: true,
                dotsContainer: dotsOpt,
                responsiveClass: true
            });

            if ($(tagert).siblings('.carousel-nav').length) {
                $(tagert).siblings('.carousel-nav').find('.prev').on('click', function () {
                    slider.trigger('prev.owl.carousel');
                });
                $(tagert).siblings('.carousel-nav').find('.next').on('click', function () {
                    slider.trigger('next.owl.carousel');
                });
            }

            if ($(tagert).find('.item-nav').length) {
                $(tagert).find('.item-nav.prev-slide').on('click', function () {
                    slider.trigger('prev.owl.carousel');
                });
                $(tagert).find('.item-nav.next-slide').on('click', function () {
                    slider.trigger('next.owl.carousel');
                });
            }

        }
    },

    videoPopup: function () {
        $('.fancybox-video').fancybox({
            openEffect: 'none',
            closeEffect: 'none',
            helpers: {
                media: {}
            }
        });
    },

    scrollDown: function () {
        $('.btn-scroll-down a').on('click', function () {
            var parentPos = $(this).closest('.btn-scroll-down').parent().offset().top;
            var parentHeight = $(this).closest('.btn-scroll-down').parent().height();
            $('html,body').animate({scrollTop: parentHeight + parentPos}, 1000);
        });
    },

    scrollTop: function () {
        $('.btn-scroll-up a').on('click', function () {
            $('html,body').animate({scrollTop: 0}, 2000);
        });
    },

    backgroundVideo: function () {
        $('#bgVideo').YTPlayer({
            fitToBackground: true,
            videoId: 'FG0fTKAqZ5g'
        });
    },

}

$(document).ready(function () {
    jsw.init();
});

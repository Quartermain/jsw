'use strict';

(function ($, sr) {
    var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced() {
            var obj = this, args = arguments;

            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };
            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 100);
        };
    }
    // smartresize
    jQuery.fn[sr] = function (fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
})(jQuery, 'smartresize');

//=======================================================================================================================
var jsw;
jsw = {
    init: function () {

        var WidthWindow = $(window).width();
        var HeightWindow = $(window).height();

        if ($(".hero-banner").length) {
            jsw.heroBanner.init('.hero-banner .owl-carousel', ".hero-banner .dots-container");
            jsw.heroBanner.init('.sliderBanner .owl-carousel');
            jsw.heroBanner.init('.sliderPartner .owl-carousel');
        }
        jsw.videoPopup();
        jsw.scrollDown();
        jsw.scrollTop();
        jsw.backgroundVideo();
        jsw.hasSubMenu();

        jsw.sameHeight('.block-same-height');

        jsw.btnHamburger();
        jsw.hasSubmenu();
        jsw.sameHeightMenuTop();

        //show search when click
        jsw.showSearchMenu();

        //Campain Height
        jsw.campainHeight();


    },

    setSameHeightFn: function (target) {
        var heights = $(target).map(function () {
                $(this).height("100%");
                return $(this).height();
            }).get(),
            maxHeight = Math.max.apply(null, heights);
        $(target).height(maxHeight);
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
                loop: true,
                autoplay: true,
                autoplayTimeout: 5000,
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
            fitToBackground: false,
            videoId: 'FG0fTKAqZ5g',
            pauseOnScroll: true,
            playerVars: {
                modestbranding: 1,
                autoplay: 0,
                controls: 0,
                showinfo: 0,
                wmode: 'transparent',
                branding: 0,
                rel: 0,
                autohide: 0,
                origin: window.location.origin,
                start: 20,
            },
        });
    },

    hasSubMenu: function () {
        if ($('.main-menu-left .title-link').length) {
            $('.main-menu-left .title-link').each(function () {
                if ($(this).siblings('.sub-menu').length) {
                    $(this).parent().addClass('has-submenu');
                }
                ;
            });
        };
    },

    sameHeight: function (target, disOnMobile) {
        function sameHeightInit() {
            if ($(target).length) {
                if (disOnMobile !== undefined && disOnMobile !== false) {
                    $(target).height('auto');
                    jsw.setSameHeightFn(target);
                } else {
                    if ($(window).width() >= 768) {
                        $(target).height('auto');
                        jsw.setSameHeightFn(target);
                    } else {
                        $(target).height('auto');
                    }
                }
            }
        }

        sameHeightInit();

        $(window).smartresize(function () {
            sameHeightInit();
        });

    },

    sameHeightMenuTop: function () {
        function setMnSameHeight() {
            if ($(window).width() >= 992) {
                var heightRightMenu = $(".main-menu-right .sub-menu .left-block").outerHeight();
                $(".main-menu-right .sub-menu .right-block").css("height", heightRightMenu);
            }
        }

        setMnSameHeight();
    },

    hasSubmenu: function () {
        $(".has-submenu .title-link").on("click", function () {
            if ($(window).width() < 992) {
                $(this).next(".sub-menu").toggleClass("block-sub-menu");
                $(this).toggleClass("active-submenu");
                $(this).find("i").toggleClass("fa-arrow-right").toggleClass("fa-arrow-down");
            }
        });
    },

    btnHamburger: function () {
        $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function () {
            $(this).toggleClass('open');
            $(".menu-container").toggleClass("block-sub-menu");
        });
    },

    showSearchMenu: function () {
        var wRightMenu = $(".mobile-header .menu-right").width();
        $(".search-animation .box-search").css("max-width", wRightMenu);

        $(".search-animation .btn-search").on("click", function () {
            $(".search-animation .box-search").toggleClass("show");
        });
    },

    campainHeight: function () {
        function setHMenuTop () {
            setTimeout(function(){
                var heightMenu = $(".container-menu-top").outerHeight();
                $(".main-container").css("margin-top", heightMenu);
            }, 200);
        }

        setHMenuTop();
        $(window).smartresize(function () {
            setHMenuTop();
        });
    },

};

$(document).ready(function () {
    jsw.init();
});

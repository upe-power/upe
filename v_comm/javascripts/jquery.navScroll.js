;(function ($) {
    $.fn.navScroll = function (options) {
        var settings = $.extend({
            menuSelector      : '#divMenu ul',
            arrowLeftSelector : '#divArrowLeft',
            arrowRightSelector: '#divArrowRight',
            leftOffset        : 0,
            rightOffset       : 0
        }, options);
        
        return this.each(function () {
            var tim;
            var $nav        = $(this);
            var $menu       = $(settings.menuSelector);
            var $arrowLeft  = $(settings.arrowLeftSelector);
            var $arrowRight = $(settings.arrowRightSelector);
            
            $arrowLeft.hover(mLeft, mStop).click(oLeft);
            $arrowRight.hover(mRight, mStop).click(oRight);
            
            function mStop() {
                clearTimeout(tim);
            }
            
            function mLeft() {
                var maxX = $arrowLeft.width() + settings.leftOffset;
                var x    = $menu.position().left;
                if (x < maxX) {
                    var deltaX = Math.min(maxX, x + 4);
                    $menu.stop(false, true).animate({left: deltaX}, 5);
                    tim = setTimeout(mLeft, 6);
                }
            }
            
            function mRight() {
                var minX = (0 - ($menu.width() - $nav.width()) - $arrowRight.width()) + settings.rightOffset;
                var x    = $menu.position().left;
                if (x > minX) {
                    var deltaX = Math.max(minX, x - 4);
                    $menu.stop(false, true).animate({left: deltaX}, 5);
                    tim = setTimeout(mRight, 6);
                }
            }
            
            function oLeft() {
                var maxX = $arrowLeft.width() + settings.leftOffset;
                var x    = $menu.position().left;
                if (x < maxX) {
                    mStop();
                    $menu.stop(false, true).animate({left: Math.min(maxX, x + 150)}, 400);
                }
            }
            
            function oRight() {
                var minX = (0 - ($menu.width() - $nav.width()) - $arrowRight.width()) + settings.rightOffset;
                var x    = $menu.position().left;
                if (x > minX) {
                    mStop();
                    $menu.stop(false, true).animate({left: Math.max(minX, x - 150)}, 400);
                }
            }
        });
    };
})(jQuery);
// JavaScript Document

/* scrollfix 選單至頂
========================================================*/
jQuery(document).ready(function() {
$('.top_header_page').scrollFix();
$('.header').scrollFix();
});


/* 首頁圖文展示
========================================================*/
/**Core script to handle the entire theme and core functions**/

var App = function() {

    // IE mode
    var isRTL = false;
    var isIE9 = false;
    var isIE10 = false;
    var isIE = false;

    var resizeHandlers = [];

    // initializes main settings
    var handleInit = function() {
        isIE9 = !!navigator.userAgent.match(/MSIE 9.0/);
        isIE10 = !!navigator.userAgent.match(/MSIE 10.0/);        
        isIE = navigator.userAgent.indexOf("MSIE ") > -1 || navigator.userAgent.indexOf("Trident/") > -1;

        if (isIE10) {
            $('html').addClass('ie10'); // detect IE10 version
        }

        if (isIE9) {
            $('html').addClass('ie9'); // detect IE10 version
        }

        if (isIE) {
            $('html').addClass('ie'); // detect IE10 version
        }
    };
	
    // runs callback functions set by Jango.addResponsiveHandler().
    var _runResizeHandlers = function() {
        // reinitialize other subscribed elements
        for (var i = 0; i < resizeHandlers.length; i++) {
            var each = resizeHandlers[i];
            each.call();
        }
    };

    // handle group element heights 圖文高度判斷
    var handleHeight = function() {
       $('[data-auto-height]').each(function() {
            var parent = $(this);
            var items = $('[data-height]', parent);
            var height = 0;
            var mode = parent.attr('data-mode');
            var offset = parseInt(parent.attr('data-offset') ? parent.attr('data-offset') : 0);

            items.each(function() {
                if ($(this).attr('data-height') == "height") {
                    $(this).css('height', '');
                } else {
                    $(this).css('min-height', '');
                }

                var height_ = (mode == 'base-height' ? $(this).outerHeight() : $(this).outerHeight(true));
                if (height_ > height) {
                    height = height_;
                }
            });

            height = height + offset;

            items.each(function() {
                if ($(this).attr('data-height') == "height") {
                    $(this).css('height', height);
                } else {
                    $(this).css('min-height', height);
                }
            });

            if(parent.attr('data-related')) {
                $(parent.attr('data-related')).css('height', parent.height());
            }
       });       
    }

    // handle the layout reinitialization on window resize
    var handleOnResize = function() {
        var resize;
        $(window).resize(function() {
            if (resize) {
                clearTimeout(resize);
            }
            resize = setTimeout(function() {
                _runResizeHandlers();
            }, 50); // wait 50ms until window resize finishes.
        });
    };

    // Handles Bootstrap Tooltips.
    var handleTooltips = function() {
        // global tooltips
        $('.tooltips').tooltip();
    };

    //* END:CORE HANDLERS *//
    return {

        //main function to initiate the theme
        init: function() {
            //IMPORTANT!!!: Do not modify the core handlers call order.

            //Core handlers
            handleHeight();
            this.addResizeHandler(handleHeight); // handle auto calculating height on window resize

            handleInit(); // initialize core variables
            handleOnResize(); // set and handle responsive    

            //UI Component handlers            
            //handleAnimate(); // handle animate

            handleTooltips(); // handle bootstrap tooltips

        },


        //public function to add callback a function which will be called on window resize
        addResizeHandler: function(func) {
            resizeHandlers.push(func);
        },
		
        //public functon to call _runresizeHandlers
        runResizeHandlers: function() {
            _runResizeHandlers();
        },
		
        // To get the correct viewport width based on  http://andylangton.co.uk/articles/javascript/get-viewport-size-javascript/
        getViewPort: function() {
            var e = window,
                a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body;
            }

            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        },
		
        // responsive breakpoints
        getBreakpoint: function(size) {
            // bootstrap responsive breakpoints
            var sizes = {
                'xs': 480, // extra small
                'sm': 768, // small
                'md': 992, // medium
                'lg': 1200 // large
            };

            return sizes[size] ? sizes[size] : 0;
        }

        
    };

}();


// Main theme initialization
$(document).ready(function () {



});
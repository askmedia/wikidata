// ZOOM 

jQuery(document).ready(function() {
    var size, ratio, default_size;
    default_size = 1200;
    size = Math.min(jQuery(window).height(), jQuery(window).width());
    ratio = (size * 100) / default_size;
    ratio = 100 - ratio;
    console.log(ratio);

    // jQuery('.range').each(function(i) {
    //     jQuery(this).css({
    //         height: ((jQuery(this).height() * ratio) / 100) + 15
    //     });
    //     jQuery(this).find('.range-legend').css({
    //         height: (jQuery(this).find('.range-legend').height() * ratio) / 100,
    //         'margin-left': -(((jQuery(this).find('.range-legend').width() * ratio) / 100) / 2),
    //         width: (jQuery(this).find('.range-legend').width() * ratio) / 100
    //     });
    // });

    jQuery('.range-1').css({
        height: ((jQuery('.range-1').height() * ratio) / 100) + 15
    });
    jQuery('.range-legend--1').css({
        height: (jQuery('.range-legend--1').height() * ratio) / 100,
        'margin-left': -(((jQuery('.range-legend--1').width() * ratio) / 100) / 2),
        width: (jQuery('.range-legend--1').width() * ratio) / 100
    });

    jQuery('.range-2').css({
        height: ((jQuery('.range-2').height() * ratio) / 100) + 15
    });
    jQuery('.range-legend--2').css({
        height: (jQuery('.range-legend--2').height() * ratio) / 100,
        'margin-left': -(((jQuery('.range-legend--2').width() * ratio) / 100) / 2),
        width: (jQuery('.range-legend--2').width() * ratio) / 100
    });

    jQuery('.range-3').css({
        height: ((jQuery('.range-3').height() * ratio) / 100) + 15
    });
    jQuery('.range-legend--3').css({
        height: (jQuery('.range-legend--3').height() * ratio) / 100,
        'margin-left': -(((jQuery('.range-legend--3').width() * ratio) / 100) / 2),
        width: (jQuery('.range-legend--3').width() * ratio) / 100
    });

    jQuery('.range-4').css({
        height: ((jQuery('.range-4').height() * ratio) / 100) + 15
    });
    jQuery('.range-legend--4').css({
        height: (jQuery('.range-legend--4').height() * ratio) / 100,
        'margin-left': -(((jQuery('.range-legend--4').width() * ratio) / 100) / 2),
        width: (jQuery('.range-legend--4').width() * ratio) / 100
    });
    jQuery('.wrapper__graph__body').css({
        height: size,
        width: size
    });

    jQuery('a.swinxylens').swinxyzoom({
        mode: 'lens',
        size: '100%',
        damping: 10,
        zoom: 13,
        controls: false,
        lens: {
            width: 300,
            height: 300
        }
    });

    jQuery('.see-more').on('click', function() {
        var _this, _see_more_body;
        _this = jQuery(this);
        _see_more_body = jQuery('.see-more__body');

        _this.toggleClass('active');
        if (_this.hasClass('active')) {
            _see_more_body.show('slow', function() {
                jQuery('.wrapper__graph_left').addClass('active');
            });
        } else {
            jQuery('.wrapper__graph_left').removeClass('active');
            _see_more_body.hide('slow');
        }
    });

    jQuery('.bt-explore').on('click', function() {
        jQuery('.wrapper__intro').fadeOut('slow', function() {
            jQuery('.wrapper__graph').fadeIn();
        });
    });

    var big_Img = "images/what_is_Wikipedia_about-8000.jpg";
    jQuery('<img src="' + big_Img + '">').load(function() {
        jQuery('.loader').fadeOut('slow', function() {
            jQuery('.bt-explore').fadeIn();
        });
    });
});
"use strict";

jQuery(document).ready(function() {

    var size, ratio, default_size;
    var screenWidth = jQuery(window).width();
    var screenHeight = jQuery(window).height();
    if (screenWidth < 1280)
        screenHeight -= 127;
    size = Math.min(screenHeight, screenWidth);

    /*
    default_size = 1200;
    ratio = (size * 100) / default_size;
    ratio = 100 - ratio;

    console.log(ratio);
    */

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

    /*
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
*/

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

    setTimeout(function() {
        var base_width = 1200;

        var human_value = 2424305;
        var human_width = 223;
        var human_radius = human_width / 2;
        var human_area = human_radius * Math.PI * Math.PI;

        var legendRatio = human_value / human_area;

        console.log('human_value', human_value);
        console.log('human_area', human_area);
        console.log('ratio : ', legendRatio);

        var x = 100;

        var legends = {
            1: 47000,
            2: 100000,
            3: 1000000,
            4: 2400000
        };
        console.log(legends);
        for (var i in legends) {

            var range_value = legends[i];
            var range_area = range_value / legendRatio;
            var range_radius = range_area / Math.PI / Math.PI;
            var range_width = range_radius * 2;

            var $img = jQuery(".sxy-zoom-bg");

            var imgRatio = size / 1200;

            jQuery('.range-' + i + ' span').text(range_value);

            jQuery('.range-' + i).css({
                height: range_width * imgRatio + 30
            });
            jQuery('.range-legend--' + i).css({
                height: range_width * imgRatio,
                width: range_width * imgRatio,
                'margin-left': -range_width * imgRatio / 2,
                'margin-top': range_width * imgRatio / 2
            });
        }

    }, 1500);

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

    jQuery('.bt-explore').click();

    var big_Img = "images/what_is_Wikipedia_about-8000.jpg";
    jQuery('<img src="' + big_Img + '">').load(function() {
        jQuery('.loader').fadeOut('slow', function() {
            jQuery('.bt-explore').fadeIn();
        });
    });
});
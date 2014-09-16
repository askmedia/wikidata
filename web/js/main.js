// ZOOM 

jQuery(document).ready(function() {
    var size, ratio, default_size;
    default_size = 1200;
    size = Math.min(jQuery(window).height(), jQuery(window).width());
    ratio = (size * 100) / default_size;
    console.log(ratio);
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
            _see_more_body.show('slow');
        } else {
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
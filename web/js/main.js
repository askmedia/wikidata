// ZOOM 

jQuery(document).ready(function() {
    var size = Math.min(jQuery(window).height(), jQuery(window).width());
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
        jQuery(this).toggleClass('active');
        jQuery('.see-more__body').toggleClass('active');
    });

    jQuery('.bt-explore').on('click', function() {
        jQuery('.wrapper__intro').fadeOut('slow', function() {
            jQuery('.wrapper__graph').fadeIn();
        });
    });
});

jQuery(window).load(function() {
    jQuery('.loader').fadeOut('slow', function() {
        jQuery('.bt-explore').fadeIn();
    });
});
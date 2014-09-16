// ZOOM 

jQuery(document).ready(function() {
    var size = Math.min(jQuery(window).height(), jQuery(window).width());
    jQuery('.container').css({
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
});

;(function($, undefined)
{
    var h = 'smartclick', p = 'swinxytouch';
    
    /**
     *
     */
    function SmartClickHelper(tp)
    {
        var
          s = this;

        s.allow = false;

        s._hndClick = function(e)
        {
            if (!s.allow)
             e.preventDefault();
                
            s.allow = false;
        };
        
        s._hndTap = function(e)
        {
            s.allow = true;
            $(e.originalEvent.target).trigger('click');
        };
        
        tp.el.on('click', s._hndClick);
        tp.el.on('sxy-tap', s._hndTap);
    }
 
   $.fn[p].h(h, SmartClickHelper);  
 
})(jQuery);
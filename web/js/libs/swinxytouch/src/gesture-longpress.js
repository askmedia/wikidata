
;(function($, undefined)
{
    var g = 'sxy-longpress', p = 'swinxytouch';
    
    var defaults =
    {
        'minDelay': 1000,
        'maxMove': 5
    }
    
    function LongPressGesture(tp, o)
    {
        var
        
          s = this,
          
          timer,
          startPoint = {};
        
        var hndTimeout = function()
        {
            var
              pt = tp.pt,
              a  = Math.abs;
            
            timer = null;

            if ((a(startPoint.x - pt[0].x) < o.maxMove) && (a(startPoint.y - pt[0].y) < o.maxMove))
                tp.trigger(g, {position: startPoint});
        }
        
        s['sxy-down'] = function(e)
        {
            var
              pt = e.pointers;
            
            startPoint = {x: pt[0].x, y: pt[0].y};

            if (timer)
                clearTimeout(timer);
            
            timer = setTimeout(hndTimeout, o.minDelay);
        };
            
        s['sxy-up'] = function(e)
        {
            clearTimeout(timer);
        };
    }
    
    $.fn[p].g(g, LongPressGesture, defaults);
})
(jQuery);
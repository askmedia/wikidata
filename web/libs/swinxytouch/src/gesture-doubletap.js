
;(function($, undefined)
{
    var g = 'sxy-doubletap', p = 'swinxytouch';
    
    var defaults =
    {
        'maxDelay': 300,
        'maxMove': 4
    }
    
    function DoubleTapGesture(tp, o)
    {
        var
        
          s = this,
          a = Math.abs,

          startTime,
          startPoint;
        
        s['sxy-tap'] = function(e)
        {
            var p = e.position;
            

            if ((startTime != null) && (((new Date()).getTime() - startTime) < o.maxDelay) && (a(startPoint.x - p.x) < o.maxMove) && (a(startPoint.y - p.y) < o.maxMove))
            {
                tp.trigger(g, {position:startPoint});
                startTime = null;
            }
            else
            {
                startTime  = (new Date()).getTime();
                startPoint = {x: p.x, y: p.y};
            }
        };
    }
    
    $.fn[p].g(g, DoubleTapGesture, defaults);
})
(jQuery);
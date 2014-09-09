
;(function($, undefined)
{
    var g = 'sxy-swipe', p = 'swinxytouch';
    
    /*
     * degrees revolve around the x axis so 0 degrees is left, 180 is right. going clockwise from 0 base direction maps on
     * this principle.
     */

    //var mapGeneral = ['left', 'up', 'right', 'down'];
    //var mapCompass = ['w', 'wnw', 'nw', 'nnw', 'n', 'nne', 'ne', 'ene', 'e', 'ese', 'se', 'sse', 's', 'ssw', 'sw', 'wsw'];
    
    var defaults =
    {
        'maxTime': 300,
        'minMove': 10,
        'map': ['left', 'up', 'right', 'down']
    }
    
    function SwipeGesture(tp, o)
    {
        var
        
          s = this,
          
          distance = $.fn[p].d,
          angle = $.fn[p].a,
          
          eventData = {},
          
          startTime,
          startPoint;
        
        
        s['sxy-down'] = function(e)
        {
            var pt = e.pointers;
            
            startTime  = (new Date()).getTime();
            startPoint = {x: pt[0].x, y: pt[0].y};
        };
            
        s['sxy-up'] = function(e)
        {
            var pt = e.pointers;
            
            if( (((new Date()).getTime() - startTime) < o.maxTime) && (distance(startPoint, pt[0]) > o.minMove) )
            {
                eventData.direction = o.map[((Math.round((angle(startPoint, pt[0]) / (360 / o.map.length)))) % o.map.length)];
                eventData.distance  = Math.abs(distance(startPoint, pt[0]));
                
                tp.trigger(g, eventData);
            }
        };
    }
    
    $.fn[p].g(g, SwipeGesture, defaults);
})
(jQuery);
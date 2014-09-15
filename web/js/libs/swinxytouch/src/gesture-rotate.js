
;(function($, undefined)
{
    var g = 'sxy-rotate', p = 'swinxytouch';
    
    var defaults =
    {
        'minRotate': 3
    }
    
    function RotateGesture(tp, o)
    {
        var
        
          s = this,
          
          isRotating,
          
          angle = $.fn[p].a,
          
          startAngle,
          lastAngle,
          
          eventData = {};
        
        function trigger(e, state)
        {
            var
              rotation,
              currentAngle;
            
            eventData.state = state;
            eventData.rotation += (Math.abs(rotation = ((currentAngle = angle(e.pointers[0], e.pointers[1])) - lastAngle)) < 180) ? rotation : 0;
            
            lastAngle = currentAngle;
            
            tp.trigger(g, eventData);
        }
        
        s['sxy-down'] = function(e)
        {
            if (e.pointers.length == 2)
            {
                isRotating = false;
                startAngle = lastAngle = angle(e.pointers[0], e.pointers[1]);
            }
        };
            
        s['sxy-up'] = function(e)
        {
            if (isRotating)
            {
                isRotating = false;
                trigger(e, 3);
            }
        };
        
        s['sxy-move'] = function(e)
        {
            var pt = e.pointers;
            
            if (pt.length == 2)
            {
                if (isRotating)
                {
                    trigger(e, 2);
                }
                else
                {
                    if (Math.abs(startAngle - angle(pt[0], pt[1])) > o.minRotate)
                    {
                        isRotating = true;
                        eventData.rotation = 0.0;
                        trigger(e, 1);
                    }
                }
            }
        };
    }
    
    $.fn[p].g(g, RotateGesture, defaults);
})
(jQuery);
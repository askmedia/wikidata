;(function($, undefined)
{
    var
      defaults = 
      {
          position: 'right'
      };
    
    var venderChecked = false;
    
    var
      vendorPropertyMap =
      {
          'backgroundSize':
          { 
              'supported'  : false,
              'variations' : ['backgroundSize', 'WebkitBackgroundSize', 'MozBackgroundSize', 'OBackgroundSize', 'msBackgroundSize']
          }
      };

    /**
     * Determines which CSS3 attribute should be used by the
     * current browser.
     */
    function checkVendorPropertyMap(map)
    {
        var checked = 0, supported = 0;
        
        for (var k in map)
        {
            ++checked;
            
            var
              property   = map[k],
              variations = property.variations;
            
            for (var i = 0, m = variations.length; i < m; ++i)
            {
                if(document.createElement('div').style[variations[i]] !== undefined)
                {
                    ++supported;
                    property.supported = variations[i];
                    break;
                }
            }
        }
        
        return (checked == supported);
    }
    
    /**
     *
     */
    function ZoomDock(b)
    {
        this.initialised = false;
        
        if (!venderChecked) // We only want to run the checks once per page load
        {
            venderChecked = true;
            vendorPropertyMap['_all'] = checkVendorPropertyMap(vendorPropertyMap);
        }
        
        var
          hasFocus  = false,
          s         = this,
          vpLeft    = 0,
          vpTop     = 0,
          useBgSize = vendorPropertyMap.backgroundSize.supported;
        
        var _hndMove = function(e) { var p; if ( e.pointers.length == 1) { p = e.pointers[0]; move(p.x, p.y, true); } };
        
        var
          options = $.extend({}, defaults, ((b.options.dock != undefined) ? b.options.dock : {}));
        

        
        function checkBounds(x, y)
        {
            var

              offset = b.dp.j.offset(),

              left   = offset.left,
              top    = offset.top,
              right  = left + b.dp.j.width(),
              bottom = top + b.dp.j.height();
              
            return ((y < top || x > right || y > bottom || x < left) ? false : true);
        };
        
        function blur()
        {
            if (hasFocus)
            {
                hasFocus = false;
                b.vf.j.hide();

                b.dp.ovl.j.stop().animate({opacity: 0.0}, {queue: false});
                b.vp.j.stop().animate({opacity: 0.0, left: (b.dp.w / 2), top: (b.dp.h / 2), width: 0, height: 0},
                {
                    queue: false
                });
            }
        };        
        
        function focus(x, y)
        {
            if (!b.waiting)
            {
                hasFocus = true;

                b.si.j.show();
                b.vp.j.show();
                b.vf.j.show();

                b.dp.ovl.j.stop().animate({opacity: 0.5}, {queue: false});
                b.vp.j.stop().animate({opacity: 1.0, left: vpLeft, top: vpTop, width: b.vp.w, height: b.vp.h}, { queue: false });

                s.move(x, y, true);
            }
        };
        
        function tearUp()
        {
            b.rt.j.on('sxy-focus', function(e) { var p = e.pointers[0]; focus(p.x, p.y); });
            b.rt.j.on('sxy-blur',  function(e) {  blur(); });
            b.dp.j.on('sxy-hover sxy-move sxy-down', _hndMove);
            
            // We favour background image scaling over the image tag as it gives considerably better
            // performance accross the range of browsers
            
            if (useBgSize == false)
            {
                var
                img = $('<img src="" style="display: block; position: absolute;" />');

                b.vf.j.append(img);
                b.vf.img = { j: img, e: img.get(0) };
            }
            
            s.initialised = true;
        };
        
        var timer = false, lastLeft, lastTop;
        
        function load(x, y)
        {
            switch (options.position)
            {
                case 'top':
                    vpLeft = 0;
                    vpTop  = (-1 * (b.dp.h + 10));
                    break;
                    
                case 'right':
                    vpLeft = b.dp.w + 10;
                    vpTop  = 0;
                    break;
                    
                case 'bottom':
                    vpLeft = 0;
                    vpTop = b.dp.h + 10;
                    break;
                    
                case 'left':
                    vpLeft = (-1 * (b.dp.w + 10));
                    vpTop  = 0;
                    break;
            }
            
            b.vp.j.css({width: 0, height: 0, left: (b.dp.w / 2), top: (b.dp.h / 2)});
            b.dp.ovl.j.css({opacity: 0});
            b.vf.j.css({'position': 'relative', 'overflow': 'hidden'});
            
            lastLeft = lastTop = 0;

            if (!s.initialised)
                tearUp();

            if (useBgSize == false)
            {
                b.vf.img.j.attr('src', b.dp.tn.src);
                b.vf.img.j.css({width: b.dp.w, height: b.dp.h});
            }
            else
            {
                b.vf.j.css('background-image', 'url(' + b.dp.tn.src + ')');
                b.vf.j.css(useBgSize, b.dp.w + 'px ' + b.dp.h + 'px');
            }

            if (b.hasFocus)
                focus(x, y);
        };

        function zoom(x, y)
        {
            move(x, y, false);
        };

        function _moveViewFinder()
        {
            if (!s.initialised)
                return;

            var
              vf  = b.vf,
              vfs = b.vf.e.style;
              
            if (vf.l != lastLeft || vf.t != lastTop)
            {
                vfs.left = (lastLeft = vf.l) + 'px';
                vfs.top  = (lastTop = vf.t) + 'px';
                
                if (useBgSize == false)
                {
                    var
                      vfi = b.vf.img.e.style;
                      
                    vfi.left = '-' + (vf.l + vf.osl) + 'px';
                    vfi.top  = '-' + (vf.t + vf.ost) + 'px';
                }
                else
                {
                    vfs.backgroundPosition = '-' + (vf.l + vf.osl) + 'px' + ' -' + (vf.t + vf.ost) + 'px';
                }
                
                timer = setTimeout(_moveViewFinder, 8);
            }
            else
            {
                timer = false;
            }
        }

        /**
         * 
         */
        function move(x, y, animate)
        {
            if (checkBounds(x, y))
            {
                if (!hasFocus)
                    focus(x, y);

                b.center((x - b.dp.ol), (y - b.dp.ot), animate);
                
                if (!timer)
                    _moveViewFinder();
            }
            else
            {
                blur();
            }
        };

        s.tearUp = tearUp;
        s.load   = load;
        s.focus  = focus;
        s.blur   = blur;
        s.move   = move;
        s.zoom   = zoom;
    }
    
    $.fn['swinxyzoom']['modes']['dock'] = ZoomDock;
})
(jQuery);
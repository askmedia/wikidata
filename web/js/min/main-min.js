"use strict";jQuery(document).ready(function(){function e(e){e+="";for(var r=e.split("."),a=r[0],o=r.length>1?"."+r[1]:"",t=/(\d+)(\d{3})/;t.test(a);)a=a.replace(t,"$1,$2");return a+o}var r=jQuery(window).width(),a=jQuery(window).height();1280>r&&(a-=127);var o=Math.min(a,r);jQuery(".wrapper__graph__body").css({height:o,width:o}),jQuery("a.swinxylens").swinxyzoom({mode:"lens",size:"100%",damping:10,zoom:13,controls:!1,lens:{width:300,height:300}}),setTimeout(function(){var r=1200,a=2424305,t=223,n=t/2,i=n*Math.PI*Math.PI,s=a/i;console.log("human_value",a),console.log("human_area",i),console.log("ratio : ",s);var u={1:47e3,2:1e5,3:1e6,4:24e5};console.log(u);for(var l in u){var c=u[l],h=c/s,g=h/Math.PI/Math.PI,d=2*g,y=o/r;jQuery(".range-"+l+" span").text(e(c)),jQuery(".range-"+l).css({height:d*y+30}),jQuery(".range-legend--"+l).css({height:d*y,width:d*y,"margin-left":-d*y/2,"margin-top":d*y/2})}},1500),jQuery(".see-more").on("click",function(){var e,r;e=jQuery(this),r=jQuery(".see-more__body"),e.toggleClass("active"),e.hasClass("active")?r.show("slow",function(){jQuery(".wrapper__graph_left").addClass("active")}):(jQuery(".wrapper__graph_left").removeClass("active"),r.hide("slow"))}),jQuery(".bt-explore").on("click",function(){jQuery(".wrapper__intro").fadeOut("slow",function(){jQuery(".wrapper__graph").fadeIn()})}),jQuery(".bt-explore").click();var t="images/what_is_Wikipedia_about-8000.jpg";jQuery('<img src="'+t+'">').load(function(){jQuery(".loader").fadeOut("slow",function(){jQuery(".bt-explore").fadeIn()})})});
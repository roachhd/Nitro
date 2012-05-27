/*
 * jQuery.splitter.js - two-pane splitter window plugin
 * version 1.51 (2009/01/09) 
 * Dual licensed under the MIT and GPL licenses
 */
(function(c){c.fn.splitter=function(i){i=i||{};return this.each(function(){function n(f){f=e._posSplit+f[a.eventPos];a.outline?(f=Math.max(0,Math.min(f,b._DA-d._DA)),d.css(a.origin,f)):l(f)}function o(b){d.removeClass(a.activeClass);b=e._posSplit+b[a.eventPos];a.outline&&(m.remove(),m=null,l(b));j.css("-webkit-user-select","text");c(document).unbind("mousemove",n).unbind("mouseup",o)}function l(f){f=Math.max(e._min,b._DA-h._max,Math.min(f,e._max,b._DA-d._DA-h._min));d._DA=d[0][a.pxSplit];d.css(a.origin,
f).css(a.fixed,b._DF);e.css(a.origin,0).css(a.split,f).css(a.fixed,b._DF);h.css(a.origin,f+d._DA).css(a.split,b._DA-d._DA-f).css(a.fixed,b._DF);c.browser.msie||j.trigger("resize")}function k(a,b){for(var c=0,d=1;d<arguments.length;d++)c+=Math.max(parseInt(a.css(arguments[d]))||0,0);return c}var m,a=c.extend({activeClass:"active",pxPerKey:8,tabIndex:0,accessKey:""},{v:{keyLeft:39,keyRight:37,cursor:"col-resize",splitbarClass:"vsplitbar",outlineClass:"voutline",type:"v",eventPos:"pageX",origin:"left",
split:"width",pxSplit:"offsetWidth",side1:"Left",side2:"Right",fixed:"height",pxFixed:"offsetHeight",side3:"Top",side4:"Bottom"},h:{keyTop:40,keyBottom:38,cursor:"n-resize",splitbarClass:"hsplitbar",outlineClass:"houtline",type:"h",eventPos:"pageY",origin:"top",split:"height",pxSplit:"offsetHeight",side1:"Top",side2:"Bottom",fixed:"width",pxFixed:"offsetWidth",side3:"Left",side4:"Right"}}[(i.splitHorizontal?"h":i.splitVertical?"v":i.type)||"v"],i),b=c(this),j=c(">*",b[0]).css({"-moz-outline-style":"none"}),e=c(j[0]),h=c(j[1]),g=c('<span></span>').attr({accessKey:a.accessKey,tabIndex:a.tabIndex,title:a.splitbarClass}).bind(c.browser.opera?"click":"focus",function(){this.focus();d.addClass(a.activeClass)}).bind("keydown",function(b){b=b.which||b.keyCode;(b=b==a["key"+a.side1]?1:b==a["key"+a.side2]?-1:0)&&l(e[0][a.pxSplit]+b*a.pxPerKey,!1)}).bind("blur",function(){d.removeClass(a.activeClass)}),d=c(j[2]||"<div></div>").insertAfter(e).append(g).attr({"class":a.splitbarClass,unselectable:"on"}).css({"user-select":"none","-webkit-user-select":"none","-moz-user-select":"none"}).bind("mousedown",function(b){a.outline&&(m=m||d.clone(!1).insertAfter(e));j.css("-webkit-user-select","none");d.addClass(a.activeClass);e._posSplit=e[0][a.pxSplit]-b[a.eventPos];c(document).bind("mousemove",n).bind("mouseup",o)});/^(auto|default|)$/.test(d.css("cursor"))&&d.css("cursor",a.cursor);d._DA=
d[0][a.pxSplit];b._PBF=c.boxModel?k(b,"border"+a.side3+"Width","border"+a.side4+"Width"):0;b._PBA=c.boxModel?k(b,"border"+a.side1+"Width","border"+a.side2+"Width"):0;e._pane=a.side1;h._pane=a.side2;c.each([e,h],function(){this._min=a["min"+this._pane]||k(this,"min-"+a.split);this._max=a["max"+this._pane]||k(this,"max-"+a.split)||9999;this._init=!0===a["size"+this._pane]?parseInt(c.curCSS(this[0],a.split)):a["size"+this._pane]});g=e._init;isNaN(h._init)||(g=b[0][a.pxSplit]-b._PBA-h._init-d._DA);if(a.cookie){c.cookie||
alert("jQuery.splitter(): jQuery cookie plugin required");var p=parseInt(c.cookie(a.cookie));isNaN(p)||(g=p);c(window).bind("unload",function(){var b=""+d.css(a.origin);c.cookie(a.cookie,b,{expires:a.cookieExpires||365,path:a.cookiePath||document.location.pathname})})}isNaN(g)&&(g=Math.round((b[0][a.pxSplit]-b._PBA-d._DA)/2));a.anchorToWindow?(b._hadjust=k(b,"borderTopWidth","borderBottomWidth","marginBottom"),b._hmin=Math.max(k(b,"minHeight"),20),c(window).bind("resize",function(){var a=b.offset().top,
d=c(window).height();b.css("height",Math.max(d-a-b._hadjust,b._hmin)+"px");c.browser.msie||b.trigger("resize")}).trigger("resize")):a.resizeToWidth&&!c.browser.msie&&c(window).bind("resize",function(){b.trigger("resize")});b.bind("resize",function(c,g){if(c.target==this){b._DF=b[0][a.pxFixed]-b._PBF;b._DA=b[0][a.pxSplit]-b._PBA;b._DF<=0||b._DA<=0||l(!isNaN(g)?g:!a.sizeRight&&!a.sizeBottom?e[0][a.pxSplit]:b._DA-h[0][a.pxSplit]-d._DA)}}).trigger("resize",[g])})}})(jQuery);
/*
 * jQuery Tip plugin 1.0
 * Released: 2009/01/25
 *
 * Copyright (c) 2009 51edu.com
 * Author:RichieLiu
 * QQ:76373 MSN:richie418@hotmail.com
 * Email: richie418@hotmail.com
 * My WebSite:http://www.iamued.com
 */
(function($){
	
    $.fn.tap = function(options){
        var defaults = {
        	width:100,
            type: "text",
            text: "这里是提示文字"
        };
        var opts = $.extend(defaults, options);
       this.each(function(){
        	$(this).bind("mouseover", function(event){
                showtap(event, opts);
            });
        	$(this).bind("mouseout", function(event){
                $("#tip").hide();
            });
        	$(this).css("cursor", "pointer");
         });

        
    };
	
    function showtap(event, opts){
        target = $(event.target);
		var _tap=$("#tip");
            _tap.addClass("tip").css("width", opts.width);//.appendTo($("body"));
            _tap.bind("mouseenter", function(event){
                $(this).show();
            });
            _tap.bind("mouseleave", function(event){
                $(this).hide();
            });
        _tap.css("width", opts.width); 
        if(opts.type=="text"){
        	_tap.find(".textarea").html(opts.text);
        }else if(opts.type=="template"){
				//alert(opts.template);
				/*
				alert(testString.replace(/{([^{}]+)}/g,function(word){
						var _attr=word.replace(/({|})+/g,"");
						return $("#test").attr(_attr);
				}));
				*/
			_tap.find(".textarea").html(opts.template.replace(/\[([^\[\]]+)\]/g,function(word){
						var _attr=word.replace(/(\[|\])+/g,"");
						return target.attr(_attr);
				}));
		}else if(opts.type=="diy"){
			opts.callback(target,$("#tip").find(".textarea"));
		}
		else{
			
        	if(target.attr(opts.type)){
        	_tap.find(".textarea").html(target.attr(opts.type));
        	}else{
        		return false;
        	}
        }

        _tap.find(".ie6iframe").css("width", _tap.width()).css("height", _tap.outerHeight(true));
       if(opts.position&&opts.position.left){
        	_tap.css("position", "absolute").css("top",target.offset().top + target.height() - 0).css("left",target.offset().left + opts.position.left);
        }else{
        	_tap.css("position", "absolute").css("top",target.offset().top + target.height() - 0).css("left",target.offset().left + 0);
        }
        _tap.show();
    };
	$(document).ready(		  
	function(){
		$("box_nan_left").append($("<div id='tip'><div class='textarea'></div><iframe class='ie6iframe'></iframe></div>"));
	}	
)
    })(jQuery);

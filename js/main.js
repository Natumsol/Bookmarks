/**
 * Created by LiuJ on 2015/6/30.
 */
/**
 * tabs切换
 */
$.fn.tabs = function(){
    var tabNames = [];
    this.each(function(){
        tabNames.push($(this).attr("href"));
    });
    for(var i = 1 ; i < tabNames.length; i ++) {
        $(tabNames[i]).hide();
    }
    var that = this;
    this.click(function(){
        that.each(function(){
            $(this).removeClass("hover");
        });
        that.parent().each(function(){
            $(this).removeClass("hover");
        });
        $(this).addClass("hover");
        $(this).parent().addClass("hover");
        $(".menu-bar-warper").click();
        for(var i = 0 ; i < tabNames.length; i ++) {
            $(tabNames[i]).hide();
        }
        $($(this).attr("href")).fadeIn();
    });
};
/**
 * @param options
 * @description 生成Tooltips
 */
$.fn.tooltips = function(options){
    var defaults = {
        directions: "top",
        contents: "undefined"
    };
    var tooltipStack = [];
    var tooltipTemplate = {
        type:"<div class = 'tooltip'></div>",
        arrow:"<div class = 'tooltip-caret'>",
        content:"<div class = 'tooltip-content'></div>"
    };
    var settings = $.extend({}, defaults, options);

    this.mouseover(function(){
        var pos = $(this).offset();
        var that = this;
        var newTooltip = $(tooltipTemplate.type).addClass(settings.directions)
            .append($(tooltipTemplate.arrow))
            .append($(tooltipTemplate.content).html(function(){
                if($.isFunction(settings.content))
                    return settings.content(that);
                else if(typeof settings.content == "string")
                    return settings.content;
                else return "undefined";
            })).hide();
        newTooltip.appendTo("body").css({
            "top":pos.top - newTooltip.height() - 5,
            "left":pos.left + $(this).width() / 2 - newTooltip.width() / 2
        }).find(".tooltip-caret").css({
            left:newTooltip.width() / 2 - 5
        });
        
        newTooltip.fadeIn();
        tooltipStack.push(newTooltip);
        console.log("tooltips created!");
    });
    this.mouseout(function(){
       for(var i = 0 ; i < tooltipStack.length; i ++) {
           tooltipStack[i].remove();
           tooltipStack.pop();
       }
       console.log("tooltips removed!");
    });
};
$(function () {
    //$(".navbar-list").hide().data("isHide", true);


    $.getJSON("data.json", function(data){
        for(var type in data) {
            var container = $("#" + type + " .container");
            for(var i = 0; i < data[type].length; i = i + 4){
                for(var j = 0; j < 4 && i + j < data[type].length; j ++){
                    if(j == 0) var $row = $("<div>").addClass("row");
                    $("<div class='item three columns button'></div>").append(
                        $("<a>").html(data[type][i + j].name).addClass("item-link").attr({
                        "href": data[type][i + j].url,
                        "title": data[type][i + j].title
                    })).appendTo($row);
                }
                $row.appendTo(container);
            }
        }
        $(".menu-bar-warper").click(function () {
            $(".navbar-list").toggleClass("mobile-hide");
            $(".content").toggleClass("content-translate");
        });
        $(".navbar-link").tabs();
        $(".item").tooltips({
            content: function(context){
                return $("a", context).attr("title");
            }
        });
    })
});
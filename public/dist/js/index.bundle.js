(function($) {
    var _siteCode = "beijing-airport";
    var _articlesHtml = "";
    var _exvideosHtml = "";
    var _videosHtml = "";
    var _extopicsHtml = "";
    var _topicsHtml = "";
    var _videoStop = true;
    var _topicStop = true;

    function render(el, s) {
        el.empty();
        el.html(s);
    }

    // 文章
    $.ajax({
        url: "http://aliostar.opsmarttech.com/portal2/articles?domain=" + _siteCode + "jwf=true",
        type: "get",
        success: function(d) {
            _articlesHtml = "";
            for (var i = 0; i <= d.length - 1; i++) {
                _articlesHtml += "<dd>" 
                + "<a href='http://aliostar.opsmarttech.com/portal/article/" + d[i].id + "?domain=" + _siteCode + "' >" 
                + "<div class='item'>" 
                + "<div class='item__l'>" 
                + "<img src='../images/news2st/opsmart.png' data-echo='" + d[i].cover + "' alt='" + d[i].title + "'>" 
                + "</div>" 
                + "<div class='item__r'>" 
                + "<h2>" + d[i].intro + "</h2>" 
                + "<div class='item__r__detail'>" 
                + "<div class='viewTotal'>" 
                + "<img src='../images/news2st/views.png' alt='' width='18'>" + "<span>" + d[i].read + "</span>" 
                + "</div>" 
                + "<div class='item__r__detail__resource'>" 
                + "<img src='http://jwf.cc:10080/genesis/o_1b2nl7hbk17fo1dil15d81obnsq39.png?imageView2/2/w/640/q/100' alt=''>" 
                + "</div>" 
                + "</div>" 
                + "</div>" 
                + "</div>" 
                + "</a>" 
                + "</dd>";
            }
            render($("#artContent dl"), _articlesHtml);
            $("#contentNews2st ul li").eq(0).fadeIn();
            $("#loadingTip").addClass("hidden");
            if ($("#artContent").hasClass("theme-green")) {
	            $("#artContent").css({
	            	"border": "1px solid #12503e",
	            	"box-shadow": "0 0 2px 0 rgba(0,0,0,.1)"
           		});
                // $(".artContent dd").css({
                //     "border-bottom": "1px solid #12503e"
                // });
            }else {
            	$("#artContent").css({
	            	"border": "1px solid #3e5982",
	            	"box-shadow": "0 0 2px 0 rgba(0,0,0,.1)"
           		});
            }
        }
    });

    // 视频
    $("#navNews2st ul li").eq(1).on("click",
        function() {
            $.ajax({
                url: "http://aliostar.opsmarttech.com/portal2/videos?domain=" + _siteCode,
                type: "get",
                success: function(d) {
                    _videosHtml = "";
                    for (var i = 1; i <= d.length - 1; i++) {
                        _videosHtml += "<dd data-source='" + d[i].source + "'>" 
                        + "<div class='item' data-echo-background = '" + d[i].cover + "'>" 
                        + "<div class='description'>" 
                        + "<div class='title'>" + d[i].title + "</div>" 
                        + "</div>" 
                        + "<div class='viewTotal'>" 
                        + "<img src='../images/news2st/views-white.png' alt=''>" + "<span>" + d[i].read + "</span>" 
                        + "</div>" 
                        + "</div>" 
                        + "</dd>";
                    }
                    render($("#video"), _videosHtml);
                    echo.init({
                        offset: 100,
                        throttle: 0,
                        unload: false
                    });
                }
            });
        });

    // 话题
    $("#navNews2st ul li").eq(2).on("click",
        function() {
            $.ajax({
                url: "http://aliostar.opsmarttech.com/portal2/topics?domain=" + _siteCode,
                type: "get",
                success: function(d) {
                    _extopicsHtml = "<section class='banner'>" 
	                    + "<div class='item item--l'>" 
	                    + "<a href='http://aliostar.opsmarttech.com/portal/topic/" + d[0].id + "?domain=" + _siteCode + "'>" 
	                    + "<img src='../images/news2st/opsmart.png' data-echo='" + d[0].cover + "' alt=''>" 
	                    + "</a>" 
	                    + "</div>" 
	                    + "<div class='item item--r'>" 
                        + "<div class='itemContent'>"
	                    + "<div class='row'>" 
	                    + "<img src='../images/today-hot.png' alt=''>" 
	                    + "</div>" 
	                    + "<div class='row'>" + d[0].maintitle + "</div>" 
	                    + "<div class='row'>" 
	                    + "<small>" + d[0].vicetitle + "</small>" 
	                    + "</div>" 
	                    + "</div>"
                        + "</div>" 
	                    + "</section>";
                    _topicsHtml = "";
                    for (var i = 1; i <= d.length - 1; i++) {
                        _topicsHtml += "<dd>" 
                        + "<a href='http://aliostar.opsmarttech.com/portal/topic/" + d[i].id + "?domain=" + _siteCode + "'>" 
                        + "<div class='item'>" 
                        + "<img src='../images/news2st/opsmart.png' data-echo='" + d[i].cover + "' alt=''>" 
                        + "<div class='description'>" 
                        + "<div class='title'>" + d[i].maintitle + "</div>" 
                        + "<div class='detail'>" + d[i].vicetitle + "</div>" 
                        + "</div>" 
                        + "<div class='viewTotal'>" 
                        + "<img src='../images/news2st/views-white.png' alt=''>" 
                        + "<span>" + d[i].read + "</span>" 
                        + "</div>" 
                        + "</div>" 
                        + "</a>" 
                        + "</dd>";

                    }
                    render($("#todayTopic"), _extopicsHtml);
                    render($("#topicContent dl"), _topicsHtml);
                    echo.init({
                        offset: 100,
                        throttle: 0,
                        unload: false
                    });
                }
            });
        });
    // 控制显示
    $("#navNews2st ul li").on("click",
        function() {
            $("#navNews2st ul li a").removeClass("active");
            $(this).children("a").addClass("active");
            $("#contentNews2st ul li").removeClass("seen");
            $("#contentNews2st ul li").eq($(this).index()).fadeIn(400).siblings("li").hide();
        });
})(jQuery);

jQuery.fn.slideLeftHide = function(speed, callback) {
    this.animate({
            width: "hide",
            paddingLeft: "hide",
            paddingRight: "hide",
            marginLeft: "hide",
            marginRight: "hide"
        },
        speed, callback);
};
jQuery.fn.slideLeftShow = function(speed, callback) {
    this.animate({
            width: "show",
            paddingLeft: "show",
            paddingRight: "show",
            marginLeft: "show",
            marginRight: "show"
        },
        speed, callback);
};
$("#video").on("click", "dd",
    function() {
        $("#videoLayer video").attr("src", $(this).data('source'));
        $("#videoLayer").slideLeftShow(400);
    });

$("#videoLayerCloser").on("click",
	function() {
		var _video_ = document.getElementById("popupVideo");
		console.log(_video_);
		_video_.pause();
        $("#videoLayer").slideLeftHide(400);
	});

/* Author:
	Andrew Longstaff -- andrewlongstaff.com
*/	
$(function() {

	if($("html").hasClass("no-touch")){

		  function filterPath(string) {
			  return string
			    .replace(/^\//,'')
			    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
			    .replace(/\/$/,'');
		  }
		  var locationPath = filterPath(location.pathname);
		  var scrollElem = scrollableElement('html', 'body');

		  $('a[href*=#]').each(function() {
		    var thisPath = filterPath(this.pathname) || locationPath;
		    if (  locationPath == thisPath
		    && (location.hostname == this.hostname || !this.hostname)
		    && this.hash.replace(/#/,'') ) {
		      var $target = $(this.hash), target = this.hash;
		      if ($target.length > 0) {
		        var targetOffset = $target.offset().top;
		        $(this).click(function(event) {
		          event.preventDefault();
		          $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
		            //location.hash = target;
		          });
		        });
		      }
		    }
		  });

		  // use the first element that is "scrollable"
		  function scrollableElement(els) {
		    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
		      var el = arguments[i],
		          $scrollElement = $(el);
		      if ($scrollElement.scrollTop()> 0) {
		        return el;
		      } else {
		        $scrollElement.scrollTop(1);
		        var isScrollable = $scrollElement.scrollTop()> 0;
		        $scrollElement.scrollTop(0);
		        if (isScrollable) {
		          return el;
		        }
		      }
		    }
		    return [];
		  }


		$(window).scroll(function(){
			var scrolled = $(".menu-bar");
			if($(window).scrollTop() > $("#banner").height()){
				if($(window).scrollTop() + scrolled.height() > $("footer").position().top){
					scrolled.removeClass("scrolling");
					scrolled.css("top", (($("footer").position().top - 40) -$("#banner").height() - scrolled.height())+"px");
				}
				else{
					scrolled.css("top", "10px");
					scrolled.addClass("scrolling");
					//scrolled.css("top", ($(window).scrollTop()-$("#banner").height())+"px");
				}
			}
			else{
				scrolled.css("top", "10px");
				scrolled.removeClass("scrolling");
			}

			$("h1").each(function(ind,val){
				if($(window).scrollTop() >= $(this).position().top - 10){
					var parent = $(this).parent();
					if(!parent.is(".fixed")){
						$(".fixed").removeClass("fixed");
						if(parent.attr("id")!=="banner"){
							parent.addClass("fixed");
							$("nav a.active").removeClass("active");
							$("nav a[href=#"+parent.attr("id")+"]").addClass("active");
						}
					}
					return;
				}
			});
		});
	}

	$(".tab a").click(function(ev){
		var self = $(ev.currentTarget);
		ev.preventDefault();
		if(!self.hasClass("active")){
			$(".tab .active").removeClass("active");
			$(".tab div").eq(self.parent().index()).addClass("active");
			self.addClass("active");
		}
	});

});
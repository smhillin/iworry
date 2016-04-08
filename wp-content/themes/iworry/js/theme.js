var $ = jQuery.noConflict(); 

    // mini jQuery plugin that formats to two decimal places
    (function($) {
        $.fn.currencyFormat = function() {
            this.each( function( i ) {
                $(this).change( function( e ){
                    if( isNaN( parseFloat( this.value ) ) ) return;
                    this.value = parseFloat(this.value).toFixed(6);
                });
            });
            return this; //for chaining
        }
    })( jQuery );


	// filestyle
	(function(b){var c=function(d,e){this.options=e;this.$elementFilestyle=[];this.$element=b(d)};c.prototype={clear:function(){this.$element.val("");this.$elementFilestyle.find(":text").val("")},destroy:function(){this.$element.removeAttr("style").removeData("filestyle").val("");this.$elementFilestyle.remove()},icon:function(d){if(d===true){if(!this.options.icon){this.options.icon=true;this.$elementFilestyle.find("label").prepend(this.htmlIcon())}}else{if(d===false){if(this.options.icon){this.options.icon=false;this.$elementFilestyle.find("i").remove()}}else{return this.options.icon}}},input:function(d){if(d===true){if(!this.options.input){this.options.input=true;this.$elementFilestyle.prepend(this.htmlInput());var e="",f=[];if(this.$element[0].files===undefined){f[0]={name:this.$element[0].value}}else{f=this.$element[0].files}for(var g=0;g<f.length;g++){e+=f[g].name.split("\\").pop()+", "}if(e!==""){this.$elementFilestyle.find(":text").val(e.replace(/\, $/g,""))}}}else{if(d===false){if(this.options.input){this.options.input=false;this.$elementFilestyle.find(":text").remove()}}else{return this.options.input}}},buttonText:function(d){if(d!==undefined){this.options.buttonText=d;this.$elementFilestyle.find("label span").html(this.options.buttonText)}else{return this.options.buttonText}},classButton:function(d){if(d!==undefined){this.options.classButton=d;this.$elementFilestyle.find("label").attr({"class":this.options.classButton});if(this.options.classButton.search(/btn-inverse|btn-primary|btn-danger|btn-warning|btn-success/i)!==-1){this.$elementFilestyle.find("label i").addClass("icon-white")}else{this.$elementFilestyle.find("label i").removeClass("icon-white")}}else{return this.options.classButton}},classIcon:function(d){if(d!==undefined){this.options.classIcon=d;if(this.options.classButton.search(/btn-inverse|btn-primary|btn-danger|btn-warning|btn-success/i)!==-1){this.$elementFilestyle.find("label").find("i").attr({"class":"icon-white "+this.options.classIcon})}else{this.$elementFilestyle.find("label").find("i").attr({"class":this.options.classIcon})}}else{return this.options.classIcon}},classInput:function(d){if(d!==undefined){this.options.classInput=d;this.$elementFilestyle.find(":text").addClass(this.options.classInput)}else{return this.options.classInput}},htmlIcon:function(){if(this.options.icon){var d="";if(this.options.classButton.search(/btn-inverse|btn-primary|btn-danger|btn-warning|btn-success/i)!==-1){d=" icon-white "}return'<i class="'+d+this.options.classIcon+'"></i> '}else{return""}},htmlInput:function(){if(this.options.input){return'<input type="text" class="'+this.options.classInput+'" disabled> '}else{return""}},constructor:function(){var f=this,d="",g=this.$element.attr("id"),e=[];if(g===""||!g){g="filestyle-"+b(".bootstrap-filestyle").length;this.$element.attr({id:g})}d=this.htmlInput()+'<label for="'+g+'" class="'+this.options.classButton+'">'+this.htmlIcon()+"<span>"+this.options.buttonText+"</span></label>";this.$elementFilestyle=b('<div class="bootstrap-filestyle" style="display: inline;">'+d+"</div>");this.$element.css({position:"fixed",left:"-500px"}).after(this.$elementFilestyle);this.$element.change(function(){var h="";if(this.files===undefined){e[0]={name:this.value}}else{e=this.files}for(var j=0;j<e.length;j++){h+=e[j].name.split("\\").pop()+", "}if(h!==""){f.$elementFilestyle.find(":text").val(h.replace(/\, $/g,""))}});if(window.navigator.userAgent.search(/firefox/i)>-1){this.$elementFilestyle.find("label").click(function(){f.$element.click();return false})}}};var a=b.fn.filestyle;b.fn.filestyle=function(e,d){var g="",f=this.each(function(){if(b(this).attr("type")==="file"){var i=b(this),j=i.data("filestyle"),h=b.extend({},b.fn.filestyle.defaults,e,typeof e==="object"&&e);if(!j){i.data("filestyle",(j=new c(this,h)));j.constructor()}if(typeof e==="string"){g=j[e](d)}}});if(typeof g!==undefined){return g}else{return f}};b.fn.filestyle.defaults={buttonText:"Choose file",input:true,icon:true,classButton:"btn",classInput:"input-large",classIcon:"icon-folder-open"};b.fn.filestyle.noConflict=function(){b.fn.filestyle=a;return this};b(".filestyle").each(function(){var e=b(this),d={buttonText:e.attr("data-buttonText"),input:e.attr("data-input")==="false"?false:true,icon:e.attr("data-icon")==="false"?false:true,classButton:e.attr("data-classButton"),classInput:e.attr("data-classInput"),classIcon:e.attr("data-classIcon")};e.filestyle(d)})})(window.jQuery);


$(document).ready(function(){

	$('.carousel').carousel();
	

	// the content
	
		// wrap h1 
		
			$('.thecontent h1').each(function() {
				$(this).wrapInner('<span />');
			});


	// user pic size
	
		var ratio= 170 / 140;
		$(".userpic img").css("width","100%");
		$(".userpic img").css("height", $(".userpic img").width()/ratio+"px");



	/// map tools

		// zoom
	
			$('.zoomin').click(function() {
				map.setZoom(map.getZoom() + 1);
			});
	
			$('.zoomout').click(function() {
				map.setZoom(map.getZoom() - 1);
			});


		$('.gmnoprint').each(function() {
			if ($('img',this).length > 0) {
				$(this).addClass('custompin');
			}
		});	



	// user form
	
		$('a[data-toggle=tooltip]').tooltip();

		// coord lookup
			
			$('#getlatlong').click(function() { 
				$(this).button('loading');
				
				getLocation(); 
				
				setTimeout(function() {
					$('#getlatlong').button('reset');
				}, 2000);
				
				return false;
			})
			
			// find you			
			function getLocation() {
				if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(showPosition);
				} else { 
					$('#getlatlong').button("Geolocation not supported. Please enter co-ords manually.");
				}
			}
			
			// found you
			function showPosition(position) {
				$('#address').val(position.coords.latitude+','+position.coords.longitude).currencyFormat();
				$('#getlatlong').button('complete');
			}

		// form validation
		
			$('#userformsubmit').click(function() {
			
				var redirecturl = window.location;
				
				var error = false;
				
				var first_name = $('#first_name'),
					last_name = $('#last_name'),
					email = $('#email'),
					address = $('#address'),
					avatar = $('#avatarwrap .avatarinput'),
					msg = ''
				;
					
									
				if (first_name.val() == '') {
					msg += '<div>Please enter your name</div>';
					first_name.parent().addClass('has-error');
					var error = true;
				}
				if (last_name.val() == '') {
					msg += '<div>Please enter your surname</div>';
					last_name.parent().addClass('has-error');
					var error = true;
				}
				if (email.val() == '') {
					msg += '<div>Please enter your email</div>';
					email.parent().addClass('has-error');
					var error = true;
				}
				if (address.val() == '') {
					msg += '<div>Please fetch your co-ordinates using the button provided, or enter them manually.</div>';
					address.parent().addClass('has-error');
					var error = true;
				}
				if (avatar.val() == '') {
					msg += '<div>Please choose a picture. This is used to place you on the map above.</div>';
					avatar.parent().addClass('has-error');
					var error = true;
				}
				
				if (error == true) {
					$('#userformalert').removeClass('hide').html(msg);
					return false;
				} else {
				
					$('#userformsubmit').button('loading');
					
					var formdata = {
						postid : $('#postid').val(),
						first_name : first_name.val(),
						last_name : last_name.val(),
						email : email.val(),
						address : address.val(),
						avatar : avatar.val()
					};
					//var data2 = $("#userform").serialize();
					//console.log(data2);
					  
					/*$.ajax({
						url: templatedir+'/includes/functions/user/create_user.php',
						type: 'POST',
						data: data2,
						success: function(data) {
						
							$('#userformsubmit').button('complete');
							console.log(redirecturl);
							console.log(data);
							//window.location = redirecturl;
							
						}
					});*/
					$("#userform").submit();
					
				}
				
				return false;				
				
			});

	// email friends
		
		$('#gform_wrapper_2').addClass('collapse');
		$('#share-message .btn-shortcode').click(function() {
			$('#gform_wrapper_2').collapse('toggle');
			return false;
		});


	var scrollme = $("#scrollme"),
		scroll = 0,
		scrollamount = 340;
		
	scrollme.click(function() {
		
		scroll = scroll + scrollamount;
		 
		$('.userlist').animate({ scrollTop: scroll }, 200);
		
		return false;
	});

});

$(window).load(function() {
		/*
$('.gmnoprint').each(function() {
			if ($('img',this).length > 0) {
				$(this).addClass('custompin');
			}
		});	
*/
})
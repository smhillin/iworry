<?php
/**
 * Represents the view for the public-facing component of the plugin.
 *
 * This typically includes any information, if any, that is rendered to the
 * frontend of the theme when the plugin is activated.
 *
 * @package   Plugin_Name
 * @author    Your Name <email@example.com>
 * @license   GPL-2.0+
 * @link      http://example.com
 * @copyright 2013 Your Name or Company Name
 */
?>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=<?php echo get_option('hbmaps_mapskey'); ?>&sensor=true"></script>


<script type="text/javascript">var $ = jQuery.noConflict(); $(document).ready(function(){

		// use new gmap styles
		google.maps.visualRefresh = true;

		// set styles
        var styles = <?php echo get_option('hbmaps_style')?>;
        var directionsDisplay;
		var directionsService = new google.maps.DirectionsService();
		var userlat = '';

		var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

			// set map defaults
			var mapOptions = {
				center: new google.maps.LatLng(27.0182447,-16.3324198),
				zoom: 1,
				disableDefaultUI: true,
				mapTypeControlOptions: {
					mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
				}
			};

			directionsDisplay = new google.maps.DirectionsRenderer();
			// do it
			map = new google.maps.Map(document.getElementById('gmap'), mapOptions);
			directionsDisplay.setMap(map);
			directionsDisplay.setOptions( { suppressMarkers: true } );

			// apply styles
			map.mapTypes.set('map_style', styledMap);
			map.setMapTypeId('map_style');
			var geocoder = new google.maps.Geocoder();
			var hbmarker= new Object();
			var gmarkers = new Array();
			var bounds = new google.maps.LatLngBounds();

		<?php
			$locationArgs = array('role' => 'location', 'number' => '10000');
			$users = get_users($locationArgs);
			$count=0;

			foreach( $users as $user ) :
			
				$address = get_the_author_meta( 'address', $user->ID );
				$latlong = get_the_author_meta( 'coords', $user->ID );
				$latlong = explode( ',', $latlong);

				if ($user->roles[0] == 'supporter') {
					$icon = get_bloginfo('template_directory') . '/images/whitedot.png';
				} elseif ($user->roles[0] == 'location') {
					$icon = get_bloginfo('template_directory') . '/images/locationpin.png';
				}
					
			$count++;
		?>

			function doInfo(num){
				var infowindow = new google.maps.InfoWindow({
				      content: gmarkers[num].content
				});
				infowindow.open(map,gmarkers[num].marker);
			}

			hbmarker= new Object();
			
			hbmarker.content = '<div class="branchdetails"><div class="username"><strong><?php echo get_the_author_meta('display_name',$user->ID); ?></strong></div>  <?php if (get_the_author_meta('facebook', $user->ID)) { ?><div class="marchfb"><p>For the latest news and pictures from the event, follow the link below:</p> <a href="<?php echo get_the_author_meta('facebook', $user->ID); ?>" target="_blank"><i class="icon-facebook-sign"></i> Facebook Event Page</a> </div><?php } ?> </div>';
			hbmarker.marker = null;
			hbmarker.address = '<?php echo $address; ?>';
			hbmarker.count = <?php echo $count; ?>;			
			hbmarker.icon = '<?php echo $icon; ?>';			
			gmarkers[<?php echo $count; ?>] = hbmarker;
						
			var myLatLng = new google.maps.LatLng(<?php echo $latlong[0]; ?> , <?php echo $latlong[1]; ?>);

						var marker_current = new google.maps.Marker({
							map: map,
							draggable:false,
							icon: {
								url: hbmarker.icon,
								scaledSize: new google.maps.Size(32, 47),
							},
							animation: google.maps.Animation.DROP,
							position: myLatLng,
							title : '<?php echo get_the_author_meta('display_name',$user-ID); ?>'
						});
						bounds.extend(myLatLng);
						gmarkers[<?php echo $count; ?>].marker = marker_current;
						google.maps.event.addListener(marker_current, 'click', function() {
							
							doInfo(<?php echo $count; ?>);
						});

		<?php endforeach; ?>



		<?php/*
			$supporterArgs = array('role' => 'supporter', 'number' => '10000');
			$users = get_users($supporterArgs);
			$count=0;

			foreach( $users as $user ) :
			
				$address = get_the_author_meta( 'address', $user->ID );
				$latlong = get_the_author_meta( 'coords', $user->ID );
				$latlong = explode( ',', $latlong);

				if ($user->roles[0] == 'supporter') {
					$icon = get_bloginfo('template_directory') . '/images/whitedot.png';
				} elseif ($user->roles[0] == 'location') {
					$icon = get_bloginfo('template_directory') . '/images/locationpin.png';
				}
					
			$count++;
		?>

			function doInfo(num){
				var infowindow = new google.maps.InfoWindow({
				      content: gmarkers[num].content
				});
				infowindow.open(map,gmarkers[num].marker);
			}

			hbmarker= new Object();
			
			hbmarker.content = '<div class="branchdetails"><div class="username"><strong><?php echo get_the_author_meta('display_name',$user->ID); ?></strong></div> <div class="useraddress"><?php echo get_the_author_meta('address', $user->ID); ?></div></div>';
			hbmarker.marker = null;
			hbmarker.address = '<?php echo $address; ?>';
			hbmarker.count = <?php echo $count; ?>;			
			hbmarker.icon = '<?php echo $icon; ?>';			
			gmarkers[<?php echo $count; ?>] = hbmarker;
						
			var myLatLng = new google.maps.LatLng(<?php echo $latlong[0]; ?> , <?php echo $latlong[1]; ?>);

						var marker_current = new google.maps.Marker({
							map: map,
							draggable:false,
							icon: {
								url: hbmarker.icon,
								scaledSize: new google.maps.Size(15, 15),
							},
							animation: google.maps.Animation.DROP,
							position: myLatLng,
							title : '<?php echo get_the_author_meta('display_name',$user-ID); ?>'
						});
						bounds.extend(myLatLng);
						gmarkers[<?php echo $count; ?>].marker = marker_current;
						google.maps.event.addListener(marker_current, 'click', function() {
							
							doInfo(<?php echo $count; ?>);
						});

		<?php endforeach; */?>

		function calcRoute(start , end) {
 
		  var request = {
		    origin:start,
		    destination:end,
		    travelMode: google.maps.TravelMode.DRIVING		    
		  };
		  directionsService.route(request, function(result, status) {
		    if (status == google.maps.DirectionsStatus.OK) {
		      directionsDisplay.setDirections(result);
		    }
		  });
		}

		function find_closest_marker_tome( event ) {
				//console.log(gmarkers);
			    var lat = event.lat();
			    var lng = event.lng();
			    var R = 6371; // radius of earth in km
			    var distances = [];
			    var closest = -1;
			    var begin = event;

			    for( i=1;i<gmarkers.length; i++ ) {
			    	//console.log(gmarkers[i]);
			        var mlat = gmarkers[i].marker.position.lat();
			        var mlng = gmarkers[i].marker.position.lng();
			        var dLat  = rad(mlat - lat);
			        var dLong = rad(mlng - lng);
			        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
			            Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
			        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			        var d = R * c;
			        distances[i] = d;
			        if ( closest == -1 || d < distances[closest] ) {
			            closest = i;
			        }
			    }
				google.maps.event.trigger(gmarkers[closest].marker, 'click');
			    //alert(gmarkers[closest].marker.position);
			    var end = gmarkers[closest].marker.position;

			    //alert(userlat);
			    //alert(end);
			    calcRoute( userlat , end );
			}


		function doasync(current){
			//console.log(gmarkers[current]);
			setTimeout( function() {
				geocoder.geocode( { 'address': gmarkers[current].address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						//map.setCenter(results[0].geometry.location);
						var marker_current = new google.maps.Marker({
							map: map,
							draggable:false,
							icon: gmarkers[current].icon,
							animation: google.maps.Animation.DROP,
							position: results[0].geometry.location
						});
						console.log(results);
						//var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
						var myLatLng = new google.maps.LatLng( results[0].geometry.location.lb , results[0].geometry.location.mb );
						bounds.extend(myLatLng);
						
						//console.log(results[0].geometry.location);
						gmarkers[current].marker = marker_current;
						google.maps.event.addListener(marker_current, 'click', function() {
							
							doInfo(current);
						});
					} else {
						console.log("Geocode was not successful for the following reason: " + status);
					}
					if (current < (gmarkers.length - 1) ){
						doasync(current+1);
					} else {
						map.fitBounds(bounds);
					}

				});
			}, 100);
		}

		function geosync(){
			var start = 1;
			var end = gmarkers.length;
			doasync(start);

			$('.gmnoprint').each(function() {
				if ($('img',this).length > 0) {
					$(this).addClass('custompin');
				}
			});	
		}
		map.fitBounds(bounds);


});

	</script>



<!-- This file is used to markup the public facing aspect of the plugin. -->
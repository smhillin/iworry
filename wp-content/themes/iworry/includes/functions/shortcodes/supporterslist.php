<?php

	function supporterslist() {
		
		$supporters .= '<div id="supporterslist">
			<h3>Our Digital Marchers</h3>
			<p>Supporters around the world are standing up for elephants. Please see below the people currently supporting iworry.</p>
			<div class="userlist">';
	
			$images = get_children(array(
				'post_type' => 'attachment',
				'post_status' => null,
				'post_parent' => '1101',
				'post_mime_type' => 'image',
				'order' => 'ASC',
				'orderby' => 'menu_order ID'
			));
		
			foreach($images as $image) {

				$supporters .= '<div class="auser"><div class="userpic"><div class="userpiccrop"><a href="'.$image->guid.'"><img src="'.get_bloginfo('template_directory').'/timthumb.php?src='.$image->guid.'&amp;w=172&amp;h=140&amp;zc=1" /></a></div></div></div>';

			}
		
		$supporters .= '</div>
			<center><a href="#" class="btn btn-primary" id="scrollme">Show more supporters</a> <a href="#supporterform" data-toggle="modal" data-target="#supporterform" class="btn btn-primary" id="showsupporterform">Add my picture here</a></center>
			<div id="supporterform" class="modal fade"><div class="modal-dialog"><div class="modal-content">'.do_shortcode('[gravityform id="4" name="Add my picture" title="false" description="false" ajax="true"]').'</div></div></div>
		</div>';
		
		return $supporters;

	}
	add_shortcode('supporterslist','supporterslist');
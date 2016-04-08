<?php

	function productlist() {

		$theproducts = '<div id="productlist">
			<h3>Wear your support:</h3>
			<p><strong><span class="redtext">100% of the price</span> of these gifts will directly fund projects run by the DSWT to protect Africa’s wildlife.</strong></p>

			<div id="products">';
					
					$count = 1; 
					$products = get_posts('post_type=products&posts_per_page=100');
					foreach ($products as $post) {
						setup_postdata($post); 
						$thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), full );
						
						if ($count == 1) {
							$in = 'in';
						}
						
						$theproducts .= '<div class="repeateritem clearfix thecontent">
							<h4><a class="accordion-toggle" data-toggle="collapse" data-parent="#products" href="#'.$post->post_name.'"><span class="greyblock">'.get_the_title($post->ID).'</span></a></h4>
							<div id="'.$post->post_name.'" class="panel-collapse collapse clearfix '.$in.'">';
						
							if ($thumbnail) {
								$theproducts .='<img src="'.$thumbnail[0].'" />';
							}
								
							$theproducts .='<div class="thecontent">'.wpautop(get_the_content()).' <a href="'.get_field('buy_link',$post->ID).'" class="btn btn-primary" target="_blank">Buy Now</a></div></div></div>';
				
							$count++; 
					}
		
		$theproducts .= '</div></div>';
		
		return $theproducts;
		var_dump($products);
	}
	
	add_shortcode('productlist','productlist');
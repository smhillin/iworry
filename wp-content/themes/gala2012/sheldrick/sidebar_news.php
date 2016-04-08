<div class="sidebar-news">

	<?php 
		global $more;

	$recent = new WP_Query("post_type=post&showposts=3"); while($recent->have_posts()) : $recent->the_post();
		$more = 0;  
	?>
		<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
		<?php the_content("Read More..."); ?>
	<?php endwhile; ?>
	<!--
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur odio eget est vehicula viverra. Maecenas tincidunt sagittis pharetra. </p>
		<a href="#">Find out more</a>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur odio eget est vehicula viverra. Maecenas tincidunt sagittis pharetra. </p>
		<a href="#">Find out more</a>
	-->
</div>
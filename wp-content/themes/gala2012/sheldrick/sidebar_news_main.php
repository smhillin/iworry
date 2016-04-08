<div class="sidebar-news-main">
	<ul>
		<li><h3>Most Recent:</h3></li>
	<?php
		$recent = new WP_Query("post_type=post&showposts=8"); while($recent->have_posts()) : $recent->the_post();?>
		<li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>
	<?php endwhile; ?>

	<?php dynamic_sidebar( 'main-news-archive' ) ?>
	</ul>
</div>
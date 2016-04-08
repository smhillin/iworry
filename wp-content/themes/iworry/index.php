<?php get_header(); ?>	
	
	<div id="sliderwrap" class="container">
		<?php 
			$count =1;
			$slider = get_posts('post_type=slider');
			foreach ($slider as $post) {
				setup_postdata($post);
			?>
			<div class="aslide slide-<?php echo $count; ?>">
				<?php if (get_field('type') == 'video') { ?>
					<iframe width="1300" height="480" src="//www.youtube.com/embed/<?php the_field('video_shortcode'); ?>" frameborder="0" allowfullscreen></iframe>
				<?php } else { ?>
					<a href="<?php the_field('url'); ?>" class="btn btn-default"><?php the_field('button_text'); ?></a>
					<img src="<?php echo get_bloginfo('template_directory'); ?>/timthumb.php?src=<?php the_field('slide'); ?>&amp;w=1300&amp;h=480&amp;zc=1" />
				<?php } ?>
			</div>
			<?php $count++;
			}
		?>
	</div><!-- slider -->
	
	<div id="shocker" class="container">
		<?php
			$shocker = of_get_option('shocker');
			$shocker = preg_split( '/\r\n|\r|\n/', $shocker );			
		?>
		<p><span class="redtext"><?php echo $shocker[0]; ?></span><span class="greytext"><?php echo $shocker[1]; ?></span></p>
	</div><!-- shocker -->

	<div id="calltoaction" class="container noise">

<h3>How will your help make a difference?</h3>
		<?php if (of_get_option('c2a')) { ?><iframe width="640" height="360" src="//www.youtube.com/embed/qsjczsGXEY8" frameborder="0" allowfullscreen></iframe><?php } ?><br><br>
<?php if (of_get_option('c2aurl')) { ?><a href="<?php echo get_permalink(of_get_option('c2aurl')); ?>" class="btn btn-primary">Take Action for Elephants</a><?php } ?>
	</div><!-- calltoaction -->

	
	<?php get_template_part('includes/content/launchpad'); ?>

<?php get_footer(); ?>
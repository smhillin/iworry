<?php get_header(); ?>	
	
	<div id="pageheader" class="container">
		<?php $cat = get_query_var('cat'); if (get_field('header_pic', 'category_'.$cat)) { ?>
			<a href="<?php echo get_permalink(5); ?>" class="btn btn-primary">Take Action</a>
			<img src="<?php the_field('header_pic', 'category_'.$cat); ?>" />
		<?php } else { ?>
			<img src="<?php echo of_get_option('pageheader'); ?>" />
		<?php } ?>
	</div><!-- slider -->
	
	<div id="page" class="container newspage"><div class="inside">
		<div class="row">
			
			<div class="thecontent">
				<div class="padded">
					<h1>Latest NEWS</h1>
					<h2 class="singletitle"><?php the_title(); ?></h2>
				</div>
			</div>
			
		</div>
	</div></div><!-- page -->
	
	<div id="news" class="container noise newspage">
		<div class="inside">
			
			<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), full ); ?>
				<div class="newsitem bigpost thecontent clearfix">
					
					<?php if ($thumbnail) { ?><div class="newspic pull-left"><img src="<?php echo get_bloginfo('template_directory'); ?>/timthumb.php?src=<?php echo $thumbnail[0] ?>&amp;w=210&amp;h=210&amp;zc=1" /></div><?php } ?>
					<div class="newstext pull-right <?php if (!$thumbnail) { echo "nothumb"; } ?>"<p><?php the_content(); ?></p></div>
				</div>
			<?php endwhile; endif; wp_reset_query(); ?>			
		</div>
	</div>
	

	

	<?php get_template_part('includes/content/launchpad'); ?>
	
<?php get_footer(); ?>
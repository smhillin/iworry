<?php /* Template Name: Donate */
get_header(); ?>	
	
	<div id="pageheader" class="container">
		<?php if (get_field('header_pic')) { ?>
			<a href="<?php echo get_permalink(5); ?>" class="btn btn-primary">Take Action</a>
			<img src="<?php the_field('header_pic'); ?>" />
		<?php } else { ?>
			<img src="<?php echo of_get_option('pageheader'); ?>" />
		<?php } ?>
	</div><!-- slider -->
	
	<div id="page" class="container donatepage"><div class="inside">
		<div class="row">
			
			<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), full ); ?>
				<div class="thecontent">
					<div class="padded">
						<h1><?php the_title(); ?></h1>
						<?php the_content(); ?>
					</div>
				</div>
			<?php endwhile; endif; ?>
			
		</div>
	</div></div><!-- page -->

	<div id="donatefyi" class="container noise donatepage">
		<div class="inside">
		
		<h3>YOUR donation will mean</h3>
		
		<div class="donateicons clearfix">
		<?php $count = 0; if (get_field('repeater')) { while(has_sub_field('repeater')) : $count++;?>
			<div class="donateitem thecontent">
				<div class="donateicon"><img src="<?php the_sub_field('image'); ?>" /></div>		
				<div class="donateinfo"><?php echo wpautop(get_sub_field('content')); ?></div>
			</div>
		<?php endwhile; } ?>
		</div>
		
		<a href="<?php echo of_get_option('donatelink'); ?>" class="btn btn-primary donatebutton" target="_blank">Donate Today</a>
		
		</div>
	</div>	

	<?php get_template_part('includes/content/launchpad'); ?>

<?php get_footer(); ?>
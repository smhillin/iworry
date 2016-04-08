<?php /* Template Name: Contact */
get_header(); ?>	
	
	<div id="pageheader" class="container">
		<?php if (get_field('header_pic')) { ?>
			<a href="<?php echo get_permalink(5); ?>" class="btn btn-primary">Take Action</a>
			<img src="<?php the_field('header_pic'); ?>" />
		<?php } else { ?>
			<img src="<?php echo of_get_option('pageheader'); ?>" />
		<?php } ?>
	</div><!-- slider -->
	
	<div id="page" class="container contactpage"><div class="inside">
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

	<div id="contact" class="container noise contactpage">
		<div class="inside">
			
			<div class="contactarea">
				<div class="branches">
					<h3>Contact Details</h3>
					<?php if (get_field('branches')) { while(has_sub_field('branches')) : ?>
						<div class="branch">
							<div class="location"><?php the_sub_field('location'); ?></div>
							<div class="name"><?php the_sub_field('name'); ?></div>
							<div class="address"><?php nl2br(the_sub_field('address')); ?></div>
						</div>
					<?php endwhile; } ?>
				</div>
				
				<div class="contactform">
					<h3>Enquiry Form</h3>
					<?php gravity_form(1, false, false, '', '', true, ''); ?>
					
					<?php if ($thumbnail) { ?><div class="contactelephants"><img src="<?php echo $thumbnail[0]; ?>" /></div><?php } ?>
				</div>
			</div>
			
		</div>
	</div>	

	<?php get_template_part('includes/content/launchpad'); ?>

<?php get_footer(); ?>
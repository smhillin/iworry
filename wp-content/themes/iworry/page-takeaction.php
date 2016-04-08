<?php /* Template Name: Take Action */
get_header(); ?>	
	
	<div id="pageheader" class="container">
		<?php if (get_field('header_pic')) { ?>
			<a href="<?php echo get_permalink(5); ?>" class="btn btn-primary">Take Action</a>
			<img src="<?php the_field('header_pic'); ?>" />
		<?php } else { ?>
			<img src="<?php echo of_get_option('pageheader'); ?>" />
		<?php } ?>
	</div><!-- slider -->
	
	<div id="page" class="container takeaction"><div class="inside">
		<div class="row">
			
			<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), full ); ?>
				<div class="thecontent">
					<div class="padded">
						<?php the_content(); ?>
					</div>
				</div>
			<?php endwhile; endif; ?>
			
		</div>
	</div></div><!-- page -->

	<div id="signpetition" class="container noise takeaction">
		<div class="inside" style="max-width:1010px;">
		
			<div id="petitionform">
				<p>With more names we can show governments that the world is watching and demanding action to save elephants.</p>
				<p><i><span class="redtext">Sign the Petition and make a difference:</span></i></p>
				<?php gravity_form(3, false, false, '', '', true, ''); ?>
			</div>
		</div>
	</div><!-- signpetition -->

	<div id="repeater" class="container noise takeaction"><div id="repeaters" class="inside">

		<?php 
			$count = 1; 
			$actions = get_pages('sort_column=menu_order&post_type=page&post_parent='.$post->ID.'&child_of='.$post->ID);
			foreach ($actions as $post) {
				setup_postdata($post); 
				$thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), full );
		?>

				<div class="repeateritem clearfix thecontent">
					<h4><a class="accordion-toggle" data-toggle="collapse" data-parent="#repeaters" href="#<?php echo $post->post_name; ?>"><span class="repeatercount"><?php echo $count;?></span><span class="greyblock"><?php the_title(); ?></span></a></h4>
	
					<div id="<?php echo $post->post_name; ?>" class="panel-collapse collapse clearfix in">
						<?php if ($thumbnail) { ?><img src="<?php echo $thumbnail[0]; ?>" alt="" /><?php } ?>
						<div class="thecontent"><?php the_content(); ?></div>
					</div>
				</div>

		<?php $count++; } ?>


	</div></div><!-- repeater -->
	

	<?php get_template_part('includes/content/launchpad'); ?>

<?php get_footer(); ?>
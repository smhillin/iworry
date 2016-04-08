<?php /* Template Name: The Crisis */
get_header(); ?>	
	
	<div id="pageheader" class="container">
		<?php if (get_field('header_pic')) { ?>
			<a href="<?php echo get_permalink(5); ?>" class="btn btn-primary">Take Action</a>
			<img src="<?php the_field('header_pic'); ?>" />
		<?php } else { ?>
			<img src="<?php echo of_get_option('pageheader'); ?>" />
		<?php } ?>
	</div><!-- slider -->
	
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), full ); ?>
	<div id="page" class="container thecrisis" <?php if ($thumbnail) { ?>style="background: #fff url('<?php echo $thumbnail[0]; ?>') right bottom no-repeat; "<?php } ?>><div class="inside">
		<div class="row clearfix">
			
			<div class="thecontent">
				<div class="padded"><?php the_content(); ?></div>
			</div>
			
		</div>
	</div></div><!-- page -->
	<?php endwhile; endif; wp_reset_query(); ?>
	
	<div id="repeater" class="container noise thecrisis"><div id="repeaters" class="inside">
			
		<?php $count = 0; if (get_field('repeater')) { while(has_sub_field('repeater')) : $count++;?>
			<div class="repeateritem clearfix thecontent">
				<h4><a class="accordion-toggle <?php if ($count > 1) { echo "collapsed"; } ?>" data-toggle="collapse" data-parent="#repeaters" href="#item-<?php echo $count; ?>"><span><?php the_sub_field('title'); ?></span></a></h4>

				<div id="item-<?php echo $count; ?>" class="panel-collapse collapse clearfix <?php if ($count == 1) { echo "in"; } ?>">
					<div class="altrowcontent"><?php echo wpautop(get_sub_field('content')); ?></div>
					<div class="altrowpic"><img src="<?php the_sub_field('image'); ?>" /></div>					
				</div>
			</div>
		<?php endwhile; } ?>
			
	</div></div><!-- repeater -->

	<?php get_template_part('includes/content/launchpad'); ?>

<?php get_footer(); ?>
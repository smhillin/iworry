<?php /* Template Name: The Campaign */
get_header(); ?>	
	
	<div id="pageheader" class="container">
		<?php if (get_field('header_pic')) { ?>
			<a href="<?php echo get_permalink(5); ?>" class="btn btn-primary">Take Action</a>
			<img src="<?php the_field('header_pic'); ?>" />
		<?php } else { ?>
			<img src="<?php echo of_get_option('pageheader'); ?>" />
		<?php } ?>
	</div><!-- slider -->
	
	<div id="page" class="container thecampaign"><div class="inside">
		<div class="row">
			
			<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), full ); ?>
				<div class="thecontent" <?php if ($thumbnail) { ?>style="background: url('<?php echo $thumbnail[0]; ?>') right bottom no-repeat; "<?php } ?>>
					<div class="padded"><?php the_content(); ?></div>
				</div>
			<?php endwhile; endif; wp_reset_query(); ?>
			
		</div>
	</div></div><!-- page -->
	
	<div id="repeater" class="container noise thecampaign"><div id="repeaters" class="inside">
			
		<?php $count = 0; if (get_field('repeater')) { while(has_sub_field('repeater')) : $count++;?>
			<div class="repeateritem clearfix thecontent">
				<h4 class="arrowedheading"><?php the_sub_field('title'); ?></h4>
				<div class="altrowcontent"><?php echo wpautop(get_sub_field('content')); ?></div>
			</div>
		<?php endwhile; } ?>
			
	</div></div><!-- repeater -->
	
	<div id="celebslist" class="container noise thecampaign">
		<div class="inside">
			<h3>iworry celebrity support</h3>
			<p>Celebrity supporters around the world are standing up for elephants. Please see below the celebrities currently supporting iworry.</p>
			
			<div class="userlist">
			<?php
				$args = array('role' => 'celebrity');

				$users = get_users($args);
				foreach ($users as $user) { ?>
			
				<div class="auser">
					<div class="userpic"><div class="userpiccrop"><?php userphoto($user->ID); ?></div></div>
					<div class="username"><?php echo $user->display_name; ?></div>
				</div>
				
			<?php } ?>
			</div>

			<div id="quotes" class="carousel slide" data-interval="12000">
				<div class="carousel-inner">
					
					<?php
						$count = 0;
						$quotes = get_posts('post_type=quotes&posts_per_page=15');
						foreach ($quotes as $post) {
							setup_postdata($post);
							$count++;
					?>
					<div class="item aquote <?php if ($count == 1) { echo "active"; } ?>">
						<blockquote>"<?php echo get_the_content(); ?>" <span>- <?php the_title(); ?></span></blockquote>
					</div>
					<?php } ?>
					
				</div>
			</div><!-- quotes -->
			
		</div>
	</div>

	<?php get_template_part('includes/content/launchpad'); ?>
	
<?php get_footer(); ?>
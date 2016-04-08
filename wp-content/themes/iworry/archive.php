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
					<p>Keep up to date with the latest ivory and elephant news from around the world.</p>
				</div>
			</div>
			
		</div>
	</div></div><!-- page -->
	
	<div id="news" class="container noise newspage">
		<div class="inside">
			
			<?php query_posts($query_string.'&post_type=post&posts_per_page=1'); if ( have_posts() ) : while ( have_posts() ) : the_post(); $thumbnail = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), full ); ?>
				<div class="newsitem bigpost thecontent clearfix">
					<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
					
					<?php if ($thumbnail) { ?><div class="newspic pull-left"><img src="<?php echo get_bloginfo('template_directory'); ?>/timthumb.php?src=<?php echo $thumbnail[0] ?>&amp;w=210&amp;h=210&amp;zc=1" /></div><?php } ?>
					<div class="newstext pull-right <?php if (!$thumbnail) { echo "nothumb"; } ?>"><p><?php echo custom_excerpt(200, '...');?></p><a href="<?php the_permalink(); ?>" class="btn btn-primary">Read More</a></div>
					
				</div>
			<?php endwhile; endif; wp_reset_query(); ?>
			
			<div class="othernews">
				<div class="morenews">
					<h5 class="arrowedheading">More News</h5>
					<ul>
						<?php $news = get_posts($query_string.'&post_type=post&offset=1&posts_per_page=25'); foreach ($news as $item) { ?>
						<li><a href="<?php echo get_permalink($item->ID); ?>"><?php echo get_the_title($item->ID); ?></a></li>
						<?php } ?>
					</ul>
				</div>
				
				<div class="allarchives">
					<h5 class="arrowedheading">All Archives</h5>
					<ul>
						<?php wp_get_archives( array( 'type' => 'monthly', 'limit' => 12 ) ); ?>
					</ul>
				</div>
			</div>
			
		</div>
	</div>
	

	

	<?php get_template_part('includes/content/launchpad'); ?>
	
<?php get_footer(); ?>
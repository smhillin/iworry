<?php
/**
 * The template for displaying all pages.
 *
 * @package WordPress
 * @subpackage Sheldrick
 * @since Sheldrick 1.0
 */

get_header(); ?>

<div class="clearfix narrowbar">
	<div class="main-wide">
	<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
		<?php if ( is_front_page() ) { ?>
			<h2 class="entry-title"><?php the_title(); ?></h2>
		<?php } else { ?>	
			<h1 class="entry-title"><?php the_title(); ?></h1>
		<?php } ?>
			<div class="entry-content">
				<?php the_content(); ?>
			</div><!-- .entry-content -->
		</article><!-- #post-## -->
	<?php endwhile; ?>
	</div>

	<div class="sidebar-narrow">
		<?php
			include("sidebar_book.php");
			include("sidebar_about.php");
			include("sidebar_auction.php");
			include("sidebar_news.php");
		?>
	</div>
</div>

<?php get_footer(); ?>
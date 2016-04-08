<?php
/**
 * Template Name: Front page layout
 *
 * @package WordPress
 * @subpackage Sheldrick
 * @since Sheldrick 1.0
 */

get_header(); ?>
<div class="clearfix widebar">
	<div class="main-narrow">
	<?php while ( have_posts() ) : the_post(); ?>

		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<h1 class="entry-title"><?php the_title(); ?></h1>

			<div class="entry-content">
				<?php the_content( __( 'Continue reading <span class="meta-nav">&rarr;</span>', 'boilerplate' ) ); ?>
				<?php wp_link_pages( array( 'before' => '<div class="page-link">' . __( 'Pages:', 'boilerplate' ), 'after' => '</div>' ) ); ?>
			</div><!-- .entry-content -->

		</article><!-- #post-## -->

	<?php endwhile; // End the loop. Whew. ?>
	</div>

	<div class="sidebar-wide">
		<?php
			include("sidebar_book.php");
			include("sidebar_about.php");
		?>
		<div class="clearfix">
		<?php
			include("sidebar_auction.php");
			include("sidebar_news.php");
		?>
		</div>
	</div>
</div>

<?php get_footer(); ?>
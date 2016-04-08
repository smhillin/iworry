<?php
/**
 * The template for displaying all pages.
 *
 * @package WordPress
 * @subpackage Sheldrick
 * @since Sheldrick 1.0
 */

get_header('post'); ?>

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>
	<section id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<h1 class="entry-title"><?php the_title(); ?></h1>
	<?php the_content(); ?>
	</section><!-- #post-## -->
<?php endwhile; ?>

<?php get_footer(); ?>
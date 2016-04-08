<?php
/**
 * The template for displaying Category Archive pages.
 *
 * @package WordPress
 * @subpackage Boilerplate
 * @since Boilerplate 1.0
 */

get_header('post'); ?>
	<section>
	<?php
		/* Run the loop for the category page to output the posts.
		 * If you want to overload this in a child theme then include a file
		 * called loop-category.php and that will be used instead.
		 */
		get_template_part( 'loop', 'category' );
	?>
	</section>

<?php get_footer(); ?>
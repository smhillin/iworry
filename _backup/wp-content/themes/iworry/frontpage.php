<?php

/**

 * Template Name: Front page layout

 *

 * @package WordPress

 * @subpackage Sheldrick

 * @since Sheldrick 1.0

 */



get_header(); ?>

<?php 	

    $lang = explode('_', get_locale());
    $lang = $lang[0];

	$args = array(
		'orderby' => 'menu_order',
		'order' => 'ASC',
		'post_type' => 'page', 
		'tax_query' => array(
			array(
				'taxonomy' => 'language',
				'field' => 'slug',
				'terms' => $lang
			)
		)
	);
	$query = new WP_Query( $args );

?>

<?php $pages = $query->get_posts(); //get_pages( array('sort_column' => 'menu_order', 'include' => array('7','9','11','13')) );

/*get_pages( array('sort_column' => 'menu_order', 'exclude' => array('4')) );*/ ?>



<?php foreach ( $pages as $page ) { 



	$content = $page->post_content;

	if(! $content && $page->ID != "11" && $page->ID != "203" && $page->ID != "205")
		continue;


	$content = apply_filters( 'the_content', $content );

?>



	<section id="<?php echo($page->post_name); ?>">

	<h1 class="entry-title"><?php echo($page->post_title); ?></h1>

	<?php echo($content); ?>

	<?php if($page->ID == "11" || $page->ID == "203" || $page->ID == "205"): ?>

		<?php 

			$newsargs = array(
				'post_type' => 'post',
				'posts_per_page'=>'5',
				'tax_query' => array(
					array(
						'taxonomy' => 'language',
						'field' => 'slug',
						'terms' => $lang
					)
				)
			);

			$newsposts = new WP_Query( $newsargs );
			$posts = $newsposts->get_posts();

			$post = $posts[0];

			$title = $post->post_title;

			$content = $post->post_content;

			$content = apply_filters( 'the_content', $content );

		?>

		<h3><?php echo $title; ?></h3>

		<div class="columns">

			<?php echo $content; ?>

		</div>

		<div class="news-archive clearfix">

	        <div class="latest">

	          <h4>Latest News</h4>

	          <ul>

				<?php foreach ( $posts as $post ) :	setup_postdata($post); ?>

	            	<li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>

				<?php endforeach; ?>

	          </ul>

	        </div>



	        <div class="archive">

	          <h4>All Archives</h4>

	          <ul class="clearfix">

	          	<?php wp_get_archives('type=monthly'); ?>

	          </ul>

	        </div>

      	</div>





	<?php endif; ?>

	</section>



<?php } ?>



<?php get_footer(); ?>
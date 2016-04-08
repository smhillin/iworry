<?php
/**
 * @since Twenty Ten 1.0
 * @uses register_sidebar
 */

function sheldrick_widgets_init() {
	// Area 1, located on the Index Page Template.
	/*
	register_sidebar( array(
		'name' => 'Index Sidebar',
		'id' => 'index-sidebar',
		'description' => 'widgets for the index page',
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );

	// Area 2, located on the Page Template.
	register_sidebar( array(
		'name' => 'Narrow Sidebar',
		'id' => 'narrow-sidebar',
		'description' => 'sidebar for general pages',
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );
	*/

	// Area 3, located on the News Template.
	register_sidebar( array(
		'name' => 'News Sidebar',
		'id' => 'main-news-archive',
		'description' => 'sidebar for news section',
		'before_widget' => '<li id="%1$s" class="widget-container %2$s">',
		'after_widget' => '</li>',
		'before_title' => '<h3 class="widget-title">',
		'after_title' => '</h3>',
	) );


}

add_action( 'widgets_init', 'sheldrick_widgets_init' );
?>
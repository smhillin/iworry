<?php

	add_action('init', 'quotes_post_type');

	function quotes_post_type() 
	{
	  $quotes_labels = array(
		'name' => _x('Quote', 'post type general name'),
		'singular_name' => _x('Quote', 'post type singular name'),
		'add_new' => _x('Add Quote', 'article'),
		'add_new_item' => __('Add New Quote'),
		'edit_item' => __('Edit Quote'),
		'new_item' => __('New Quote'),
		'view_item' => __('View Quote'),
		'search_items' => __('Search Quotes'),
		'not_found' =>  __('No Quotes found'),
		'not_found_in_trash' => __('No Quotes found in Trash'), 
		'parent_item_colon' => '',
		'menu_name' => 'Quote'
	
	  );
	  $quotes_settings = array(
		'labels' => $quotes_labels,
		'public' => true,
		'publicly_queryable' => true,
		'show_ui' => true, 
		'show_in_menu' => true,
		'menu_position' => '100',
		'query_var' => true,
		'rewrite' => true,
		'capability_type' => 'post',
		'has_archive' => true, 
		'hierarchical' => false,
		'menu_position' => null,
		'supports' => array('title','editor','author','thumbnail','comments'),
		'menu_icon' => get_bloginfo('template_directory').'/images/icon-quotes.png'
	  ); 
	  register_post_type('quotes',$quotes_settings);

	};
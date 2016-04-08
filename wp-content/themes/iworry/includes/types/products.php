<?php

	add_action('init', 'products_post_type');
	
	function products_post_type() 
	{
	  $products_labels = array(
		'name' => _x('Products', 'post type general name'),
		'singular_name' => _x('Products', 'post type singular name'),
		'add_new' => _x('Add Products', 'article'),
		'add_new_item' => __('Add New Products'),
		'edit_item' => __('Edit Products'),
		'new_item' => __('New Products'),
		'view_item' => __('View Products'),
		'search_items' => __('Search Products'),
		'not_found' =>  __('No Products found'),
		'not_found_in_trash' => __('No Products found in Trash'), 
		'parent_item_colon' => '',
		'menu_name' => 'Products'
	
	  );
	  $products_settings = array(
		'labels' => $products_labels,
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
		'menu_icon' => get_bloginfo('template_directory').'/images/icon-products.png'
	  ); 
	  register_post_type('products',$products_settings);

	};
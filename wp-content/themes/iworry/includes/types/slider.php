<?php

	add_action('init', 'slider_post_type');
	
	function slider_post_type() 
	{
	  $slider_labels = array(
		'name' => _x('Slide', 'post type general name'),
		'singular_name' => _x('Slide', 'post type singular name'),
		'add_new' => _x('Add Slide', 'article'),
		'add_new_item' => __('Add New Slide'),
		'edit_item' => __('Edit Slide'),
		'new_item' => __('New Slide'),
		'view_item' => __('View Slide'),
		'search_items' => __('Search Slides'),
		'not_found' =>  __('No Slides found'),
		'not_found_in_trash' => __('No Slides found in Trash'), 
		'parent_item_colon' => '',
		'menu_name' => 'Slide'
	
	  );
	  $slider_settings = array(
		'labels' => $slider_labels,
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
		'menu_icon' => get_bloginfo('template_directory').'/images/icon-slider.png'
	  ); 
	  register_post_type('slider',$slider_settings);

	};


	// add columns
	
		add_filter('manage_edit-slider_columns', 'slider_admin_columns');
		function slider_admin_columns($columns) {
			$new_columns['cb'] = '<input type="checkbox" />';
	 
			$new_columns['slide'] = __('Slider Pic');
			$new_columns['url'] = __('Slider Target');
	 
			return $new_columns;
		}

	// customize columns 
	
		add_action('manage_slider_posts_custom_column', 'manage_slider_columns', 10, 2);
	 
		function manage_slider_columns($column_name, $id) {
			
			global $wpdb, $post;
			switch ($column_name) {
			case 'slide' :
				$thumbnail = "<img src='".get_field('slide', $post->ID)."' style='max-width:400px;' /></a>";
				echo edit_post_link($thumbnail, '', '', $post->ID );
				break;

			case 'url':
				echo edit_post_link(get_field('url', $post->ID), '', '', $post->ID );
					break;
			default:
				break;
			}
		}


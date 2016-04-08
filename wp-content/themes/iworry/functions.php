<?php

/*
	// php error console // ONLY ENABLE IF YOU HAVE PHP CONSOLE CHROME EXTENSION
		get_template_part('includes/functions/logs/PhpConsole');
*/

	// options panel
	
		if ( !function_exists( 'optionsframework_init' ) ) {
			define( 'OPTIONS_FRAMEWORK_DIRECTORY', get_template_directory_uri() . '/inc/' );
			require_once dirname( __FILE__ ) . '/inc/options-framework.php';
		}
	

	// user roles

		add_role('supporter', 'Supporter', array(
			'read' => true, // True allows that capability
			'edit_posts' => true,
			'delete_posts' => false, // Use false to explicitly deny
		));
		add_role('celebrity', 'Celebrity', array(
			'read' => true, // True allows that capability
			'edit_posts' => true,
			'delete_posts' => false, // Use false to explicitly deny
		));
		add_role('location', 'Location', array(
			'read' => true, // True allows that capability
			'edit_posts' => true,
			'delete_posts' => false, // Use false to explicitly deny
		));
			
		function get_user_role() {
			global $current_user;
			
			$user_roles = $current_user->roles;
			$user_role = array_shift($user_roles);
			
			return $user_role;
		}			



	// define user id
	
		if (is_user_logged_in()) {
			global $current_user;
			get_currentuserinfo();
			define('USERID', $current_user->ID);
		}

	// custom fields
			
		// move it to the menu bar
			
			if (USERID == '1') {
				function custom_field_menubar() {
				    global $wp_admin_bar;
				
				    $wp_admin_bar->add_menu( array(
				        'parent' => 'my-account-with-avatar',
				        'id' => 'custom_field_stuff',
				        'title' => __('Custom Fields'),
				        'href' => admin_url( 'edit.php?post_type=acf')
				    ) );
				}
				add_action( 'wp_before_admin_bar_render', 'custom_field_menubar' );
			}

	// gets

		get_template_part('includes/functions/advanced-custom-fields/acf');
		get_template_part('includes/functions/acf-repeater/acf-repeater');

		get_template_part('includes/functions/browser');
		
		get_template_part('includes/types/slider');
		get_template_part('includes/types/products');
		get_template_part('includes/types/quotes');

		get_template_part('includes/functions/admin-buttons/buttons');
		get_template_part('includes/functions/user/profile');

		get_template_part('includes/functions/user/userform');

		get_template_part('includes/functions/shortcodes/supporterslist');
		get_template_part('includes/functions/shortcodes/productlist');
		//get_template_part('includes/functions/shortcodes/supporters');


	// admin

		add_filter( 'show_admin_bar', '__return_false' );

	// thumbs

		add_theme_support( 'post-thumbnails' );

	// menus

		if ( function_exists( 'register_nav_menus' ) ) {
			register_nav_menus(
				array(
				  'topmenu' => 'Main Menu',
				)
			);
		}

	// excerpt

		function custom_excerpt($count, $syntax) {
			$return = get_the_content($id);
			$return = preg_replace('`\[[^\]]*\]`','',$return);
			$return = strip_tags($return);
			$return = substr($return, 0, $count);
			$return = substr($return, 0, strripos($return, " "));
			$return = $return.$syntax;
			return $return;
		}

	// widgets

		register_sidebar(array(
			'name'=>'Sidebar',
			'before_widget' => '<div class="widget %s">',
			'after_widget' => '</div>',
			'before_title' => '<h4>',
			'after_title' => '</h4>',
		));


	// editor styles
			
		// custom styles
			
			add_filter( 'mce_buttons_2', 'my_mce_buttons_2' );
			
			function my_mce_buttons_2( $buttons ) {
			    array_unshift( $buttons, 'styleselect' );
			    return $buttons;
			}

			add_filter( 'tiny_mce_before_init', 'my_mce_before_init' );
			
			function my_mce_before_init( $settings ) {
			
			    $style_formats = array(
			        array(
			        	'title' => 'Red Text',
			        	'classes' => 'redtext',
			        	'inline' => 'span',
			        	'styles' => array(
			        		'color' => '#eb212e',
			        	)
			        )
			    );
			
			    $settings['style_formats'] = json_encode( $style_formats );
			
			    return $settings;
			
			}
			
			add_action( 'admin_init', 'add_my_editor_style' );
			
			function add_my_editor_style() {
				add_editor_style();
			}

	// pagination
	
		function pagination($prev = '&laquo;', $next = '&raquo;') {
		    global $wp_query, $wp_rewrite;
		    $wp_query->query_vars['paged'] > 1 ? $current = $wp_query->query_vars['paged'] : $current = 1;
		    $pagination = array(
		        'base' => @add_query_arg('paged','%#%'),
		        'format' => '',
		        'total' => $wp_query->max_num_pages,
		        'current' => $current,
		        'prev_text' => __($prev),
		        'next_text' => __($next),
		        'type' => 'plain'
		);
		    if( $wp_rewrite->using_permalinks() )
		        $pagination['base'] = user_trailingslashit( trailingslashit( remove_query_arg( 's', get_pagenum_link( 1 ) ) ) . 'page/%#%/', 'paged' );
		
		    if( !empty($wp_query->query_vars['s']) )
		        $pagination['add_args'] = array( 's' => get_query_var( 's' ) );
		
		    echo paginate_links( $pagination );
		};
		
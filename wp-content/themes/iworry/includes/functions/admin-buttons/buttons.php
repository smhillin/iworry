<?php
	add_shortcode( 'button', 'button' );
	function button( $atts ) {
		extract( shortcode_atts( array(
			'url' => '',
			'text' => '',
			'align' => ''
		), $atts ) );
		
		return "<a href='".$url."' class='btn btn-primary btn-shortcode pull-".$align."'>".$text."</a>";
	}
	
	
	add_action( 'init', 'tyl_buttons' );
	function tyl_buttons() {
		add_filter("mce_external_plugins", "tyl_add_buttons");
	    add_filter('mce_buttons', 'tyl_register_buttons');
	}	
	function tyl_add_buttons($plugin_array) {
		$plugin_array['tyl'] = get_template_directory_uri() . '/includes/functions/admin-buttons/buttons.js';
		return $plugin_array;
	}
	function tyl_register_buttons($buttons) {
		array_push( $buttons, 'button' ); // dropcap', 'recentposts
		return $buttons;
	}
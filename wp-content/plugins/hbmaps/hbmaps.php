<?php
/**
 * The WordPress Plugin Boilerplate.
 *
 * A foundation off of which to build well-documented WordPress plugins that also follow
 * WordPress coding standards and PHP best practices.
 *
 * @package   HB Maps
 * @author    Hanno Bean <hanno.bean@gmail.com>
 * @license   GPL-2.0+
 * @link      http://hannobean.myetrayz.net:8069/
 * @copyright 2013 Hanno Bean
 *
 * @wordpress-plugin
 * Plugin Name: HBMaps
 * Plugin URI:  http://hannobean.myetrayz.net:8069/
 * Description: Custom Google Maps Plugin
 * Version:     1.0.0
 * Author:      Hanno Bean
 * Author URI:  http://hannobean.myetrayz.net:8069/
 * Text Domain: hbmaps-locale
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Domain Path: /lang
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

// replace `class-plugin-name.php` with the name of the actual plugin's class file
require_once( plugin_dir_path( __FILE__ ) . 'class-hbmaps.php' );

// Register hooks that are fired when the plugin is activated, deactivated, and uninstalled, respectively.
// replace Plugin_Name with the name of the plugin defined in `class-plugin-name.php`
register_activation_hook( __FILE__, array( 'HB_Maps', 'activate' ) );
register_deactivation_hook( __FILE__, array( 'HB_Maps', 'deactivate' ) );

// replace Plugin_Name with the name of the plugin defined in `class-plugin-name.php`
HB_Maps::get_instance();
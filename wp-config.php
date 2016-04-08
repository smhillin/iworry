<?php

/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'thedswt1_gala2012');

/** MySQL database username */
define('DB_USER', 'thedswt1_galaall');

/** MySQL database password */
define('DB_PASSWORD', '(3rE2vVmVbPTs$^R');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'V1g R#N2bW,+o`>NjAF`<+|eJK4h2Aw;D1/1nv-gp]4GF#}ST-Lh;z=a_[U/3DBh');
define('SECURE_AUTH_KEY',  'kXbCDTS%>h 0uq.~qt>Zm(?V9T%^W8GArbX^v98sX|{|EfR)fn#+BR23W%f|l[z-');
define('LOGGED_IN_KEY',    'v;=v|i/l444QtEK,2-r&]w-HP?c?Dr~-@K@cyh^-oeL!>nbVj5 -Hw-6Ril?h@HZ');
define('NONCE_KEY',        '>5}5Er~UJ~gN1t#K:[ma9c-mC!!1+a*+vrCZ&7KR0$-Ug+n|EukW^7,9c`~YCybn');
define('AUTH_SALT',        ')#U?*<I,=j%4m`|.fh-|3EyeeUa|[hTZImS_)IUi#7NXOCEtL-Pj+gs}Q<r<FCZ&');
define('SECURE_AUTH_SALT', '.||]-cqQ0$[3y?R4)n1**ug7NyoB+{f|ATx;G8rZ!@p.>nkM9]/++H*0FyE06Mh|');
define('LOGGED_IN_SALT',   ',SPOmkC|%MD+$AI)8;vBCXdn,Y#YUL=Lo[ncZUi(`>eRz5zcGR JT!>N52$J[`cw');
define('NONCE_SALT',       'crgD(;c;Al2{j}I(Eu.}_u6eEN#{v#&*<lS8Wx>Y,T6yvQ(stW1|%M|n6dg.:2HW');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'iw_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

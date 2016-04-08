<?php
	//var_dump(_POST);
	//var_dump($_FILES);
	//exit;
	// bootstrap


	$root = dirname(dirname(dirname(dirname(dirname(dirname(dirname(__FILE__)))))));
	
	if (file_exists($root.'/wp-load.php')) {
		require_once($root.'/wp-load.php');
	} else {
		exit;
	}
	require(ABSPATH.'wp-admin/includes/file.php');

	$theuser = $_POST;

	
	function fs_get_wp_config_path()
	{
    $base = dirname(__FILE__);
    $path = false;

    if (@file_exists(dirname(dirname($base))."/wp-config.php"))
    {
        $path = dirname(dirname($base))."/wp-config.php";
    }
    else
    if (@file_exists(dirname(dirname(dirname($base)))."/wp-config.php"))
    {
        $path = dirname(dirname(dirname($base)))."/wp-config.php";
    }
    else
    $path = false;

    if ($path != false)
    {
        $path = str_replace("\\", "/", $path);
    }
    return $path;
	}
	
	//print_r($_FILES);
	//exit;
	
	$userdata = array(
		'user_pass'		=>	wp_generate_password(),
		'user_login'	=>	strtolower($theuser['first_name']).'_'.strtolower($theuser['last_name']),
		'user_nicename'	=>	$theuser['first_name'].' '.$theuser['last_name'],
		'user_email'	=>	$theuser['email'],
		'display_name'	=>	$theuser['first_name'],
		'nickname'		=>	$theuser['first_name'],
		'first_name'	=>	$theuser['first_name'],
		'last_name'		=>	$theuser['last_name'],
		'role'			=>	'supporter'
	);
		
	$new_user = absint(wp_insert_user($userdata));

	if( $new_user > 0 ){
		
		$uploaddir = $root . "/wp-content/uploads/userphoto/";
		//$uploadfile = $uploaddir . basename($_FILES['avatar']['name']);
		$uploadfile = $uploaddir . $new_user . '.jpg';
		
		update_user_meta($new_user, 'userphoto_image_file', $new_user . '.jpg');
		update_user_meta($new_user, 'userphoto_thumb_file', $new_user . '.jpg');
		update_user_meta($new_user, 'coords', $theuser['address'] );
		update_user_meta($new_user, 'userphoto_approvalstatus', '2');

		if (move_uploaded_file($_FILES['avatar']['tmp_name'], $uploadfile)) {
			header('Location: '.get_permalink(5).'?joined=yes');
		} else {
			echo "Possible file upload attack!\n";
		}

	}
<?php
if(preg_match('#' . basename(__FILE__) . '#', $_SERVER['PHP_SELF'])) { die('You are not allowed to call this page directly.'); }

global $wpdb;
global $easy_gallery_table;
global $easy_gallery_image_table;

$imageResults = null;

$galleryResults = $wpdb->get_results( "SELECT * FROM $easy_gallery_table" );

//Select gallery
if(isset($_POST['select_gallery']) || isset($_POST['galleryId'])) {
	if(check_admin_referer('wpeg_gallery','wpeg_gallery')) {
	  $gid = intval((isset($_POST['select_gallery'])) ? esc_sql($_POST['select_gallery']) : esc_sql($_POST['galleryId']));
	  $imageResults = $wpdb->get_results( "SELECT * FROM $easy_gallery_image_table WHERE gid = $gid ORDER BY sortOrder ASC" );
	  $gallery = $wpdb->get_row( "SELECT * FROM $easy_gallery_table WHERE Id = $gid" );
	}
}

//Add image
if(isset($_POST['galleryId']) && !isset($_POST['switch'])) {
	if(check_admin_referer('wpeg_gallery','wpeg_gallery')) {
	  $gid = intval(sanitize_text_field($_POST['galleryId']));
	  $imagePath = sanitize_text_field($_POST['upload_image']);
	  $imageTitle = sanitize_text_field($_POST['image_title']);
	  $imageDescription = sanitize_text_field($_POST['image_description']);
	  $sortOrder = intval(sanitize_text_field($_POST['image_sortOrder']));
	  $imageAdded = $wpdb->insert( $easy_gallery_image_table, array( 'gid' => $gid, 'imagePath' => $imagePath, 'title' => $imageTitle, 'description' => $imageDescription, 'sortOrder' => $sortOrder ) );
	  
	  if($imageAdded) {
	  ?>
		  <div class="updated"><p><strong><?php _e('Image saved.' ); ?></strong></p></div>  
	  <?php }
	  //Reload images
	  $imageResults = $wpdb->get_results( "SELECT * FROM $easy_gallery_image_table WHERE gid = $gid ORDER BY sortOrder ASC" );
	}
}

//Edit/Delete Images
if(isset($_POST['editing_images'])) {
	if(check_admin_referer('wpeg_gallery','wpeg_gallery')) {
		$editImageIds = array_map('absint', $_POST['edit_imageId']);
		$imagePaths = array_map('sanitize_text_field', $_POST['edit_imagePath']);
		$imageTitles = array_map('sanitize_text_field', $_POST['edit_imageTitle']);
		$imageDescriptions = array_map('sanitize_text_field', $_POST['edit_imageDescription']);
		$sortOrders = array_map('absint', $_POST['edit_imageSort']);
		$imagesToDelete = isset($_POST['edit_imageDelete']) ? array_map('absint', $_POST['edit_imageDelete']) : array();
	
		$i = 0;
		foreach($editImageIds as $editImageId) {
			if(in_array($editImageId, $imagesToDelete)) {
				$wpdb->query( "DELETE FROM $easy_gallery_image_table WHERE Id = '".$editImageId."'" );
				echo "Deleted: ".$imageTitles[$i];
			}
			else {
				$imageEdited = $wpdb->update( $easy_gallery_image_table, array( 'imagePath' => $imagePaths[$i], 'title' => $imageTitles[$i], 'description' => $imageDescriptions[$i], 'sortOrder' => $sortOrders[$i] ), array( 'Id' => $editImageId ) );
			}		
			$i++;
		}		  
	  ?>  
	  <div class="updated"><p><strong><?php _e('Images have been edited.' ); ?></strong></p></div>  
	  <?php		
	}
}
if(isset($_POST['editing_gid'])) {
	if(check_admin_referer('wpeg_gallery','wpeg_gallery')) {
	  $gid = intval(sanitize_text_field($_POST['editing_gid']));
	  $imageResults = $wpdb->get_results( "SELECT * FROM $easy_gallery_image_table WHERE gid = $gid ORDER BY sortOrder ASC" );
	  $gallery = $wpdb->get_row( "SELECT * FROM $easy_gallery_table WHERE Id = $gid" );
	}
}

?>

<div class='wrap wp-easy-gallery-admin'>
	<h2>Easy Gallery</h2>    
    <p>Add new images to gallery</p>
	<?php if(!isset($_POST['select_gallery']) && !isset($_POST['galleryId']) && !isset($_POST['editing_images'])) { ?>
    <p>Select a galley</p>		
    <form name="gallery" method="post" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>">
    	<?php wp_nonce_field('wpeg_gallery','wpeg_gallery'); ?>
        <select name="select_gallery" onchange="gallery.submit()">
        	<option> - SELECT A GALLERY - </option>
			<?php
				foreach($galleryResults as $gallery) {
					?><option value="<?php echo esc_attr($gallery->Id); ?>"><?php echo esc_html($gallery->name); ?></option>
                <?php
				}
			?>
        </select>
    </form>
    <?php } else if(isset($_POST['select_gallery']) || isset($_POST['galleryId']) || isset($_POST['editing_images'])) { ?>    
    <h3>Gallery: <?php echo esc_html($gallery->name); ?></h3>
    <form name="switch_gallery" method="post" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>">
    <input type="hidden" name="switch" value="true" />
    <p style="float: left;"><input type="submit" name="Submit" class="button-primary" value="Switch Gallery" /></p>
    </form>
    <p style="float: right;"><a href="http://labs.hahncreativegroup.com/wordpress-plugins/wp-easy-gallery-pro-simple-wordpress-gallery-plugin/?src=wpeg" target="_blank"><strong><em>Try WP Easy Gallery Pro</em></strong></a></p>
    <div style="Clear: both;"></div>
    
    <form name="add_image_form" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>" method="post">
    <input type="hidden" name="galleryId" value="<?php _e($gallery->Id); ?>" />
    <?php wp_nonce_field('wpeg_gallery','wpeg_gallery'); ?>
    <table class="widefat post fixed eg-table">
    	<thead>
        <tr>
            <th class="eg-cell-spacer-340">Image Path</th>
            <th class="eg-cell-spacer-150">Image Title</th>
            <th>Image Description</th>
            <th>Sort Order</th>
            <th class="eg-cell-spacer-115"></th>
        </tr>
        </thead>
        <tfoot>
        <tr>
            <th>Image Path</th>
            <th>Image Title</th>
            <th>Image Description</th>
            <th>Sort Order</th>
            <th></th>
        </tr>
        </tfoot>
        <tbody>
        	<tr>
            	<td><input id="upload_image" type="text" size="36" name="upload_image" value="" />
					<input id="upload_image_button" type="button" value="Upload Image" /></td>
                <td><input type="text" name="image_title" size="15" value="" /></td>
                <td><input type="text" name="image_description" size="35" value="" /></td>
                <td><input type="number" name="image_sortOrder" size="5" value="" /></td>
                <td class="major-publishing-actions"><input type="submit" name="Submit" class="button-primary" value="Add Image" /></td>
            </tr>        	
        </tbody>
     </table>
     </form>
     <?php } ?>
     <?php
	 if(count($imageResults) > 0) {
	 ?>
     <br />
     <hr />
     <p>Edit existing images in this gallery</p>
    <table class="widefat post fixed eg-table">
    	<thead>
        <tr>
        	<th class="eg-cell-spacer-80">Image Preview</th>
            <th class="eg-cell-spacer-700">Image Info</th>
            <th></th>            
        </tr>
        </thead>        
        <tbody>
<form name="edit_image_form" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>" method="post">	
<input type="hidden" name="editing_gid" value="<?php _e($gallery->Id); ?>" />
<input type="hidden" name="editing_images" value="true" />
<?php wp_nonce_field('wpeg_gallery', 'wpeg_gallery'); ?>	
        	<?php foreach($imageResults as $image) { ?>				
            <tr>
            	<td><a onclick="var images=['<?php echo esc_js($image->imagePath); ?>']; var titles=['<?php echo esc_js($image->title); ?>']; var descriptions=['<?php echo esc_js($image->description); ?>']; jQuery.prettyPhoto.open(images,titles,descriptions);" style="cursor: pointer;"><img src="<?php echo esc_attr($image->imagePath); ?>" width="75" alt="<?php echo esc_attr($image->title); ?>" /></a><br /><i><?php _e('Click to preview', 'wp-easy-gallery-pro'); ?></i></td>
                <td>                	
                	<input type="hidden" name="edit_gId[]" value="<?php echo esc_attr($image->gid); ?>" />
					<input type="hidden" name="edit_imageId[]" value="<?php echo esc_attr($image->Id); ?>" />                                        
                	<p><strong>Image Path:</strong> <input type="text" name="edit_imagePath[]" size="75" value="<?php echo esc_attr($image->imagePath); ?>" /></p>
                    <p><strong>Image Title:</strong> <input type="text" name="edit_imageTitle[]" size="15" value="<?php echo esc_attr($image->title); ?>" /></p>
                    <p><strong>Image Description:</strong> <input type="text" name="edit_imageDescription[]" size="60" value="<?php echo esc_attr($image->description); ?>" /></p>
                    <p><strong>Sort Order:</strong> <input type="number" name="edit_imageSort[]" size="10" value="<?php echo esc_attr($image->sortOrder); ?>" /></p>
					<p><strong>Delete Image?</strong> <input type="checkbox" name="edit_imageDelete[]" value="<?php echo esc_attr($image->Id); ?>" /></p>
                </td>
                <td></td>                
            </tr>
			<?php } ?>
        </tbody>		
     </table>
	 <p class="major-publishing-actions left-float eg-right-margin"><input type="submit" name="Submit" class="button-primary" value="Save Changes" /></p>
     </form>
	 <div style="clear:both;"></div>
     <?php } ?>
     <br />   
<?php include('includes/banners.php'); ?>
</div>
<?php
if(preg_match('#' . basename(__FILE__) . '#', $_SERVER['PHP_SELF'])) { die('You are not allowed to call this page directly.'); }

global $wpdb;
global $easy_gallery_table;
global $easy_gallery_image_table;

$galleryResults = $wpdb->get_results( "SELECT * FROM $easy_gallery_table" );

//Select gallery
if(isset($_POST['select_gallery']) || isset($_POST['galleryId'])) {
	if(check_admin_referer('wpeg_select_gallery','wpeg_select_gallery')) {
	  $gid = intval((isset($_POST['select_gallery'])) ? esc_sql($_POST['select_gallery']) : esc_sql($_POST['galleryId']));
	  $imageResults = $wpdb->get_results( "SELECT * FROM $easy_gallery_image_table WHERE gid = $gid ORDER BY sortOrder ASC" );
	  $gallery = $wpdb->get_row( "SELECT * FROM $easy_gallery_table WHERE Id = $gid" );
	}
}
	
if(isset($_POST['hcg_edit_gallery']))
{
	if(check_admin_referer('wpeg_edit_gallery','wpeg_edit_gallery')) {
	  if($_POST['galleryName'] != "") {
		$galleryName = sanitize_text_field($_POST['galleryName']);
		$galleryDescription = sanitize_text_field($_POST['galleryDescription']);	  
		$slug = mb_convert_case(str_replace(" ", "", sanitize_text_field($_POST['galleryName'])), MB_CASE_LOWER, "UTF-8");
		$imagepath = sanitize_text_field(str_replace("\\", "", $_POST['upload_image']));
		$thumbwidth = sanitize_text_field($_POST['gallerythumbwidth']);
		$thumbheight = sanitize_text_field($_POST['gallerythumbheight']);
		
		if(isset($_POST['hcg_edit_gallery'])) {
			$imageEdited = $wpdb->update( $easy_gallery_table, array( 'name' => $galleryName, 'slug' => $slug, 'description' => $galleryDescription, 'thumbnail' => $imagepath, 'thumbwidth' => $thumbwidth, 'thumbheight' => $thumbheight ), array( 'Id' => intval($_POST['hcg_edit_gallery']) ) );
				
				?>  
				<div class="updated"><p><strong><?php _e('Gallery has been edited.' ); ?></strong></p></div>  
				<?php
		}
	  }
	}
}
if(isset($_POST['hcg_edit_gallery'])) {
	if(check_admin_referer('wpeg_edit_gallery','wpeg_edit_gallery')) {
	  $gid = intval(esc_sql($_POST['hcg_edit_gallery']));
	  $imageResults = $wpdb->get_results( "SELECT * FROM $easy_gallery_image_table WHERE gid = $gid ORDER BY sortOrder ASC" );
	  $gallery = $wpdb->get_row( "SELECT * FROM $easy_gallery_table WHERE Id = $gid" );
	}
}
?>
<div class='wrap wp-easy-gallery-admin'>
	<h2>Easy Gallery - Edit Galleries</h2>
    <?php if(!isset($_POST['select_gallery']) && !isset($_POST['galleryId']) && !isset($_POST['hcg_edit_gallery'])) { ?>
    <p>Select a galley</p>		
    <form name="gallery" method="post" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>">
    	<?php wp_nonce_field('wpeg_select_gallery','wpeg_select_gallery'); ?>
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
    <?php } else if(isset($_POST['select_gallery']) || isset($_POST['galleryId']) || isset($_POST['hcg_edit_gallery'])) { ?>    
    <h3>Gallery: <?php echo esc_html($gallery->name); ?></h3>
    
    <form name="switch_gallery" method="post" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>">
    <input type="hidden" name="switch" value="true" />
    <p><input type="submit" name="Submit" class="button-primary" value="Switch Gallery" /></p>
    </form>
	
    <p>This is where you can edit existing galleries.</p>
    <p style="float: right;"><a href="http://labs.hahncreativegroup.com/wordpress-plugins/wp-easy-gallery-pro-simple-wordpress-gallery-plugin/?src=wpeg" target="_blank"><strong><em>Try WP Easy Gallery Pro</em></strong></a></p>
    <div style="Clear: both;"></div>
    <form name="hcg_add_gallery_form" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>" method="post">
    <input type="hidden" name="hcg_edit_gallery" value="<?php _e($gid); ?>" />
    <?php wp_nonce_field('wpeg_edit_gallery', 'wpeg_edit_gallery'); ?>
    <table class="widefat post fixed eg-table">
    	<thead>
        <tr>
        	<th class="eg-cell-spacer-250">Field Name</th>
            <th>Entry</th>
            <th>Description</th>
        </tr>
        </thead>
        <tfoot>
        <tr>
        	<th>Field Name</th>
            <th>Entry</th>
            <th>Description</th>
        </tr>
        </tfoot>
        <tbody>
        	<tr>
            	<td><strong>Enter Gallery Name:</strong></td>
                <td><input type="text" size="30" name="galleryName" value="<?php echo esc_attr($gallery->name); ?>" /></td>
                <td>This name is the internal name for the gallery.<br />Please avoid non-letter characters such as ', ", *, etc.</td>
            </tr>
            <tr>
            	<td><strong>Enter Gallery Description:</strong></td>
                <td><input type="text" size="50" name="galleryDescription" value="<?php echo esc_attr($gallery->description) ?>" /></td>
                <td>This description is for internal use.</td>
            </tr>
            <tr>
            	<td><strong>Enter Thumbnail Imagepath:</strong></td>
                <td><input id="upload_image" type="text" size="36" name="upload_image" value="<?php echo esc_attr($gallery->thumbnail); ?>" />
					<input id="upload_image_button" type="button" value="Upload Image" /></td>
                <td>This is the file path for the gallery thumbnail image.</td>
            </tr>
            <tr>
            	<td><strong>Enter Thumbnail Width:</strong></td>
                <td><input type="text" size="10" name="gallerythumbwidth" value="<?php echo esc_attr($gallery->thumbwidth); ?>" /></td>
                <td>This is the width of the gallery thumbnail image.</td>
            </tr>
            <tr>
            	<td><strong>Enter Thumbnail Height:</strong></td>
                <td><input type="text" size="10" name="gallerythumbheight" value="<?php echo esc_attr($gallery->thumbheight); ?>" /></td>
                <td>This is the height of the gallery thumbnail image.</td>
            </tr>
            <tr>
            	<td class="major-publishing-actions"><input type="submit" name="Submit" class="button-primary" value="Save Changes" /></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
	</table>
    </form>
    <?php } ?>
    <br />  
<?php include('includes/banners.php'); ?>
</div>
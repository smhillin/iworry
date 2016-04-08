<?php

	function add_user_info( $user ) {
	?>
		<h3><?php _e('User Info', 'movember_heading'); ?></h3>
		<table class="form-table">
			
			<tr>
				<th>User Address</th>
				<td>
					<input type="text" name="address" id="address" value="<?php echo get_the_author_meta( 'address', $user->ID ); ?>" class="regular-text" />
				</td>
			</tr>
			
			<tr>
				<th>User Co-Ords</th>
				<td>
					<input type="text" name="coords" id="coords" value="<?php echo get_the_author_meta( 'coords', $user->ID ); ?>" class="regular-text" />
				</td>
			</tr>
			
		</table>
	<?php }
	function save_user_info( $user_id ) {
		if ( !current_user_can( 'edit_user', $user_id ) )
			return FALSE;
		update_usermeta( $user_id, 'address', $_POST['address'] );
		update_usermeta( $user_id, 'coords', $_POST['coords'] );
	}
	
	add_action( 'show_user_profile', 'add_user_info' );
	add_action( 'edit_user_profile', 'add_user_info' );
	
	add_action( 'personal_options_update', 'save_user_info' );
	add_action( 'edit_user_profile_update', 'save_user_info' );
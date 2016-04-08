<?php

	// shortcode

	add_shortcode( 'userform', 'userform' );
	function userform( $atts ) {
		//print_r(get_user_meta(10));
		$bloginfo = get_bloginfo( 'template_url' );
		$userform = '
			<form class="userform" id="userform" method="POST" action="'.$bloginfo.'/includes/functions/user/create_user.php" enctype="multipart/form-data">
				
				<div id="userformalert" class="hide alert alert-danger"></div>		
				
				<div class="userfields">
					<div class="userfield form-group">
						<label for="user_title">Title</label>
						<input id="user_title" type="text" name="user_title" />
					</div>
					<div class="userfield form-group">
						<label for="first_name">First Name</label>
						<input id="first_name" type="text" name="first_name" />
					</div>
					<div class="userfield form-group">
						<label for="last_name">Surname</label>
						<input id="last_name" type="text" name="last_name" />
					</div>
				</div>
				
				<div class="userfields">
					<div class="userfield form-group">
						<label for="email">Email</label>
						<input id="email" type="text" name="email" />
					</div>
					
					<div class="userfield form-group">
						<label for="address">GPS Co-Ords <a href="#" data-toggle="tooltip" data-html="true" data-original-title="This data is used to place you correctly on the map." data-container="body" data-placement="right"><i class="icon-question-sign"></i></a></label>
						<input id="address" type="text" name="address" />
		
						<a id="getlatlong" class="btn btn-info btn-mini" href="javascript:void(0)" data-loading-text="<i class=\'icon-spinner icon-spin\'></i> Fetching..." data-complete-text=\'<i class="icon-thumbs-up"></i> Located\'><i class="icon-search"></i> Fetch Co-Ords</a>
					</div>
					
					<div id="avatarwrap" class="userfield form-group">
						<input id="avatar" type="file" name="avatar" class="filestyle" data-classInput="avatarinput" data-classButton="btn uploadbtn" data-icon="false" data-buttonText="Picture" />
					</div>
				</div>
				
				<div class="userfields usersubmit">
					<button id="userformsubmit" class="btn btn-primary" data-loading-text="<i class=\'icon-spinner icon-spin\'></i> Submitting..." data-complete-text=\'<i class="icon-thumbs-up"></i> Complete\' />Submit</button>
				</div>
				
			</form>
		';
	
		return $userform;
		
	}
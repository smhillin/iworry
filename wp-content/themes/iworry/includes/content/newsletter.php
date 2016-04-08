	<div id="newsletter" class="row">
		<img src="<?php echo bloginfo('template_directory'); ?>/images/newsletterheader.png" />
		
		<?php gravity_form(5, false, false, '', '', true, ''); ?>
	</div>

	<style type="text/css">
		.gform_wrapper {float: right;}
		.gform_wrapper li {float: left!important;clear: none!important;}
		.gform_button {margin-top: -23px!important;}
	</style>
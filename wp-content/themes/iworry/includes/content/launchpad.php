	<div id="launchpad" class="container"><div class="inside">
		<h3>WANT TO <strong>KNOW MORE?</strong></h3>

		<div class="row">
			<?php if (of_get_option('block1img') && of_get_option('block1url')) { ?>
				<div class="col-lg-3">
					<img src="<?php echo of_get_option('block1img'); ?>" />
					<a href="<?php echo get_permalink(of_get_option('block1url')); ?>" class="btn btn-default"><?php echo of_get_option('block1text'); ?></a>
				</div>
			<?php } ?>
			<?php if (of_get_option('block2img') && of_get_option('block2url')) { ?>
				<div class="col-lg-3">
					<img src="<?php echo of_get_option('block2img'); ?>" />
					<a href="<?php echo get_permalink(of_get_option('block2url')); ?>" class="btn btn-default"><?php echo of_get_option('block2text'); ?></a>
				</div>
			<?php } ?>
			<?php if (of_get_option('block3img') && of_get_option('block3url')) { ?>
				<div class="col-lg-3">
					<img src="<?php echo of_get_option('block3img'); ?>" />
					<a href="<?php echo get_permalink(of_get_option('block3url')); ?>" class="btn btn-default"><?php echo of_get_option('block3text'); ?></a>
				</div>
			<?php } ?>
			<?php if (of_get_option('block4img') && of_get_option('block4url')) { ?>
				<div class="col-lg-3">
					<img src="<?php echo of_get_option('block4img'); ?>" />
					<a href="<?php echo get_permalink(of_get_option('block4url')); ?>" class="btn btn-default"><?php echo of_get_option('block4text'); ?></a>
				</div>
			<?php } ?>
		</div>
		
		<?php if (is_home() || is_page(27)) { 
			get_template_part('includes/content/newsletter'); 
		} ?>
	</div></div><!-- launchpad -->

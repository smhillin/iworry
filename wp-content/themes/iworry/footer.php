	<div id="bottom" class="container"><div class="inside">
		<div class="row">
			
			<img src="<?php echo bloginfo('template_directory'); ?>/images/trustlogo.png" id="trustlogo" />
			
			<p><span class="redtext">A CAMPAIGN BY THE DAVID SHELDRICK WILDLIFE TRUST.</span> Visit <a href="http://www.sheldrickwildlifetrust.org">www.sheldrickwildlifetrust.org</a></p>
			
		</div>
	</div></div><!-- bottom -->

	<div id="footerwrap">
		<div id="footer" class="container"><div class="inside">
			<div class="row">
				<p id="credits" class="pull-left">
					Design by <a href="http://www.wonderlandworks.co.za/">wonderland works</a> & <a href="http://thejoeycompany.com">The joey company</a>. Developed by <a href="http://www.yellow-llama.com">The yellow lama</a>.
				</p>
				
				<div id="bottomnav" class="pull-right">
					<?php wp_nav_menu('menu=topmenu&container=menu&menu_id=footernav&depth=1'); ?>
	
					<div class="socialicons pull-right">
						<a href="<?php echo of_get_option('fburl'); ?>" class="social-fb"><i class="icon-facebook"></i></a>
						<a href="<?php echo of_get_option('twurl'); ?>" class="social-tw"><i class="icon-twitter"></i></a>
					</div>
				</div>
			</div>
		</div></div><!-- footer -->
	</div>
	
<?php wp_footer(); ?>

<script type="text/javascript">var $ = jQuery.noConflict(); $(document).ready(function(){
		$('.gmnoprint').each(function() {
			if ($('img',this).length > 0) {
				$(this).addClass('custompin');
			}
		});	
});</script>

</body>
</html>
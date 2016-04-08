<?php

/**

 * The template for displaying the footer.

 *

 * Contains the closing of the id=main div and all content

 * after.  Calls sidebar-footer.php for bottom widgets.

 *

 * @package WordPress

 * @subpackage Boilerplate

 * @since Boilerplate 1.0

 */

?>		



		

  </div>

  <footer>

    <div class="banner-footer">

      <h1></h1>

        <div class="get-involved-footer">

          

<div class="addthis_toolbox addthis_default_style">

<a class="addthis_button_facebook_like" fb:like:layout="button_count"></a>

<a class="addthis_button_tweet"></a>

<a class="addthis_button_pinterest_pinit"></a>

<a class="addthis_counter addthis_pill_style"></a>

</div>

<script type="text/javascript">var addthis_config = {"data_track_addressbar":true};</script>

<script type="text/javascript" src="http://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-506c062c79ffd0c4"></script>



        </div>

      </div>

  </footer>

<?php

	/* Always have wp_footer() just before the closing </body>

	 * tag of your theme, or you will break many plugins, which

	 * generally use this hook to reference JavaScript files.

	 */

	wp_footer();

?>

	</body>

</html>
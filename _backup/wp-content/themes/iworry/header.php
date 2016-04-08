<?php



/**



 * The Header for our theme.



 *



 * Displays all of the <head> section and everything up till <div id="main">



 *



 * @package WordPress



 * @subpackage Boilerplate



 * @since Boilerplate 1.0



 */



?><!DOCTYPE html>



<!--[if lt IE 7 ]><html <?php language_attributes(); ?> class="no-js ie ie6 lte7 lte8 lte9"><![endif]-->



<!--[if IE 7 ]><html <?php language_attributes(); ?> class="no-js ie ie7 lte7 lte8 lte9"><![endif]-->



<!--[if IE 8 ]><html <?php language_attributes(); ?> class="no-js ie ie8 lte8 lte9"><![endif]-->



<!--[if IE 9 ]><html <?php language_attributes(); ?> class="no-js ie ie9 lte9"><![endif]-->



<!--[if (gt IE 9)|!(IE)]><!--><html <?php language_attributes(); ?> class="no-js"><!--<![endif]-->



	<head>



		<meta charset="<?php bloginfo( 'charset' ); ?>" />



		<title><?php



			/*



			 * Print the <title> tag based on what is being viewed.



			 * We filter the output of wp_title() a bit -- see



			 * boilerplate_filter_wp_title() in functions.php.



			 */



			wp_title( '|', true, 'right' );



		?></title>



		<link rel="profile" href="http://gmpg.org/xfn/11" />



		<link rel="stylesheet" href="<?php bloginfo( 'stylesheet_url' ); ?>" />



		<script src="<?php bloginfo( 'stylesheet_directory' ); ?>/js/modernizr-2.5.3.min.js" /></script>



		<script src="<?php bloginfo( 'stylesheet_directory' ); ?>/js/jquery-1.7.1.min.js" /></script>



		<script src="<?php bloginfo( 'stylesheet_directory' ); ?>/js/script.js" /></script> 



		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />



<?php



		/* We add some JavaScript to pages with the comment form



		 * to support sites with threaded comments (when in use).



		 */



		if ( is_singular() && get_option( 'thread_comments' ) )



			wp_enqueue_script( 'comment-reply' );







		/* Always have wp_head() just before the closing </head>



		 * tag of your theme, or you will break many plugins, which



		 * generally use this hook to add elements to <head> such



		 * as styles, scripts, and meta tags.



		 */



		wp_head();



?>







<script type="text/javascript">







  var _gaq = _gaq || [];



  _gaq.push(['_setAccount', 'UA-35292962-1']);



  _gaq.push(['_trackPageview']);







  (function() {



    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;



    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';



    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);



  })();







</script>



	</head>



  	<?php 	

	    $lang = explode('_', get_locale());

	    $lang = $lang[0];

 	?>

	<body <?php body_class( "lang-".$lang ); ?>>



		<header id="banner">



		    <h1 class="ir">Say No to ivory</h1>





	          	<?php 	

				    if($lang === "ja"){ 

		    			 echo '<a href="#get-involved-2">';

						echo "<p>あなたに</p>";

						echo "<p>できること</p>";

		    			 echo '</a>';

					}

				    elseif($lang === "zh"){ 

		    			 echo '<a href="#get-involved-3">';

						echo "<p>对象牙说不</p>";

						echo "<p>看看你能做什么</p>";

		    			 echo '</a>';

					}

				    else{

		    			 echo '<a href="#get-involved">';
		    			 //echo '<a href="#join-the-march-2">';

					 echo "See how you can help";

		    			 echo '</a>';

					}

				?>



		</header>



		



		<div class="main clearfix" role="main">







		    <div class="menu-track">



		      <div class="menu-bar">



		        <h1><a href="#banner" class="ir">I Worry</a></h1>



		        <nav>



		          <ul>



		          	<?php 	



						$args = array(

							'orderby' => 'menu_order',

							'order' => 'ASC',

							'post_type' => 'page', 

							'tax_query' => array(

								array(

									'taxonomy' => 'language',

									'field' => 'slug',

									'terms' => $lang

								)

							)

						);

						$query = new WP_Query( $args );



						$pages = $query->get_posts();



						foreach ( $pages as $page ) { 



							$content = $page->post_content;



							if(! $content && $page->ID != "11" && $page->ID != "203" && $page->ID != "205")

								continue;



						?>



		            		<li><a href="#<?php echo($page->post_name); ?>"><?php echo($page->post_title); ?></a></li>



						<?php } ?>



		          </ul>



		        </nav>



		        



				<?php include("getinvolved.php"); ?>



				<?php if($lang === "en"){ ?>

				<a href="http://www.elephantdiaries.org/shopping.html#error_message_00041" class="merch">

					<img src="<?php bloginfo( 'stylesheet_directory' ); ?>/img/tshirt_15_mins.jpg" alt="iWorry campaign tshirts"/>

					<p>Show your support, iworry t-shirts now available to order</p>

				</a>

				<a href="http://www.sheldrickwildlifetrust.org/" class="dswt-logo">David Sheldrick Wildlife Trust</a>

				<?php } ?>





		      </div>



		    </div>
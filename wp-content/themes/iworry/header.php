<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!--><html lang="en" xmlns="http://www.w3.org/1999/html"> <!--<![endif]-->
<head>

<script type="text/javascript" src="//use.typekit.net/kfa3twq.js"></script>
<script type="text/javascript">try{Typekit.load();}catch(e){}</script>

<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title><?php wp_title(''); ?></title>


<link rel="stylesheet" media ="screen" type ="text/css" href = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
<link rel="stylesheet" media="screen" type="text/css" href="<? bloginfo('template_directory'); ?>/css/style.css" />
<link rel="stylesheet" media="screen" type="text/css" href="<? bloginfo('template_directory'); ?>/style.css" />
<link rel="shortcut icon" href="<? bloginfo('template_directory'); ?>/images/favicon.png" />

<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->

<script type="text/javascript">var templatedir = "<?php echo bloginfo('template_directory'); ?>", siteurl = "<?php echo bloginfo('url'); ?>";</script>

<?php wp_enqueue_script('bootstrap', get_bloginfo('template_directory').'/js/bootstrap.js', array('jquery'), '1.0', true ); ?>
<?php wp_enqueue_script('owl', get_bloginfo('template_directory').'/js/owl.carousel.min.js', array('jquery'), '1.0', true ); ?>
<?php wp_enqueue_script('theme', get_bloginfo('template_directory').'/js/theme.js', array('jquery'), '1.0', true ); ?>

<?php wp_head(); ?>

<script type="text/javascript">var $ = jQuery.noConflict(); $(document).ready(function(){
	
		$("#sliderwrap").owlCarousel({
			//Basic Speeds
			slideSpeed : 200,
			paginationSpeed : 800,
			
			//Autoplay
			<?php if (of_get_option('sliderauto') == 'yes') { ?>
			autoPlay : true,
			<?php } else { ?>
			autoPlay : false,
			<?php } ?>
			goToFirst : true,
			goToFirstSpeed : 1000,
			
			// Navigation
			navigation : true,
			navigationText : [" "," "],
			pagination : true,
			paginationNumbers: false,
			
			// Responsive 
			responsive: true,
			items : 1,
			itemsDesktop : false,
			itemsDesktopSmall :false,
			itemsTablet: false,
			itemsMobile : false,
			
			// CSS Styles
			baseClass : "owl-carousel",
			//theme : "owl-theme"			
		});
	
	
});</script>


</head>

<body <?php echo body_class(); ?>>

<!-- Google Tag Manager -->
<noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-T5SVM3"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T5SVM3');</script>
<!-- End Google Tag Manager -->

	<div id="editlink"><?php edit_post_link('<span class="label label-success"><i class="icon-pencil"></i></span>','',' '); ?></div>

	<div id="headerwrap">
		<div id="header" class="container"><div class="inside">
			<div class="row">
	
				<a href="<?php echo bloginfo('url'); ?>" id="logo" class="pull-left"><img src="<?php echo bloginfo('template_directory'); ?>/images/logo.png" /></a>
				
				<div id="navwrap" class="pull-left">
					<?php wp_nav_menu('menu=topmenu&container=menu&menu_id=nav&depth=1'); ?>
				</div>
				
				<a href="<?php echo bloginfo('url'); ?>/donate/" class="donatenow pull-right">{ DONATE NOW! }</a>
	
				<div class="socialicons pull-right">
					<a href="<?php echo of_get_option('fburl'); ?>" class="social-fb"><i class="icon-facebook"></i></a>
					<a href="<?php echo of_get_option('twurl'); ?>" class="social-tw"><i class="icon-twitter"></i></a>
				</div>
			</div>
		</div></div><!-- header -->
	</div>
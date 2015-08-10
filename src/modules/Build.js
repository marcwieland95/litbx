/**
 * --------------------------------
 * Litbx Build
 * --------------------------------
 * Build slider DOM
 * @param {Litbx} Litbx
 * @param {Core} Core
 * @return {Module}
 */

var Build = function(Litbx, Core) {


	// Build Module Constructor
	function Module() {
		this.init();
	}


	/**
	 * Init lightbox
	 * @param $element
	 */
	Module.prototype.init = function () {

		// Add init class
		Litbx.element.addClass('init');

		var href,
		$wrap,
		$outer;

		href = Litbx.element.attr( 'href' );

		// Create wrapper
		//$( 'body' ).append( Litbx.options.tpl.wrap );
		//$( Litbx.options.tpl.wrap ).appendTo( 'body' ).after( '<div class="' + Litbx.options.classes.inner + '"></div>' );

		$wrap = $( Litbx.options.tpl.wrap ).appendTo( 'body' );
		$outer = $( Litbx.options.tpl.outer ).appendTo( $wrap );
		this.$inner = $( Litbx.options.tpl.inner ).appendTo( $outer );
		//console.log( $outer );

			/*
			.append( '<div></div>' )
				.find('div:last').addClass( Litbx.options.classes.wrapper )
				//.append( '<div class="outer"></div>' )
				.append( '<div></div>' )
					.find('div:last').addClass( Litbx.options.classes.inner );
			*/

		// Insert image
		$( '.' + Litbx.options.classes.inner ).append('<img src=" ' + href + ' " alt="">' ).find('img:last').addClass( Litbx.options.classes.item );

	};


	/**
	 * Destroy lightbox
	 * @param
	 */
	Module.prototype.destroy = function () {

		// Remove wrapper
		$( '.' + Litbx.options.classes.wrapper).remove();

		// Remove init class
		Litbx.element.removeClass('init');

	};



	// @return Module
	return new Module();

};

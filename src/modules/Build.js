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
	 * @param
	 */
	Module.prototype.init = function () {

		var href,
		$overlay,
		$wrap;

		//console.log( Litbx.element.attr( 'class' ) );
		//console.log( Litbx.element );

		//console.log( $(Litbx.current).index() );

		// Add current class
		Core.Helper.current().addClass( Litbx.options.classes.current );

		//console.log(Litbx.elements);
		//console.log(Litbx.current);

		href = Core.Helper.current().attr( 'href' );

		// Create wrapper
		//$( 'body' ).append( Litbx.options.tpl.wrap );
		//$( Litbx.options.tpl.wrap ).appendTo( 'body' ).after( '<div class="' + Litbx.options.classes.inner + '"></div>' );

		$overlay = $( Litbx.options.tpl.overlay ).appendTo( 'body' );
		$wrap = $( Litbx.options.tpl.wrap ).appendTo( $overlay );
		this.$inner = $( Litbx.options.tpl.inner ).appendTo( $wrap );
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

		Core.Images.load();

		// preload next/prev image
		Core.Images.preload();

	};


	/**
	 * Destroy lightbox
	 * @param
	 */
	Module.prototype.destroy = function () {

		// Remove wrapper
		$( '.' + Litbx.options.classes.overlay ).remove();

		// Remove classes
		Core.Helper.current()
			.removeClass( Litbx.options.classes.loading )
			.removeClass( Litbx.options.classes.current );

	};

	// @return Module
	return new Module();

};

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

		// Set flag to see if lightbox is open
		Litbx.open = true;

		var href,
		$overlay;
		//$wrap;

		// Setup responsive settings
		Core.Responsive.setup();

		//console.log( Litbx.element.attr( 'class' ) );
		//console.log( Litbx.element );

		//console.log( $(Litbx.current).index() );

		// Add current class
		Core.Helper.current().addClass( Litbx.options.classes.current );

		//console.log(Litbx.elements);
		//console.log(Litbx.current);


		// Create wrapper
		//$( 'body' ).append( Litbx.options.tpl.wrap );
		//$( Litbx.options.tpl.wrap ).appendTo( 'body' ).after( '<div class="' + Litbx.options.classes.inner + '"></div>' );

		Core.Helper.lockScroll();


		$overlay = $( Litbx.options.tpl.overlay ).appendTo( 'body' );
		this.$wrap = $( Litbx.options.tpl.wrap ).appendTo( $overlay );
		this.$inner = $( Litbx.options.tpl.inner ).appendTo( this.$wrap );

		Litbx.$wrapper = this.$wrap;
		Core.Responsive.responsiveClass();

		//console.log( $outer );

			/*
			.append( '<div></div>' )
				.find('div:last').addClass( Litbx.options.classes.wrapper )
				//.append( '<div class="outer"></div>' )
				.append( '<div></div>' )
					.find('div:last').addClass( Litbx.options.classes.inner );
			*/

		//href = Core.Helper.current().attr( 'href' );
		// Insert image - rebuild this - DRY

		//$( '.' + Litbx.options.classes.inner ).append('<img src="" alt="">' ).find('img:last').addClass( Litbx.options.classes.item );

		//$( '.' + Litbx.options.classes.inner ).append('<img src=" ' + href + ' " alt="">' ).find('img:last').addClass( Litbx.options.classes.item );

		Core.Title.build( this.$wrap, this.$inner );

		// add loading state
		//Core.Images.loading();

		Core.Images.load();

	};


	/**
	 * Destroy lightbox
	 * @param
	 */
	Module.prototype.destroy = function () {

		// Remove wrapper
		$( '.' + Litbx.options.classes.overlay ).remove();

		Core.Helper.unlockScroll();

		// Clean up all binded events
		Core.Events.unbind();

		// Remove classes
		Core.Helper.current()
			.removeClass( Litbx.options.classes.current );

		// Set flag to see if lightbox is open
		Litbx.open = false;

	};

	// @return Module
	return new Module();

};

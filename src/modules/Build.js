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

		$current = Litbx.elements.eq( Litbx.current );

		//console.log( Litbx.element.attr( 'class' ) );
		//console.log( Litbx.element );

		//console.log( $(Litbx.current).index() );

		// Add current class
		$current.addClass( Litbx.options.classes.current );

		//console.log(Litbx.elements);
		//console.log(Litbx.current);

		href = $current.attr( 'href' );

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

		// Show loading
		$( '.' + Litbx.options.classes.item ).load(function() {
			$current.removeClass( 'loading' );
		}).each(function() {
			//if(this.complete) $(this).load();
			$current.addClass( 'loading' );
		});

	};


	/**
	 * Destroy lightbox
	 * @param
	 */
	Module.prototype.destroy = function () {

		// Remove wrapper
		$( '.' + Litbx.options.classes.overlay ).remove();

		// Remove init class
		Core.Run.current().removeClass( Litbx.options.classes.current );
		//Litbx.current.siblings().removeClass( Litbx.options.classes.current ); // wrong selector, get right current item

	};

	// @return Module
	return new Module();

};

/**
 * --------------------------------
 * Litbx Images
 * --------------------------------
 * Image handling
 * @return {Litbx.Images}
 */

var Images = function(Litbx, Core) {

	/**
	 * Image Module Constructor
	 */
	function Module() {

	}


	/**
	 * Load images - spinner
	 */
	Module.prototype.load = function() {

		// Show loading
		$( '.' + Litbx.options.classes.item ).load(function() {
			Core.Helper.current().removeClass( 'loading' );
		}).each(function() {
			//if(this.complete) $(this).load();
			Core.Helper.current().addClass( 'loading' );
		});

	};


	/**
	 * Preload image
	 */
	Module.prototype.preload = function() {

		if ( Litbx.options.preload ) {

			// Preload next image (>)
			image_next = new Image();
			image_next.src = Core.Helper.current( '++' ).attr('href');

			// Preload prev image (<)
			image_prev = new Image();
			image_prev.src = Core.Helper.current( '--' ).attr('href');

		}

	};


	// @return Module
	return new Module();

};
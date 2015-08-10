/**
 * --------------------------------
 * Litbx Events
 * --------------------------------
 * Events functions
 * @return {Litbx.Events}
 */

var Events = function(Litbx, Core) {


	/**
	 * Events Module Constructor
	 */
	function Module() {
		this.close();
	}


	/**
	 * Click events - close lightbox
	 */
	Module.prototype.close = function() {

		// Handle click in wrapper (around image)
		$('.litbx__wrapper').on( 'click' , function() {
			Core.Build.destroy();
		})

		// Handle click in image
		.children().on( 'click', function() {
			if ( !Litbx.options.closeClick ) {
				return false;
			}
		});

	};




	// @return Module
	return new Module();

};

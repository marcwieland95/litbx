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
		this.keyboard();
		this.close();
	}


	/**
	 * Keyboard events
	 */
	Module.prototype.keyboard = function() {
		if (Litbx.options.keyboard) {
			$(window).on('keyup.litbx', function(event){
				if (event.keyCode === 39) Core.Run.switch( '>' ); // next
				if (event.keyCode === 37) Core.Run.switch( '<' ); // prev
				if (event.keyCode === 32) Core.Build.destroy(); // close
			});
		}
	};


	/**
	 * Click events - close lightbox
	 */
	Module.prototype.close = function() {

		// Handle click in wrapper (around image)
		$('.' + Litbx.options.classes.overlay ).on( 'click.litbx' , function() {
			Core.Build.destroy();
		})

		// Handle click in image
		.children().on( 'click.litbx', function() {
			if ( !Litbx.options.closeClick ) {
				return false;
			}
		});

	};




	// @return Module
	return new Module();

};

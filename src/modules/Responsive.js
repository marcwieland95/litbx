/**
 * --------------------------------
 * Litbx Responsive
 * --------------------------------
 * Responsive handling
 * @return {Litbx.Responsive}
 *
 * ToDo: Populate changes on the fly
 */

var Responsive = function(Litbx, Core) {

	/**
	 * Responsive Module Constructor
	 */
	function Responsive() {

	}


	/**
	 * Handle viewport
	 */
	Responsive.prototype.getViewport = function() {
		var width;
		if ( Litbx.options.responsiveBaseElement !== window ) {
			width = $( Litbx.options.responsiveBaseElement ).width();
		} else if ( window.innerWidth ) {
			width = window.innerWidth;
		} else if ( document.documentElement && document.documentElement.clientWidth ) {
			width = document.documentElement.clientWidth;
		} else {
			throw 'Can not detect viewport width.';
		}
		return width;
	};


	/**
	 * Override options on specific viewport size
	 */
	Responsive.prototype.setup = function() {

		var viewport = this.getViewport(),
		overwrites = Litbx.options.responsive,
		match = 0;

		// Override settings when match
		if ( overwrites ) {

			$.each(overwrites, function(breakpoint) {
				if (breakpoint <= viewport && breakpoint > match) {
					match = Number(breakpoint);
				}
			});

			Litbx.options = $.extend({}, Litbx.options, overwrites[match]);
			Litbx.currentMatch = match;

		}


	};


	/**
	 * Add responsive class to wrapper
	 */
	Responsive.prototype.responsiveClass = function() {

		// Responsive class
		if ( Litbx.options.responsiveClass ) {

			Litbx.$wrapper.addClass( Litbx.options.classes.responsive + '-' + Litbx.currentMatch );

		}

	};

	// Return Module
	return new Responsive();

};
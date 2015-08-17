/**
 * --------------------------------
 * Litbx Helper
 * --------------------------------
 * Helper functions
 * @return {Litbx.Helper}
 */

var Helper = function(Litbx, Core) {


	/**
	 * Helper Module Constructor
	 */
	function Module() {}


	/**
	 * jQuery object of current item
	 * @param shift
	 * @return {jquery object}
	 */
	Module.prototype.current = function( shift ) {

		switch(shift) {
			case '++':
				return Litbx.elements.eq( Litbx.current + 1 );

			case '--':
				return Litbx.elements.eq( Litbx.current - 1 );

			default:
				return Litbx.elements.eq( Litbx.current );
		}

	};


	// @return Module
	return new Module();


};

/**
 * --------------------------------
 * Litbx Core
 * --------------------------------
 * @param {Object} Litbx		Slider Class
 * @param {Object} Modules	Modules list to construct
 * @return {Core}
 */

var Core = function (Litbx, Modules) {

	/**
	 * Core Module Constructor
	 * Construct modules and inject Litbx and Core as dependency
	 */
	function Core() {

		for(var module in Modules) {
			this[module] = new Modules[module](Litbx, this);
		}

	}

	// Return Module
	return new Core();

};

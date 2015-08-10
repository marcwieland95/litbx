/**
 * --------------------------------
 * Litbx Core
 * --------------------------------
 * @param {Litbx} Litbx		Slider Class
 * @param {array} Modules	Modules list to construct
 * @return {Module}
 */

var Core = function (Litbx, Modules) {

	/**
	 * Core Module Constructor
	 * Construct modules and inject Glide and Core as dependency
	 */
	function Module() {

		for(var module in Modules) {
			this[module] = new Modules[module](Litbx, this);
		}

	}

	// @return Module
	return new Module();

};

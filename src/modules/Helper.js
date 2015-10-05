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

		switch( shift ) {
			case '++':
				return Litbx.elements.eq( Litbx.current + 1 );

			case '--':
				return Litbx.elements.eq( Litbx.current - 1 );

			default:
				return Litbx.elements.eq( Litbx.current );
		}

	};


	/**
	 * Add proper unit to value
	 * @param value
	 * @return {sting}
	 */
	Module.prototype.getValue = function( value ) {
		return value + 'px';
	};


	/*
		var isPercentage = function(str) {
			return isString(str) && str.indexOf('%') > 0;
		};

		var getScalar = function(orig, dim) {
			var value = parseFloat(orig, 10) || 0;

			if (dim && isPercentage(orig)) {
				value = F.getViewport()[ dim ] / 100 * value;
			}

			return Math.ceil(value);
		};

		var getValue = function(value, dim) {
			return getScalar(value, dim) + 'px';
		};
	 */

	/**
	 * Get time
	 * @source http://underscorejs.org/
	 */
	Module.prototype.now = Date.now || function() {
		return new Date().getTime();
	};


	// @return Module
	return new Module();


};

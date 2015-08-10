/**
 * --------------------------------
 * Litbx Main
 * --------------------------------
 * Responsible for lightbox init,
 * extending defaults, returning public api
 * @param {jQuery} element Root element
 * @param {Object} options Plugin init options
 * @return {Litbx}
 */

var Litbx = function (element, options) {

	/**
	 * Default options
	 * @type {Object}
	 */
	var defaults = {
		beforeInit: function(slider) {},
		afterInit: function(i, el) {},
	};

	// Extend options
	this.options = $.extend({}, defaults, options);

	// Call before init callback
	this.options.beforeInit(this.slider);

	/**
	 * Construct Core with modules
	 * @type {Core}
	 */
	var Engine = new Core(this, {
		Helper: Helper,
		Animation: Animation,
		Build: Build,
		Touch: Touch,
		Api: Api
	});

	// Call after init callback
	this.options.afterInit(this.current, this.slides.eq(this.current - 1));

	// api return
	return Engine.Api.instance();

};
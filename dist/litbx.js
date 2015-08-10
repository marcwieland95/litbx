/*!
 * Litbx
 * Version: 0.1.0
 * Litbx is a small and easy to use lightbox. It's touch and developer friendly and works just out of the box. It's a lightweight web-plugin based on jQuery.
 * Author: @marcwieland95
 * Site: http://http://www.marcwieland.ch/
 * Licensed under the MIT license
 */

;(function($, window, document, undefined){
/**
 * --------------------------------
 * Litbx Animation
 * --------------------------------
 * Animation functions
 * @return {Litbx.Animation}
 */

var Animation = function(Litbx, Core) {

	function Module() {}



	return new Module();

};
;/**
 * --------------------------------
 * Litbx Api
 * --------------------------------
 * Plugin api module
 * @return {Litbx.Api}
 */

var Api = function(Litbx, Core) {


	/**
	 * Api Module Constructor
	 */
	function Module() {}


	/**
	 * Api instance
	 * @return {object}
	 */
	Module.prototype.instance = function() {

		return {


		};

	};


	// @return Module
	return new Module();


};
;/**
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




	// @return Module
	return new Module();

};
;/**
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
;/**
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




	// @return Module
	return new Module();


};
;/**
 * --------------------------------
 * Litbx Touch
 * --------------------------------
 * Touch module
 * @return {Litbx.Touch}
 */

var Touch = function(Litbx, Core) {



	// @return Module
	return new Module();

};
;/**
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

};;/**
 * Wire Glide to jQuery
 * @param  {object} options Plugin options
 * @return {object}
 */

$.fn.glide = function (options) {

	return this.each(function () {
		if ( !$.data(this, 'glide_api') ) {
			$.data(this, 'glide_api',
				new Glide($(this), options)
			);
		}
	});

};

})(jQuery, window, document);
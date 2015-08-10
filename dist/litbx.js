/*!
 * Litbx
 * Version: 0.1.0
 * Litbx is a small and easy to use lightbox. It's touch and developer friendly and works just out of the box. It's a lightweight web-plugin based on jQuery.
 * Author: @marcwieland95
 * Site: http://http://marcwieland.ch/
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
 * Litbx Arrows
 * --------------------------------
 * Arrows navigation module
 * @return {Litbx.Arrows}
 */

var Arrows = function(Litbx, Core) {


	/**
	 * Arrows Module Constructor
	 */
	function Module() {
		this.build();
		this.next();
	}

	/**
	 * Build
	 * arrows DOM
	 */
	Module.prototype.build = function() {

		//$( '.' + Litbx.options.classes.inner ).append( Litbx.options.tpl.prev );
		//$( '.' + Litbx.options.classes.inner ).append( Litbx.options.tpl.next );

		// Create arrow after inner-container
		Core.Build.$inner.after( Litbx.options.tpl.prev );
		Core.Build.$inner.after( Litbx.options.tpl.next );


		//$( '.' + Litbx.options.classes.inner ).append( '<span class="' + Litbx.options.classes.arrow + ' ' + Litbx.options.classes.arrowNext + '"></span>' );

	//	this.wrapper = Litbx.slider.find('.' + Glide.options.classes.arrows);
	//	this.items = this.wrapper.children();

	};

	/**
	 * Next image
	 */
	Module.prototype.next = function() {

		$('.litbx__arrow.next').on('click', function() {

			Core.Run.switch( Litbx.itemIndex );

			//console.log ( Litbx.gallery.get( 8 ) );

			//nextItem = Litbx.element.next( '[rel="' + Litbx.galleryRel + '"]' ).addClass('next');



		});


	};


	/**
	 * Prev image
	 */
	Module.prototype.prev = function() {


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


	/**
	 * Init lightbox
	 * @param $element
	 */
	Module.prototype.init = function () {

		// Add init class
		Litbx.element.addClass('init');

		var href,
		$wrap,
		$outer;

		href = Litbx.element.attr( 'href' );

		// Create wrapper
		//$( 'body' ).append( Litbx.options.tpl.wrap );
		//$( Litbx.options.tpl.wrap ).appendTo( 'body' ).after( '<div class="' + Litbx.options.classes.inner + '"></div>' );

		$wrap = $( Litbx.options.tpl.wrap ).appendTo( 'body' );
		$outer = $( Litbx.options.tpl.outer ).appendTo( $wrap );
		this.$inner = $( Litbx.options.tpl.inner ).appendTo( $outer );
		//console.log( $outer );

			/*
			.append( '<div></div>' )
				.find('div:last').addClass( Litbx.options.classes.wrapper )
				//.append( '<div class="outer"></div>' )
				.append( '<div></div>' )
					.find('div:last').addClass( Litbx.options.classes.inner );
			*/

		// Insert image
		$( '.' + Litbx.options.classes.inner ).append('<img src=" ' + href + ' " alt="">' ).find('img:last').addClass( Litbx.options.classes.item );

	};


	/**
	 * Destroy lightbox
	 * @param
	 */
	Module.prototype.destroy = function () {

		// Remove wrapper
		$( '.' + Litbx.options.classes.wrapper).remove();

		// Remove init class
		Litbx.element.removeClass('init');

	};



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
	 * Construct modules and inject Litbx and Core as dependency
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
 * Litbx Run
 * --------------------------------
 * Run logic module
 * @return {Module}
 */

var Run = function(Litbx, Core) {


	/**
	 * Run Module
	 * Constructor
	 */
	function Module() {

	}

	/**
	 * Switch image
	 * @param index
	 */
	Module.prototype.switch = function ( index ) {

		var preloadMedia,
		preloadMediaURL;

		// nextImage
		preloadMedia = Litbx.gallery.eq( index + 1 );
		preloadMediaURL = preloadMedia.attr( 'href' );

		// prepare content to replace
		var item = '<img src="' + preloadMediaURL + '" alt="">';

		// replace inner content
		Core.Build.$inner.find('img').replaceWith( item );

	};


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

	/**
	 * Helper Module Constructor
	 */
	function Module() {}


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
		padding: 15,  // not in use
		margin: [30, 55, 30, 55],  // not in use
		arrows: true,  // not in use
		closeBtn  : true,  // not in use

		// Dimensions
		width: 800,  // not in use
		height: 450,  // not in use
		minWidth: 100,  // not in use
		minHeight: 100,  // not in use
		maxWidth: 99999,  // not in use
		maxHeight: 99999,  // not in use
		aspectRatio: false,  // not in use
		fitToView: true,  // not in use

		// Click
		closeClick: false,

		// Classes
		classes: {
			base: 'litbx', // not in use
			wrapper: 'litbx__wrapper',
			inner: 'litbx__inner',
			item: 'litbx__item',
			loading: 'litbx__loading',
			arrow: 'litbx__arrow',
			arrowNext: 'next',
			arrowPrev: 'prev',
			current: 'current'
		},

		// Templates - can't use classes dynamicly here and there is also redundancy
		tpl: {
			wrap: '<div class="litbx__wrapper"></div>',
			outer: '<div class="litbx__outer"></div>',
			inner: '<div class="litbx__inner"></div>',
			//error    : '<p class="fancybox-error">{{ERROR}}</p>',
			//closeBtn : '<a title="{{CLOSE}}" class="fancybox-close" href="javascript:;"></a>',
			next: '<span class="litbx__arrow prev"><i class="prev">Zurück</i></span>',
			prev: '<span class="litbx__arrow next"><i class="next">Weiter</i></span>'
		},

		// Callbacks
		beforeInit: function() {},
		afterInit: function() {},
	};

	// Extend options
	this.options = $.extend({}, defaults, options);

	// Triggered element
	this.element = element;

	// Collect DOM
	this.collect();
	// Init values
	this.setup();

	// Call before init callback
	this.options.beforeInit();

	/**
	 * Construct Core with modules
	 * @type {Core}
	 */
	var Engine = new Core(this, {
		Helper: Helper,
		Run: Run,
		Animation: Animation,
		Build: Build,
		Arrows: Arrows,
		Events: Events,
		Touch: Touch,
		Api: Api
	});

	// Call after init callback
	this.options.afterInit();

	// api return
	return Engine.Api.instance();

};

/**
 * Collect DOM
 * and set classes
 */
Litbx.prototype.collect = function() {

	//this.slider =
	//this.sliderTrigger = this.element.addClass('init');
	this.current = this.element;
	this.galleryRel = this.element.attr('rel');
	this.gallery = $('[rel="' + this.galleryRel + '"]');

};

/**
 * Setup properties and values
 */
Litbx.prototype.setup = function() {

	this.length = this.gallery.length;
	this.itemIndex = this.gallery.index( this.element );

};;/**
 * Wire Litbx to jQuery
 * @param  {object} options Plugin options
 * @return {object}
 */

$.fn.litbx = function (options) {

	return this.each(function () {
		if ( !$.data(this, 'litbx_api') ) {

			// Trigger plugin on click and prevent default link
			$(this).on('click', function(event) {
				event.preventDefault();
				$.data(this, 'litbx_api',
					// Init plugin instance
					new Litbx($(this), options)
				);
			});

		}
	});

};

})(jQuery, window, document);
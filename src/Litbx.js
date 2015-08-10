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

};
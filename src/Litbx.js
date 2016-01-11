/**
 * --------------------------------
 * Litbx Main
 * --------------------------------
 * Responsible for lightbox init,
 * extending defaults, returning public api
 * @param {jQuery} elements All image elements
 * @param {Object} options Plugin init options
 * @param {jQuery} trigger Root element
 * @return {Litbx}
 */

var Litbx = function ( elements, options, trigger ) {

	/**
	 * Default options
	 * @type {Object}
	 */
	var defaults = {
		padding: 70,
		margin: [30, 55, 30, 55], // 200
		arrows: true,
		closeBtn: true,
		startAt: 0, // int - index starts at 1, 0 or false = open at trigger
		flexbox: false, // not in use

		// Dimensions
		width: null, // null default - 900
		height: null, // null default - 1200
		minWidth: 100,  // not in use
		minHeight: 100,  // not in use
		maxWidth: 1600,
		maxHeight: 1600,
		aspectRatio: true,
		fitToView: false, // not tested

		// Events
		closeClick: false,
		preload: true,
		// preloadNumber - int or array (forward, backward)
		loop: true,
		keyboard: true,
		closeKey: [32, 27],
		nextKey: [39],
		prevKey: [37],
		throttle: 16,

		// Responsive
		responsive: {},
		responsiveBaseElement: window,
		responsiveRefreshRate: 200,
		responsiveClass: false,

		// Classes
		classes: {
			//base: 'litbx', // not in use
			overlay: 'litbx__overlay',
			wrapper: 'litbx__wrapper',
			inner: 'litbx__inner',
			item: 'litbx__item',
			arrow: 'litbx__arrow',
			arrowNext: 'litbx__arrow--next',
			arrowPrev: 'litbx__arrow--prev',
			close: 'litbx__close',
			current: 'litbx--current',
			loading: 'litbx--loading',
			locked: 'litbx--locked',
			title: 'litbx__title',
			responsive: 'litbx__responsive',
		},

		// Title
		title: true,
		titlePosition: 'inside', // inside or outside

		// Templates - can't use classes dynamicly here and there is also redundancy
		tpl: {
			overlay: '<div class="litbx__overlay"></div>',
			wrap: '<div class="litbx__wrapper"></div>',
			inner: '<div class="litbx__inner"></div>',
			//error    : '<p class="fancybox-error">{{ERROR}}</p>',
			//closeBtn : '<a title="{{CLOSE}}" class="fancybox-close" href="javascript:;"></a>',
			close: '<span title="Close" class="litbx__close">x</span>',
			next: '<span class="litbx__arrow litbx__arrow--prev"><i class="prev">&larr;</i></span>',
			prev: '<span class="litbx__arrow litbx__arrow--next"><i class="next">&rarr;</i></span>',
			title: '<span class="litbx__title"></span>'
		},

		// Styling
		helperStyle: true,

		// Callbacks
		beforeInit: function() {},
		afterInit: function() {},
	};

	// Extend options
	this.options = $.extend({}, defaults, options);

	// Elements
	this.elements = elements;
	this.trigger = trigger;
	this.element = trigger; // deprecated

	// Setup gallery group
	this.group();

	// Collect DOM
	this.collect();

	// Init values
	this.setup();

	this.builded = false; // set flag for first load
	this.locked = false;

	// Call before init callback
	this.options.beforeInit();


	/**
	 * Construct Core with modules
	 * @type {Core}
	 */
	var Engine = new Core(this, {
		Helper: Helper,
		Responsive: Responsive,
		Images: Images,
		Run: Run,
		Animation: Animation,
		Title: Title,
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
 * Setup gallery groups (attr)
 */
Litbx.prototype.group = function() {

	// check if has galleries (groups)
	this.groupAttr = this.trigger.attr('data-group');

	//this.galleryGroup = this.current.attr('data-group') || this.current.attr('rel'); // with rel-attr fallback - handle inside if-statement

	// Check if this image is in a gallery or single
	if ( this.groupAttr !== undefined ) { // maybe set a more useful flag for this -> for later usage

		// cache group selection
		this.group = $( '[data-group="' + this.groupAttr + '"]' );

		// Filter elements with group-attribute
		this.elements = this.elements.filter( this.group );

		// Set group flag
		this.groupMode = 'multiple';

		if ( this.group.length === 1 ) {
			this.groupMode = 'single';
		}

		//this.trigger = this.trigger.filter( this.group );
		//console.log( this.trigger.index( '[data-group="' + this.groupAttr + '"]' ) );

	} else {

		this.elements = this.trigger;

		// Set group flag
		this.groupMode = 'single';

	}

};


/**
 * Collect DOM
 * and set classes
 */
Litbx.prototype.collect = function() {

	// Set current
	if (this.options.startAt) { // falsy value -> 0 or false

		this.currentIndex = parseInt( this.options.startAt - 1 );

	} else {

		// false: start on trigger image
		//this.currentIndex = this.trigger.index();
		this.currentIndex = this.trigger.index( '[data-group="' + this.groupAttr + '"]' ); // get index relative to group

	}

	this.current = this.currentIndex;
	//console.log(this.current);

	//this.$current = this.elements.eq( this.current );

};


/**
 * Setup properties and values
 */
Litbx.prototype.setup = function() {

	// Group length
	this.length = this.group.length; // deprecated
	this.groupLength = this.group.length;

	// Prepare margin option
	if ( typeof this.options.margin === 'number' ) {

		this.options.margin = [this.options.margin, this.options.margin, this.options.margin, this.options.margin];

	}

	// Prepare padding option
	if ( typeof this.options.padding === 'number' ) {

		this.options.padding = [this.options.padding, this.options.padding, this.options.padding, this.options.padding];

	}

};
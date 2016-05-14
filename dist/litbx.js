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

	/**
	 * Animation Module Constructor
	 */
	function Animation() {}


	// Return Module
	return new Animation();

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
	function Api() {}


	/**
	 * Api instance
	 * @return {object}
	 */
	Api.prototype.instance = function() {

		return {


		};

	};


	// Return Module
	return new Api();


};
;/**
 * --------------------------------
 * Litbx Arrows
 * --------------------------------
 * Arrows navigation module
 * @return {Arrows}
 */

var Arrows = function(Litbx, Core) {


	/**
	 * Arrows Module Constructor
	 */
	function Arrows() {
		this.build();
		this.collect();
	}

	/**
	 * Build
	 * arrows DOM
	 */
	Arrows.prototype.build = function() {

		// Close
		if ( Litbx.options.closeBtn ) {

			Core.Build.$inner.after( Litbx.options.tpl.close );

		}

		// Arrows
		if ( Litbx.options.arrows ) {

			//$( '.' + Litbx.options.classes.inner ).append( Litbx.options.tpl.prev );
			//$( '.' + Litbx.options.classes.inner ).append( Litbx.options.tpl.next );

			// Create arrow after inner-container
			if ( Litbx.elements.length > 1 ) {
				Core.Build.$inner.after( Litbx.options.tpl.prev );
				Core.Build.$inner.after( Litbx.options.tpl.next );
			}

			//$( '.' + Litbx.options.classes.inner ).append( '<span class="' + Litbx.options.classes.arrow + ' ' + Litbx.options.classes.arrowNext + '"></span>' );

		//	this.wrapper = Litbx.slider.find('.' + Glide.options.classes.arrows);
		//	this.items = this.wrapper.children();
		}

	};


	/**
	 * Collect arrow item
	 * arrows DOM
	 */
	Arrows.prototype.collect = function() {

		this.arrows = $( '.' + Litbx.options.classes.overlay ).find( '.' + Litbx.options.classes.arrow );

	};



	// Return Module
	return new Arrows();

};
;/**
 * --------------------------------
 * Litbx Build
 * --------------------------------
 * Build slider DOM
 * @param {Litbx} Litbx
 * @param {Core} Core
 * @return {Litbx.Build}
 */

var Build = function(Litbx, Core) {


	/**
	 * Build Module Constructor
	 */
	function Build() {
		this.init();
	}


	/**
	 * Init lightbox
	 * @param
	 */
	Build.prototype.init = function () {

		// Set flag to see if lightbox is open
		Litbx.open = true;

		var href,
		$overlay;
		//$wrap;

		// Setup responsive settings
		Core.Responsive.setup();

		//console.log( Litbx.element.attr( 'class' ) );
		//console.log( Litbx.element );

		//console.log( $(Litbx.current).index() );

		// Add current class
		Core.Helper.current().addClass( Litbx.options.classes.current );

		//console.log(Litbx.elements);
		//console.log(Litbx.current);


		// Create wrapper
		//$( 'body' ).append( Litbx.options.tpl.wrap );
		//$( Litbx.options.tpl.wrap ).appendTo( 'body' ).after( '<div class="' + Litbx.options.classes.inner + '"></div>' );

		Core.Helper.lockScroll();


		$overlay = $( Litbx.options.tpl.overlay ).appendTo( 'body' );
		this.$wrap = $( Litbx.options.tpl.wrap ).appendTo( $overlay );
		this.$inner = $( Litbx.options.tpl.inner ).appendTo( this.$wrap );

		Litbx.$wrapper = this.$wrap;
		Core.Responsive.responsiveClass();

		//console.log( $outer );

			/*
			.append( '<div></div>' )
				.find('div:last').addClass( Litbx.options.classes.wrapper )
				//.append( '<div class="outer"></div>' )
				.append( '<div></div>' )
					.find('div:last').addClass( Litbx.options.classes.inner );
			*/

		//href = Core.Helper.current().attr( 'href' );
		// Insert image - rebuild this - DRY

		//$( '.' + Litbx.options.classes.inner ).append('<img src="" alt="">' ).find('img:last').addClass( Litbx.options.classes.item );

		//$( '.' + Litbx.options.classes.inner ).append('<img src=" ' + href + ' " alt="">' ).find('img:last').addClass( Litbx.options.classes.item );

		Core.Title.build( this.$wrap, this.$inner );

		// add loading state
		//Core.Images.loading();

		Core.Images.load();

	};


	/**
	 * Destroy lightbox
	 * @param
	 */
	Build.prototype.destroy = function () {

		// Remove wrapper
		$( '.' + Litbx.options.classes.overlay ).remove();

		Core.Helper.unlockScroll();

		// Clean up all binded events
		Core.Events.unbind();

		// Remove classes
		Core.Helper.current()
			.removeClass( Litbx.options.classes.current );

		// Set flag to see if lightbox is open
		Litbx.open = false;

	};

	// Return Module
	return new Build();

};
;/**
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
		this.keyboard();
		this.next();
		this.prev();
		this.close();
		this.resize();
	}


	/**
	 * Keyboard events
	 */
	Module.prototype.keyboard = function() {

		if ( Litbx.options.keyboard ) {

			// close
			$(window).on('keyup.litbx', function( event ) {
				for (var i = 0; i < Litbx.options.closeKey.length; i++) {
				    if ( event.keyCode === Litbx.options.closeKey[i] ) Core.Build.destroy();
				}
			});

		}

		if ( Litbx.options.keyboard && Litbx.elements.length > 1 ) {

			// next
			$(window).on('keyup.litbx', function( event ) {

				for (var i = 0; i < Litbx.options.nextKey.length; i++) {
				    if ( event.keyCode === Litbx.options.nextKey[i] ) Core.Run.switch( '>' );
				}

			});

			// prev
			$(window).on('keyup.litbx', function( event ) {

				for (var i = 0; i < Litbx.options.prevKey.length; i++) {
				    if ( event.keyCode === Litbx.options.prevKey[i] ) Core.Run.switch( '<' );
				}

			});

		}

	};


	/**
	 * Next image
	 */
	Module.prototype.next = function() {

		if ( Litbx.elements.length > 1 ) {

			$( '.' + Litbx.options.classes.arrowNext ).on( 'click.litbx', function() {

				Core.Run.switch( '>' );

				/*
				if ( Core.Run.isEnd() ) {
					Core.Events.unbindArrow();
				}
				*/

				//Core.Run.switch( '>', Litbx.current.index() );
				//console.log ( Litbx.gallery.get( 8 ) );

				//nextItem = Litbx.element.next( '[rel="' + Litbx.galleryRel + '"]' ).addClass('next');

			});
		}
	};


	/**
	 * Prev image
	 */
	Module.prototype.prev = function() {

		if ( Litbx.elements.length > 1 ) {

			$( '.' + Litbx.options.classes.arrowPrev ).on( 'click.litbx', function() {

				Core.Run.switch( '<' );

				/*
				if ( Core.Run.isStart() ) {
					Core.Events.unbindArrow();
				}
				*/

				//Core.Run.switch( '<', Litbx.current.index() );

				//console.log ( Litbx.gallery.get( 8 ) );

				//nextItem = Litbx.element.next( '[rel="' + Litbx.galleryRel + '"]' ).addClass('next');

			});
		}
	};


	/**
	 * Click events - close lightbox
	 */
	Module.prototype.close = function() {

		// Handle click in wrapper (around image)
		$('.' + Litbx.options.classes.overlay ).on( 'click.litbx' , function() {
			Core.Build.destroy();
		})
			// Handle click in image
			.children().on( 'click.litbx', function() {
				if ( !Litbx.options.closeClick ) {
					return false;
				}
			});

		// Close btn
		$('.' + Litbx.options.classes.close ).on( 'click.litbx' , function() {
			Core.Build.destroy();
		});

	};


	/**
	 * Unbind arrow
	 *
	 * not in use
	 */
	Module.prototype.unbindArrow = function() {

		Core.Arrows.arrows
			.off('click.litbx touchstart.litbx');

		$(window)
			.off('keyup.litbx');

	};


	/*
	 * Unbind everything
	 */
	Module.prototype.unbind = function() {

		Core.Arrows.arrows
			.off('click.litbx touchstart.litbx');

		$(window)
			.off('keyup.litbx resize.litbx');

	};


	/**
	 * Browser resize
	 *
	 */
	Module.prototype.resize = function() {

		// Run multiple functions on resize
		$(window).on('resize.litbx', this.throttle( function() {

			Core.Title.calcTitle();
			Core.Images.calculate();

		}, Litbx.options.throttle) );

		// Update responsive settings at a different speed
		$(window).on('resize.litbx', this.throttle( function() {

			Core.Responsive.setup();

			// Replace responsive class
			if ( Litbx.options.responsiveClass ) {

				Litbx.$wrapper.attr('class',
					Litbx.$wrapper.attr('class').replace(new RegExp('(' + Litbx.options.classes.responsive + '-)[0-9]+', 'g'), '$1' + Litbx.currentMatch)
				);

			}

		}, Litbx.options.responsiveRefreshRate) );

	};


	/**
	 * Throttle
	 * @source http://underscorejs.org/
	 */
	Module.prototype.throttle = function(func, wait, options) {
		var that = this;
		var context, args, result;
		var timeout = null;
		var previous = 0;
		if (!options) options = {};
		var later = function() {
			previous = options.leading === false ? 0 : Core.Helper.now();
			timeout = null;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		};
		return function() {
			var now = Core.Helper.now();
			if (!previous && options.leading === false) previous = now;
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0 || remaining > wait) {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				previous = now;
				result = func.apply(context, args);
				if (!timeout) context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	};


	// Return Module
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
	function Helper() {}


	/**
	 * jQuery object of current item
	 * @param shift
	 * @return {jquery object}
	 */
	Helper.prototype.current = function( shift ) {

		// not in use yet
		if ( typeof shift !== 'undefined' ) {

			// Extract move direction
			this.direction = shift.substr(0, 1);
			// Extract move steps - default: 1
			this.steps = ( shift.substr(1) ) ? shift.substr(1) : 1;

		}

		switch( shift ) {
			case '++':
				if ( Core.Run.isEnd() ) {
					return Litbx.elements.eq( 0 );
				} else {
					return Litbx.elements.eq( Litbx.current + 1 );
				}
			break;

			case '--':
				if ( Core.Run.isStart() ) {
					return Litbx.elements.eq( Litbx.groupLength - 1 );
				} else {
					return Litbx.elements.eq( Litbx.current - 1 );
				}
			break;

			default:
				return Litbx.elements.eq( Litbx.current );
		}

	};


	/**
	 * Add proper unit to value
	 * @param value
	 * @return {sting}
	 */
	Helper.prototype.getValue = function( value ) {
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
	Helper.prototype.now = Date.now || function() {
		return new Date().getTime();
	};


	/**
	 * Scroll Lock
	 *
	 * Improve code by this snippet: https://gist.github.com/barneycarroll/6550066
	 */

	// Lock scroll
	Helper.prototype.lockScroll = function() {

		// Little more complex
		this.$html = $( 'html' );

		// Store current scroll position
		this.prevScroll = $( window ).scrollTop();
			// Store current css properties
			/*
			this.prevStyles = {
				'position': this.$html.css('position'),
				'overflowy': this.$html.css('overflow-y')
			};
			*/

		// Prevent scroll by css
		$( this.$html )
			.addClass( Litbx.options.classes.locked )
			.css({
				'top': - this.prevScroll + 'px',
				'position': 'fixed',
				'overflow-y': 'scroll'
		});

		Litbx.locked = true;
	};

	// Unlock scroll
	Helper.prototype.unlockScroll = function() {

		if ( Litbx.locked ) {

			// Reset all properties
			$( this.$html )
				.removeClass( Litbx.options.classes.locked )
				.css({
					//'position': this.prevStyles.position,
					//'overflow-y': this.prevStyles.overflowy,
					'position': '',
					'overflow-y': '',
					'top': ''
				});

			$( window ).scrollTop( this.prevScroll );

			Litbx.locked = false;

		}
	};


	// Return Module
	return new Helper();


};
;/**
 * --------------------------------
 * Litbx Images
 * --------------------------------
 * Image handling
 * @return {Litbx.Images}
 */

var Images = function(Litbx, Core) {

	/**
	 * Image Module Constructor
	 */
	function Images() {

	}


	/**
	 * Load image
	 */
	Images.prototype.load = function() {

		// Load current image
		this.currentImage = new Image();
		this.currentImage.src = Core.Helper.current().attr('href');

		// Add loading spinner
		this.loading();

		// Calc image dimensions
		//this.calculate();

		// Check if gallery has already loaded
		if ( Litbx.builded ) {

			// replace inner content
			Core.Build.$inner.find('img').replaceWith( this.currentImage );

		} else {

			// create inner content
			$( '.' + Litbx.options.classes.inner ).append( this.currentImage ).find('img:last').addClass( Litbx.options.classes.item );

		}

		// preload next/prev image
		this.preload();

		// image callback
		return this.currentImage;

	};


	/**
	 * Load images - spinner
	 */
	Images.prototype.loading = function() {

		$( this.currentImage ).on('load', function() {

			// Calc image dimensions when image has loaded
			Core.Images.calculate();

			// Remove loading class
			$( '.' + Litbx.options.classes.overlay ).removeClass( 'loading' );

			// Fade image in after everything is loaded and renered
			$('.litbx__wrapper').fadeIn();

		}).each(function() {

			// Hide wrapper
			$('.litbx__wrapper').hide();

			// Add loading class to overlay
			$('.' + Litbx.options.classes.overlay ).addClass( 'loading' );

		});

	};


	/**
	 * Preload image
	 */
	Images.prototype.preload = function() {

		if ( Litbx.options.preload && Litbx.groupMode !== 'single' ) {

			var image_next,
			image_prev;

			// Preload next image (>)
			image_next = new Image();
			image_next.src = Core.Helper.current( '++' ).attr('href');

			// Preload prev image (<)
			image_prev = new Image();
			image_prev.src = Core.Helper.current( '--' ).attr('href');

		}

	};


	/**
	 * Calculate image size
	 *
	 * Make sure that this function is loaded when image has loaded
	 *
	 */
	Images.prototype.calculate = function() {

		// Check if images is loaded
		if ( this.currentImage.complete ) {
		//Litbx.image_current.onload = function(){
			var width = Litbx.options.width,
			height = Litbx.options.height,
			naturalWidth = this.currentImage.naturalWidth,
			naturalHeight = this.currentImage.naturalHeight,
			ratio = naturalWidth / naturalHeight, // x < 1 = portrait, x > 1 = landscape
			margin = Litbx.options.margin,
			padding = Litbx.options.padding,
			maxWidth = Math.min( Litbx.options.maxWidth, naturalWidth ),
			maxHeight = Math.min( Litbx.options.maxHeight, naturalHeight ),
			maxViewHeight = $(window).height() - ( margin[0] + margin[2] ) - ( padding[0] + padding[2] ),
			maxViewWidth = $(window).width() - ( margin[1] + margin[3] ) - ( padding[1] + padding[3] ),
			canExpandHeight,
			canExpandWidth;

			//width = if ( width != null )

			maxViewHeight = Math.min( maxHeight,  maxViewHeight ) - Core.Title.titleHeight;
			maxViewWidth = Math.min( maxWidth,  maxViewWidth );

			// set flag for width - not in use
			//if ( (margin + padding + width) < Litbx.browserWidth ) {
			if ( width < maxViewWidth ) {

				canExpandWidth = true;

			} else {

				canExpandWidth = false;

			}

			// set flag for height - not in use
			//if ( (margin + padding + height ) < Litbx.browserHeight ) {
			if ( height < maxViewHeight ) {

				canExpandHeight = true;

			} else {

				canExpandHeight = false;

			}

			// Asign classes - css only
			// build a css only solution - maybe asign some classes to img


			// Keep aspect ratio
			if ( Litbx.options.aspectRatio ) {

				if ( ratio > 1 ) { // landscape

					height = maxViewWidth / ratio;
					width = maxViewWidth;

					if ( height > maxViewHeight ) {

						height = maxViewHeight;
						width = height * ratio;

					}

				} else {  // portrait

					width = maxViewHeight * ratio;
					height = maxViewHeight;

					if ( width > maxViewWidth ) {

						width = maxViewWidth;
						height = width / ratio;
					}

				}

			} else {

				if ( Litbx.options.fitToView ) {

					width  = Math.min(maxWidth,  maxViewWidth );
					height = Math.min(maxHeight, maxViewHeight );

				} else {

					width = width; // width have to be set in options
					height = height; // height have to be set in options

				}

			}

			//Core.Build.$wrap.css({ // undefined ??
			$( '.' + Litbx.options.classes.wrapper ).css({

				//'padding': 200,
				//'margin': Litbx.options.margin.toString(),
				'width': width, // width
				'height': height, // height
				'max-width': maxWidth,
				'max-height': maxHeight

			});

			// set padding and margin
			$.each( ["top", "right", "bottom", "left"], function( i, direction ) {

				var $wrapper = $( '.' + Litbx.options.classes.wrapper );

				$wrapper.css( 'margin-' + direction, Core.Helper.getValue( margin[ i ] ) );
				$wrapper.css( 'padding-' + direction, Core.Helper.getValue( padding[ i ] ) );

				// Special handle for title
				if ( direction === 'bottom' && Litbx.options.titlePosition === 'inside' ) {
					$wrapper.css( 'padding-' + direction, Core.Helper.getValue( padding[ i ] + Core.Title.titleHeight ) );
				}

				if ( direction === 'bottom' && Litbx.options.titlePosition === 'outside' ) {
					$wrapper.css( 'margin-' + direction, Core.Helper.getValue( margin[ i ] + Core.Title.titleHeight ) );
				}

			});

		} else {

			// Image failed to load - return message
			console.log('Image failed to load');

		}

	};


	// Return Module
	return new Images();

};;/**
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

};;/**
 * --------------------------------
 * Litbx Run
 * --------------------------------
 * Run logic module
 * @return {Module}
 */

var Run = function(Litbx, Core) {


	/**
	 * Run Module Constructor
	 */
	function Run() {

	}

	/**
	 * Check if we are on first slide
	 * @return {boolean}
	 */
	Run.prototype.isStart = function() {
		return Litbx.current === 0;
	};


	/**
	 * Check if we are on last slide
	 * @return {boolean}
	 */
	Run.prototype.isEnd = function() {
		return Litbx.current === Litbx.groupLength - 1;
	};


	/**
	 * Switch image
	 * @param direction
	 * @param index
	 */
	Run.prototype.switch = function ( direction, index ) {

		var preloadMedia,
		preloadMediaURL,
		position,
		item;

		Litbx.builded = true; // set flag

		// Set current index, when not set
		if ( index === undefined ) {
			//index = Litbx.current.index();
			//index = Litbx.current.index( '[data-group="' + Litbx.groupAttr + '"]' );
			index = Litbx.current;
		}

		// Add active class
		Litbx.elements
			.eq( index ).removeClass( Litbx.options.classes.current );

		// Set current position according to direction
		switch(direction) {

			case '>':

				if ( this.isEnd() && !Litbx.options.loop ) {

					//Litbx.current = index;
					return false; // stop here

				} else if ( this.isEnd() ) {

					Litbx.current = 0;

				} else {

					Litbx.current = index + 1;

				}
				break;

			case '<':

				if ( this.isStart() && !Litbx.options.loop ) {

					//Litbx.current = index;
					return false; // stop here

				} else if ( this.isStart() ) {

					Litbx.current = Litbx.groupLength - 1;


				} else {

					Litbx.current = index - 1;

				}
				break;

			case '=':

				Litbx.current = index;
				break;

		}

	/*
		if ( direction === '>' ) {
			Litbx.current = Litbx.elements.eq( index + 1 );
		} else if ( direction === '<' ) {
			Litbx.current = Litbx.elements.eq( index - 1 );
		}
	*/

		//Core.Title.build();
		Core.Title.build( Core.Build.$wrap, Core.Build.$inner );

		//Core.Images.calculate();
		Core.Images.load();

		// nextImage
		//preloadMedia = Litbx.group.eq( Litbx.current.index() ).addClass( Litbx.options.classes.current );
		//preloadMedia = this.$current().addClass( Litbx.options.classes.current );
		//preloadMedia = Core.Helper.current().addClass( Litbx.options.classes.current );
		//preloadMediaURL = preloadMedia.attr( 'href' );

		// Set new active class
		Litbx.elements
			.removeClass( Litbx.options.classes.current )
			.eq( Litbx.current ).addClass( Litbx.options.classes.current );

		// prepare content to replace
		//item = '<img src="' + preloadMediaURL + '" alt="">';

		// replace inner content
		//Core.Build.$inner.find('img').replaceWith( item );

	};

	// Return Module
	return new Run();

};
;/**
 * --------------------------------
 * Litbx Title
 * --------------------------------
 * Title handling
 * @return {Litbx.Title}
 */

var Title = function(Litbx, Core) {

	/**
	 * Title Module Constructor
	 */
	function Title() {

	}


	/**
	 * Build title
	 */
	Title.prototype.build = function( $wrap, $inner) {

		// Destroy title
		this.destroy();

		// Grab title from attr
		this.currentTitle = Core.Helper.current().attr('title');

		if ( Litbx.options.title && typeof this.currentTitle !== 'undefined' ) {

			// Add some dynamic styles - this is ugly (maybe helpful for some user)
			if ( Litbx.options.helperStyle ) {

				/*
				Core.Build.$title.css({
					'margin-right': Litbx.options.padding[1],
					'margin-left': Litbx.options.padding[3],
					//'line-height': Litbx.options.padding[0] + 'px'
				});
				*/

			}

			// Build markup for title
			if ( Litbx.options.title && Litbx.options.titlePosition === 'outside' ) {

				this.$title = $( Litbx.options.tpl.title ).appendTo( $wrap );

			} else { // Litbx.options.titlePosition === 'inside'

				this.$title = $( Litbx.options.tpl.title ).appendTo( $inner );

				// Add additional markup
				$inner.addClass( 'litbx__inner--' + Litbx.options.titlePosition );

			}

			// Add content and class to title
			this.$title
				.html( this.currentTitle )
				.addClass( Litbx.options.titlePosition );

			this.calcTitle();

		}

	};


	/**
	 * Calc title height
	 */
	Title.prototype.calcTitle = function() {

		// Store height
		this.titleHeight = this.$title.outerHeight();
		//this.titleHeight = $( '.' + Litbx.options.classes.title ).outerHeight();

	};


	/**
	 * Destroy title
	 */
	Title.prototype.destroy = function() {

		/*
		if (typeof this.$title != 'undefined') {

			this.$title.remove();

		}
		*/

		// normalize value
		this.titleHeight = 0;
		this.currentTitle = '';

		// remove title element
		$( '.' + Litbx.options.classes.title ).remove();

	};

	// Return Module
	return new Title();

};;/**
 * --------------------------------
 * Litbx Touch
 * --------------------------------
 * Touch module
 * @return {Litbx.Touch}
 */

var Touch = function(Litbx, Core) {

	/**
	 * Touch Module Constructor
	 */
	function Touch() {}


	// Return Module
	return new Touch();

};
;/**
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

};;/**
 * Wire Litbx to jQuery
 * @param  {object} options Plugin options
 * @return {object}
 */

$.fn.litbx = function ( options ) {

	// todo: don't allow multiple trigger on same element
	// return this.each( function () {
		if ( !$.data( this, 'litbx_api' ) ) {
			var $trigger = this;
			// Trigger plugin on click and prevent default link
			$( this ).on( 'click', function( event ) {
				event.preventDefault();
				$.data( this, 'litbx_api',
					// Init plugin instance
					new Litbx( $trigger, options, $(this) )
				);
			});
		}
	// });

};

})(jQuery, window, document);
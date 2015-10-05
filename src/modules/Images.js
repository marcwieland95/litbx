/**
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
	function Module() {

	}


	/**
	 * Load image
	 */
	Module.prototype.load = function() {

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
	Module.prototype.loading = function() {

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
	Module.prototype.preload = function() {

		if ( Litbx.options.preload ) {

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
	Module.prototype.calculate = function() {

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

			maxViewHeight = Math.min( maxHeight,  maxViewHeight );
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

			});


		} else {

			// Image failed to load - return message
			console.log('Image failed to load');

		}

	};


	// @return Module
	return new Module();

};
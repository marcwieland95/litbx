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
			Litbx.builded = true; // set flag
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
			$('.' + Litbx.options.classes.overlay ).removeClass( 'loading' );

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
			maxWidth = Math.min(Litbx.options.maxWidth, naturalWidth),
			maxHeight = Math.min(Litbx.options.maxHeight, naturalHeight),
			maxViewHeight = $(window).height() - (margin + margin) - (padding + padding), // - margin - padding
			maxViewWidth = $(window).width() - (margin + margin) - (padding + padding),  // - margin - padding
			canExpandHeight,
			canExpandWidth;

			maxViewHeight = Math.min(maxHeight,  maxViewHeight );
			maxViewWidth = Math.min(maxWidth,  maxViewWidth );


			//console.log( ratio );

			//console.log( naturalWidth + ' x ' + naturalHeight );

			/*
				$.each(["Top", "Right", "Bottom", "Left"], function(i, v) {
					if (margin[ i ]) {
						wrap.css('margin' + v, getValue(margin[ i ]));
					}
				});
			 */

			console.log( maxViewHeight );
			console.log( maxViewWidth );


			// set flag for width
			//if ( (margin + padding + width) < Litbx.browserWidth ) {
			if ( width < maxViewWidth ) {
				canExpandWidth = true;
			} else {
				canExpandWidth = false;
			}
			//console.log(canExpandWidth);

			// set flag for height
			//if ( (margin + padding + height ) < Litbx.browserHeight ) {
			if ( height < maxViewHeight ) {
				canExpandHeight = true;
			} else {
				canExpandHeight = false;
			}
			//console.log(canExpandHeight);



			if ( ratio > 1 ) { // landscape
				width = maxViewWidth;
				height = maxViewWidth / ratio;

				if ( height > maxViewHeight ) {
					height = maxViewHeight;
					width = maxViewHeight * ratio;
				}
			}


			if ( ratio < 1 ) { // portrait
				height = maxViewHeight;
				width = maxViewHeight * ratio;

				if ( width > maxViewWidth ) {
					width = maxViewWidth;
					height = maxViewWidth / ratio;
				}
			}


		/*
		if ( Litbx.options.fitToView ) {
			width  = Math.min(maxWidth,  maxViewWidth );
			height = Math.min(maxHeight, maxViewHeight );
		}
		*/

			//Core.Build.$wrap.css({ // undefined ??
			 $( '.' + Litbx.options.classes.wrapper ).css({
				'padding': padding,
				'margin': margin,
				'width': width,
				'height': height,
				//'max-width': maxWidth,
				//'max-height': maxHeight
			});

			//var img_width = image_current.width;
			//var img_height = image_current.height;


			//image.aspectRatio =  image.width / image.height;
			//console.log( image.aspectRatio );

			//console.log( Litbx.browserWidth );
			//console.log( Litbx.browserHeight );

		} else {

			// Image failed to load - return message
			console.log('Image failed to load');

		}

	};


	// @return Module
	return new Module();

};
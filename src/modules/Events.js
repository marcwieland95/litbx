/**
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
			.off('keyup.litbx');

	};


	/**
	 * Browser resize
	 *
	 */
	Module.prototype.resize = function() {

		$(window).on('resize.litbx', this.throttle( function() {
			Core.Images.calculate();
		}, Litbx.options.throttle) );

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


	// @return Module
	return new Module();

};

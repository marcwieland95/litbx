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

/**
 * --------------------------------
 * Litbx Title
 * --------------------------------
 * Title handling
 * @return {Litbx.Title}
 */

var Title = function(Litbx, Core) {

	/**
	 * Image Module Constructor
	 */
	function Module() {

	}


	/**
	 * Build title
	 */
	Module.prototype.build = function( $wrap, $inner) {

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
	Module.prototype.calcTitle = function() {

		// Store height
		this.titleHeight = this.$title.outerHeight();
		//this.titleHeight = $( '.' + Litbx.options.classes.title ).outerHeight();

	};


	/**
	 * Destroy title
	 */
	Module.prototype.destroy = function() {

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

	// @return Module
	return new Module();

};
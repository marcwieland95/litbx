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
		this.build();
	}


	/**
	 * Build title
	 */
	Module.prototype.build = function() {

		if ( Litbx.options.title ) {

			// Grab title from attr
			var currentTitle = Core.Helper.current().attr('title');

			// Remove title when not set
			if ( typeof currentTitle === 'undefined' ) {

				currentTitle = '';

			}

			// Add content and class to title
			Core.Build.$title
				.html( currentTitle )
				.addClass( Litbx.options.titlePosition );

			// Add some dynamic styles
			if ( Litbx.options.helperStyle ) {

				Core.Build.$title.css({
					'margin-right': Litbx.options.padding[1],
					'margin-left': Litbx.options.padding[3],
					'line-height': Litbx.options.padding[0] + 'px'
				});

			}

		}

		/*
		// Measure title height and add margin bottom - just on first run
		//if ( !Litbx.builded && Litbx.options.titlePosition === 'outside' ) {
		if ( Litbx.options.titlePosition === 'outside' ) {

			var title_height = $( '.' + Litbx.options.classes.title ).height();
			//Litbx.options.margin[2] += title_height;
			//console.log( title_height );

			//$( '.' + Litbx.options.classes.wrapper ).css( 'margin-bottom', title_height + 'px' )
		}
		*/

	};

	// @return Module
	return new Module();

};
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

			var currentTitle = Core.Helper.current().attr('title');

			// Remove title when not set
			if ( typeof currentTitle === 'undefined' ) {

				currentTitle = '';

			}

			Core.Build.$title
				.html( currentTitle )
				.addClass( Litbx.options.titlePosition );

		}

	};

	// @return Module
	return new Module();

};
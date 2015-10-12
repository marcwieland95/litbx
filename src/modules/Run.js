/**
 * --------------------------------
 * Litbx Run
 * --------------------------------
 * Run logic module
 * @return {Module}
 */

var Run = function(Litbx, Core) {


	/**
	 * Run Module
	 * Constructor
	 */
	function Module() {

	}

	/**
	 * Check if we are on first slide
	 * @return {boolean}
	 */
	Module.prototype.isStart = function() {
		return Litbx.current === 0;
	};


	/**
	 * Check if we are on last slide
	 * @return {boolean}
	 */
	Module.prototype.isEnd = function() {
		return Litbx.current === Litbx.groupLength - 1;
	};


	/**
	 * Switch image
	 * @param direction
	 * @param index
	 */
	Module.prototype.switch = function ( direction, index ) {

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

		//Core.Images.calculate();

		Core.Images.load();

		Core.Title.build();

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

	return new Module();

};

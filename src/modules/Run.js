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
	 * jQuery object of current item
	 * @return {jquery object}
	 */
	Module.prototype.current = function() {
		return Litbx.elements.eq( Litbx.current );
	};


	/**
	 * Switch image
	 * @param index
	 * @param direction
	 */
	Module.prototype.switch = function ( direction, index ) {

		var preloadMedia,
		preloadMediaURL,
		position;

		// set current index, when not set
		if ( index === undefined ) {
			//index = Litbx.current.index();
			//index = Litbx.current.index( '[data-group="' + Litbx.groupAttr + '"]' );
			index = Litbx.current;
		}

		// add active class
		//Litbx.group
		Litbx.elements
			.eq( index ).removeClass( Litbx.options.classes.current );

		// set current position according to direction
		switch(direction) {

			case '>':
				if ( this.isEnd() ) {
					Litbx.current = 0;
				} else {
					Litbx.current = index + 1;
				}
				break;

			case '<':
				if ( this.isStart() ) {
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

		// nextImage
		//preloadMedia = Litbx.group.eq( Litbx.current.index() ).addClass( Litbx.options.classes.current );
		//preloadMedia = this.$current().addClass( Litbx.options.classes.current );
		preloadMedia = this.current().addClass( Litbx.options.classes.current );
		preloadMediaURL = preloadMedia.attr( 'href' );

		// prepare content to replace
		var item = '<img src="' + preloadMediaURL + '" alt="">';

		// replace inner content
		Core.Build.$inner.find('img').replaceWith( item );

	};


	return new Module();

};

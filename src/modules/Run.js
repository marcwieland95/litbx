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
	 * Switch image
	 * @param index
	 */
	Module.prototype.switch = function ( index ) {

		var preloadMedia,
		preloadMediaURL;

		// nextImage
		preloadMedia = Litbx.gallery.eq( index + 1 );
		preloadMediaURL = preloadMedia.attr( 'href' );

		// prepare content to replace
		var item = '<img src="' + preloadMediaURL + '" alt="">';

		// replace inner content
		Core.Build.$inner.find('img').replaceWith( item );

	};


	return new Module();

};

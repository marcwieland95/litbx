/**
 * --------------------------------
 * Litbx Arrows
 * --------------------------------
 * Arrows navigation module
 * @return {Arrows}
 */

var Arrows = function(Litbx, Core) {


	/**
	 * Arrows Module Constructor
	 */
	function Arrows() {
		this.build();
		this.collect();
	}

	/**
	 * Build
	 * arrows DOM
	 */
	Arrows.prototype.build = function() {

		// Close
		if ( Litbx.options.closeBtn ) {

			Core.Build.$inner.after( Litbx.options.tpl.close );

		}

		// Arrows
		if ( Litbx.options.arrows ) {

			//$( '.' + Litbx.options.classes.inner ).append( Litbx.options.tpl.prev );
			//$( '.' + Litbx.options.classes.inner ).append( Litbx.options.tpl.next );

			// Create arrow after inner-container
			if ( Litbx.elements.length > 1 ) {
				Core.Build.$inner.after( Litbx.options.tpl.prev );
				Core.Build.$inner.after( Litbx.options.tpl.next );
			}

			//$( '.' + Litbx.options.classes.inner ).append( '<span class="' + Litbx.options.classes.arrow + ' ' + Litbx.options.classes.arrowNext + '"></span>' );

		//	this.wrapper = Litbx.slider.find('.' + Glide.options.classes.arrows);
		//	this.items = this.wrapper.children();
		}

	};


	/**
	 * Collect arrow item
	 * arrows DOM
	 */
	Arrows.prototype.collect = function() {

		this.arrows = $( '.' + Litbx.options.classes.overlay ).find( '.' + Litbx.options.classes.arrow );

	};



	// Return Module
	return new Arrows();

};

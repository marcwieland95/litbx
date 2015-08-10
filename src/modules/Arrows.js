/**
 * --------------------------------
 * Litbx Arrows
 * --------------------------------
 * Arrows navigation module
 * @return {Litbx.Arrows}
 */

var Arrows = function(Litbx, Core) {


	/**
	 * Arrows Module Constructor
	 */
	function Module() {
		this.build();
		this.next();
	}

	/**
	 * Build
	 * arrows DOM
	 */
	Module.prototype.build = function() {

		//$( '.' + Litbx.options.classes.inner ).append( Litbx.options.tpl.prev );
		//$( '.' + Litbx.options.classes.inner ).append( Litbx.options.tpl.next );

		// Create arrow after inner-container
		Core.Build.$inner.after( Litbx.options.tpl.prev );
		Core.Build.$inner.after( Litbx.options.tpl.next );


		//$( '.' + Litbx.options.classes.inner ).append( '<span class="' + Litbx.options.classes.arrow + ' ' + Litbx.options.classes.arrowNext + '"></span>' );

	//	this.wrapper = Litbx.slider.find('.' + Glide.options.classes.arrows);
	//	this.items = this.wrapper.children();

	};

	/**
	 * Next image
	 */
	Module.prototype.next = function() {

		$('.litbx__arrow.next').on('click', function() {

			Core.Run.switch( Litbx.itemIndex );

			//console.log ( Litbx.gallery.get( 8 ) );

			//nextItem = Litbx.element.next( '[rel="' + Litbx.galleryRel + '"]' ).addClass('next');



		});


	};


	/**
	 * Prev image
	 */
	Module.prototype.prev = function() {


	};




	// @return Module
	return new Module();

};

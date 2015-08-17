/**
 * Wire Litbx to jQuery
 * @param  {object} options Plugin options
 * @return {object}
 */

$.fn.litbx = function ( options ) {

	// todo: don't allow mulitple trigger on same element
	// return this.each( function () {
		if ( !$.data( this, 'litbx_api' ) ) {
			var $trigger = this;
			// Trigger plugin on click and prevent default link
			$( this ).on( 'click', function( event ) {
				event.preventDefault();
				$.data( this, 'litbx_api',
					// Init plugin instance
					new Litbx( $trigger, options, $(this) )
				);
			});
		}
	// });

};

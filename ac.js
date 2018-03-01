(function( $ ){

	class ACExtenstion {
		constructor() {
			this.$timeGroups = $( '.tracking_objects_list_group' );
			this.addTotal()
		}

		addTotal() {
			const _this = this;
			this.$timeGroups.each( function() {
				let $group = $( this );
				let $groupObjects = $group.find( '.tracking_objects_list_group_object' );
				let totalMinutes = 0;

				$groupObjects.each( function() {
					let $groupObject = $( this );
			        let time = $groupObject.find( '.tracking_object_value' ).find( 'span' ).text();
					if ( time ) {
						const timeInMinute = _this.convertToMinutes( time );
						totalMinutes += timeInMinute;
					}
				} );

				$group.append( `<p><strong>Total: ${ _this.getTotalHours( totalMinutes ) } </strong></p>` );
			} );
		}

		getTotalHours( minutes ) {
			let totalHours = Math.floor( minutes/60 );
			let totalMinutes = minutes % 60;

			totalHours = totalHours > 9 ? totalHours : '0' + totalHours;
			totalMinutes = totalMinutes > 9 ? totalMinutes : '0' + totalMinutes;

			return totalHours + ':' + totalMinutes;
		}

		convertToMinutes( time ) {
			const timeSplit = time.split( ':' );
			const hours = parseInt( timeSplit[0], 10 );
			const minutes = parseInt( timeSplit[1], 10 );

			return ( hours * 60 ) + minutes;
		}
	}

	new ACExtenstion();

})( jQuery );

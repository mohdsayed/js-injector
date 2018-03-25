(function( $ ){

	class ACExtenstion {
		constructor() {
			this.setElementProps();
			this.billableMinutes = 0;
			this.nonBillableMinutes = 0;

			this.addCalculationWrapper();

			$( '#calculate-button' ).on( 'click', () => {
				this.setElementProps();
				this.billableMinutes = 0;
				this.nonBillableMinutes = 0;
				this.addTotal();
				this.addTotalCalculation();
			} );

			this.addTotal();
		}

		setElementProps() {
			this.$timeGroups = $( '.tracking_objects_list_group' );
			this.$actionBarRight = $( '.page_action_bar_right' );

			this.$actionBarRight.css( 'display', 'flex' );
		}

		addTotal() {
			const _this = this;

			this.$timeGroups.each( function() {
				const $group = $( this );
				const $groupObjects = $group.find( '.tracking_objects_list_group_object' );
				let totalMinutes = 0;

				$groupObjects.each( function() {
					const $groupObject = $( this );
			        const time = $groupObject.find( '.tracking_object_value' ).find( 'span' ).text();
			        const isBillable = $groupObjects.find( '.tracking_object_status' ).html() === 'Billable';

					if ( time ) {
						const timeInMinutes = _this.constructor.convertToMinutes( time );
						totalMinutes += timeInMinutes;

						if ( isBillable ) {
							_this.billableMinutes += timeInMinutes;
						} else {
							_this.nonBillableMinutes += timeInMinutes;
						}
					}
				} );

				if ( ! $group.find('.time-total-container').length ) {
					$group.append( '<div class="time-total-container"></div>' );
				}

				$group.find( '.time-total-container' ).html( `<p><strong>Total: ${ _this.constructor.getTotalHours( totalMinutes ) } </strong></p>` );
			} );
		}

		addCalculationWrapper() {
			if ( this.$actionBarRight.length ) {
				this.$actionBarRight.prepend( `<div id="calculation-wrapper" style="margin-top: -15px;"><div id="calculation-container"></div><p><button id="calculate-button">Calculate Again</button></p></div>` );
			}
		}

		addTotalCalculation() {
			const billableHours = this.billableMinutes ? this.constructor.getTotalDays( this.billableMinutes ) : '0:00';
			const nonBillableHours = this.nonBillableMinutes ? this.constructor.getTotalDays( this.nonBillableMinutes ) : '0:00';
			const totalTime = billableHours || nonBillableHours ? this.constructor.getTotalDays( this.billableMinutes + this.nonBillableMinutes ) : '0:00';
			const container = $( '#calculation-container' );

			if ( container.length ) {
				container.html( `<div>
					<p><strong>Billable Time: ${ billableHours }</strong><i>( d:h:m )</i></p>
					<p><strong>Non Billable: ${ nonBillableHours }</strong><i>( d:h:m )</i></p>
					<p><strong>Total Time: ${ totalTime }</strong><i>( d:h:m )</i></p>
				</div>` );
			}
		}

		static getTotalHours( minutes ) {
			let totalHours = Math.floor( minutes/60 );
			let totalMinutes = minutes % 60;

			totalHours = totalHours > 9 ? totalHours : '0' + totalHours;
			totalMinutes = totalMinutes > 9 ? totalMinutes : '0' + totalMinutes;

			return totalHours + ':' + totalMinutes;
		}

		static getTotalDays( minutes ) {
			const oneDay = 8;
			let hours = Math.floor( minutes/60 );
			let totalDays = Math.floor( hours/oneDay );
			let totalHours = hours % oneDay;
			let totalMinutes = minutes % 60;

			const outputDays = totalDays > 0 ? totalDays : '0' + totalDays;
			const outputHours = totalHours > 9 ? totalHours : '0' + totalHours;
			const outputMinutes = totalMinutes > 9 ? totalMinutes : '0' + totalMinutes;

			return outputDays + ':' + outputHours + ':' + outputMinutes;
		}

		static convertToMinutes( time ) {
			const timeSplit = time.split( ':' );
			const hours = parseInt( timeSplit[0], 10 );
			const minutes = parseInt( timeSplit[1], 10 );

			return ( hours * 60 ) + minutes;
		}
	}

	setTimeout( () => {
		new ACExtenstion();
	}, 2000 );

})( jQuery );

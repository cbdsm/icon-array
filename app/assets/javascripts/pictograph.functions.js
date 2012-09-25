var updateSingle = function(val) { 
	if (val != curRisk) {
		var colorIndex = $('form ul.nav li.active a').attr('href').replace('#color', '');
		if (val > curRisk) {
			var color = $('form ul.nav li.active a').css('background-color');
			var i = curRisk;
		} else {
			colorIndex--;
			var color = $('form .tab-content div.active').prev().find('input.color-field').val();
			i = curRisk - 1;
		}
		$('table.pictograph td.#cell' + i).css('background-color', color);
		$('table.pictograph td.#cell' + i).attr('data-color', color);
		$('table.pictograph td.#cell' + i).removeClass().addClass('picto-cell fill' + colorIndex);
	}
	curRisk = val;
};

var updateMultiple = function(thisRisk, thisFill, passInRisk, passInTab) {
	// alert(thisRisk);
	// Table index values

	var cmpRisk = passInRisk || curRisk;
	var thisTab = passInTab || $('.tab-content div.active');

	if (debug) {
		alert('curRisk: ' + cmpRisk + ' thisRisk: ' + thisRisk);
	}
	
	var adjRisk = Math.ceil(thisRisk); // integer risk
	var decRisk = adjRisk - thisRisk; // leftover decimal risk
	var adjCurRisk = Math.ceil(cmpRisk); // integer risk
	var decCurRisk = cmpRisk - adjCurRisk; // leftover decimal risk

	var el = $('table.pictograph td#cell' + adjCurRisk)
	var curVal = $('table.pictograph td.picto-cell').index(el);
	var el2 = $('table.pictograph td#cell' + adjRisk)
	var val = $('table.pictograph td.picto-cell').index(el2);
	var parts = thisFill.split('.');
	var colorIndex = $('form ul.nav li.active a').attr('href').replace('#color', '');
	
	var prevRisk = $('div[data-color="' + thisFill + '"]').parent().prevAll('dt:last');
	var diff = adjRisk - adjCurRisk;
	// This is usually the case
	if (prevRisk.next('dd').children('input.risk-val').length > 0) {
		var prevLeg = prevRisk.next('dd').children('input.risk-val');
		var prevVal = prevLeg.val();
		prevLeg.val(prevVal - diff);
	} else { // This is for the off value
		var prevLeg = prevRisk.next('dd').children('span.risk-val');
		var prevVal = prevLeg.html();
		prevLeg.html(prevVal - diff);
	}
			
	var col2 = el.col();
  var row2 = el.row();
	var col1 = el2.col();
  var row1 = el2.row();
	var startVal;
	var startRow;
	var endVal;
	var endRow;
			
	if (debug) {
		alert('Row1: ' + row1 + ', Column1: ' + col1 + 'Row2: ' + row2 + ', Column2: ' + col2);	
		alert("just clicked: " + val + " current value: " + curVal);
	}
	
	// reset the inner div height
	$('td.picto-cell div').height(height);
	$('td.picto-cell div').css('margin-top', '0');
	
	// We're increasing
	if (diff > 0) {
		var color = thisFill;	
		for(i = row1; i <= row2; i++) {
			endRow = (i + 1) * cols;
			startRow = (i * cols);
			
			// first row
			if (i == row1) {
				endVal = val + 1;
			} else {
				endVal = endRow;
			}

			// last row
			if (i == row2) {
				startVal = curVal + 1;
			} else {
				startVal = startRow;
			}

			var range = $('table.pictograph td.picto-cell').slice(startVal, endVal);
			change_color(range, color);
			range.attr('data-color', color);
			range.removeClass().addClass('picto-cell fill' + colorIndex);
			startVal = endVal;
		}	
		
		// Now we need to see if there are other colors higher up
		// If there are, we move those too--sheesh!
		var hiTabs = thisTab.nextAll("div.color-pane:not('.off')");
		if (hiTabs.length > 0) {
			var color = hiTabs.first().find('input.color-field').val();
			var tabRisk = hiTabs.first().find('input.value-field').val();
			updateMultiple(thisRisk + Number(tabRisk), color, thisRisk + 1, hiTabs.first());
		}
		
		// TODO: when this adjustment is made, we're not bringing down the top value
		// In that event, there are essentially three values,
		// the passed in min, max, and current val
		// We're current grabbing the range where we'd like the vals to be,
		// but not setting cells that fall beyond the range.
		
	// We're decreasing
	// row2 is the first row here
	} else {
		var color = $('input#pictograph_risks_attributes_0_hex').val();
		for(i = row2; i <= row1; i++) {
			endRow = (i + 1) * cols;
			startRow = (i * cols);
			
			// first row
			if (i == row2) {
				endVal = curVal + 1;
			} else {
				endVal = endRow;
			}

			// last row
			if (i == row1) {
				startVal = val + 1;
			} else {
				startVal = startRow;
			}

			var range = $('table.pictograph td.picto-cell').slice(startVal, endVal);
			change_color(range, color);
			range.attr('data-color', color);
			range.removeClass().addClass('picto-cell fill' + 0);
			startVal = endVal;
		}
		
		// Now we need to see if there are other colors higher up
		// If there are, we move those too--sheesh!
		var hiTabs = thisTab.nextAll("div.color-pane:not('.off')");
		if (hiTabs.length > 0) {
			var color = hiTabs.first().find('input.color-field').val();
			var tabRisk = hiTabs.first().find('input.value-field').val();
			updateMultiple(thisRisk + Number(tabRisk), color, thisRisk, hiTabs.first());
		}
	}
	
	// If we need to adjust the value for a decimal
	if (decRisk > 0.0) {
		el2.children('div').height(height * (1.0 - decRisk)).css('margin-top', height * decRisk);
		el2.css('background-color', $('input#pictograph_risks_attributes_0_hex').val());
	}
	
	// Set the form val
	var totalRisk = 0;
  $('input.value-field:not(:disabled)').each(function() {
      totalRisk += Number($(this).val());
  });
	$('input#risks_0_value').val(cells - totalRisk);
	$('.help:visible').hide();
};
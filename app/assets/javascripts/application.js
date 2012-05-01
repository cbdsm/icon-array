// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap
//= require bootstrap-tab
//= require bootstrap-tooltip
//= require bootstrap-popover
//= require bootstrap-alert
//= require bootstrap-modal
//= require bootstrap-dropdown
//= require jquery.miniColors.min
//= require jquery.livequery
//= require jquery.jeditable.min
	
$(document).ready(function() {
	// globals
	// This stuff is mostly for embedding/linking
	var debug = false;
	var host = window.location.hostname;
	var port = window.location.port;
	var url;
	if (port != 80) {
		url = host + ':' + port;
	} else {
		url = host;
	}
	
	// semi-globals
	var curRisk = $('input#risks_1_value').val(); //$('form .tab-content div.active input.risk-field').val();
	var colorIndex = 1; //$('form ul.nav li.active a').attr('href').replace('#color', '');
	var cols = $('table.pictograph tr:first td.picto-cell').length;
	var rows = $('table.pictograph tr:not(".bottom-row")').length;
	var cells = rows * cols;
	var width = $('td#cell1').width();
	var height = $('td#cell1').height();
	
	if (debug) {
		$('td.picto-cell').livequery(function(){
			$(this).children('div').html($('table.pictograph td.picto-cell').index($(this)));
		});
	}
	
	$('.dropdown-toggle').dropdown()
	
	// This allows us to set the li active for any active a tag
	$('.nav a.active').parent('li').addClass('active');

	$('div.legend-icon').on('click', function(event){
		$(this).next('div.risk-fill').toggle();
	});
	
	// $('a[data-toggle="tab"]').on('shown', function (e) {
	$("body").on("shown", 'a[data-toggle="tab"]', function(e){
		$('a.submittable:visible').hide();
		// If this is a risk/color tab
	  if ($(e.target).parent().hasClass('color-tab')) {
			var href = $(e.target).attr('href');
			var tab = $(href);
			if (href != '#color0') { // If this isn't the 'off' tab
				tab.find('input.value-field').focus();
			} else {
				tab.find('input.color-field').focus();
				$('.help:visible').hide();
			}
		} else {
			$('.help:visible').hide();
		}
	  // e.relatedTarget // previous tab
	})
	
	// $('a.editable').click(function(){
	$("body").on("click", "a.editable", function(event){
		$(this).hide();
		$('.help:visible').hide();
		$('a.submittable:visible').hide();
		$('table.pictograph').removeClass('active');
		
		var edit = $(this).attr('href');
		var edit_submit = edit + '_submit';
		$('input#pictograph_title').show();
		$(edit).focus();
		$(edit_submit).show();
		return false;
	});
	
	// Show/hide OK button on focus/blur
	$("body").on("focus", "input.editable", function(event){
		$('a.submittable:visible').hide();
		
		$('input').removeClass('active');
		$(this).addClass('active');
		
		if ($(this).hasClass('value-field')) {
			curRisk = current_risk();
			$('table.pictograph').addClass('active');
			$('p#value-help').show();
		} else {
			$('table.pictograph').removeClass('active');
			$('.help:visible').hide();
		}
		
		// If there's an open "click to edit field"
		$('input.editor').hide();
		$('input.editor').siblings('a.editable').show();
		
		var submit = $(this).next('a.submittable');
		$(submit).show();
	});
	
	// Same for color picker
	$("body").on("focus", "input.color-field", function(event){
		$('a.submittable:visible').hide();
		$('table.pictograph').removeClass('active');
	});
	
	// focus on first risk
	$('input#risks_1_value').focus();
			
	$("body").on("click", "table.pictograph:not(.active)", function(event){	
		$(this).addClass('active');
	});	
			
	// After updating a form field		
	$("body").on("click", "a.submittable", function(event){
		var tmpRisk = curRisk;
		// get input & value
		var edit = '#' + $(this).attr('id').replace('_submit', '');
		var val = $(edit).val();
		
		// hide stuff
		$('.help:visible').hide();
		$(this).hide();
		
		// If this is a "click to edit field"
		if ($('a[href="' + edit + '"]').length > 0) {
			var editable = $('a[href="' + edit + '"]');
			$(edit).hide();
			if (val != '') {
				$(editable).html(val);
			}
			$(editable).show();
		}
		
		// If this is the risk field, we've got a bit more work to do
		if ($(edit).hasClass('value-field')) {
			//var color = $(this).parent().prev('dt').children('div.legend-icon').attr('data-color'); // old legend style
			var color = $('div.tab-content div.active').find('input.color-field').val();
			
			var totalRisk = 0;
			$('.tab-content div.active').prevAll("div.color-pane:not('.off')").each(function() {
		    totalRisk += Number($(this).find('input.value-field').val());
	    });
	
			var thisRisk = totalRisk + Number(val);
			
			if (thisRisk > cells || thisRisk < 0 || !isNumber(thisRisk) || !thisRisk) {
				alert("Please enter a number between 0 and " + cells);
				$(edit).val(tmpRisk);
				$(edit).focus();
			} else {
				updateMultiple(thisRisk, color);
			}
		}
		return false;
	});
	
	// We want enter to submit on the OK buttons
	$('body').keypress(function(e){
		if(e.which == 13){
			e.preventDefault();
			$('a.submittable:visible:last').click();
			$('input.active').blur();
			
			// .hide();
			// var edit = '#' + $(this).attr('id').replace('_submit', '');
			// var editable = $('a[href="' + edit + '"]');
			// var val = $(edit).val();
			// var color = $(this).parent().prev('dt').children('div.legend-icon').attr('data-color');
			// 
			// $(this).hide();
			// $(edit).hide();
			// if (val != '') {
			// 	$(editable).html(val);
			// }
			// $(editable).show();
			// if ($(edit).hasClass('risk-val')) {
			// 	updateMultiple(val, color);
			// }
			// return false;		
		}
	});
	
	// Advanced Tab
	$('a[href="/advanced"]').click(function(){
		if ($('.actions a:contains("edit")').length > 0) {
			var formvars = $('.actions a:contains("edit")').attr('href').replace('/?', '');
		} else {
			var formvars = decodeURIComponent($("form.picto-form").serialize());
			formvars = formvars.replace(/utf8=./, '');
			formvars = formvars.replace(/&authenticity_token=/, '');
			formvars = formvars.replace(AUTH_TOKEN + '&', '');
			// formvars = formvars.replace(/pictograph\[(\w+)\]/gi, "$1");
			formvars = formvars.replace(/\#/gi, "%23");
			// $('#save-share div.modal-body p').html(url + '/pictographs/view?' + formvars);
			// $('#save-share').modal('show');
		}
		
		$(this).attr('href', '/advanced?' + formvars);
	});
		
	// Save/Share
	$('a[href="#save-share"]').click(function(){
		if ($(this).parent().not('.preview-actions')) {
			var formvars = decodeURIComponent($(this).parents("form").serialize());
			formvars = formvars.replace(/utf8=./, '');
			formvars = formvars.replace(/&authenticity_token=/, '');
			formvars = formvars.replace(AUTH_TOKEN + '&', '');
			formvars = formvars.replace(/pictograph\[(\w+)\]/gi, "$1");
			formvars = formvars.replace(/\#/gi, "%23");
			
			url = 'http://icon-array.heroku.com';
			full_url = url + '/pictographs/view/?' + formvars, '#save-share div.modal-body p';
			// bit_url(full_url);
			$('#save-share div.modal-body p').html(full_url);
		}
		$('#save-share').modal('show');
	});
	
	// Embed
	$('a[href="#embed"]').click(function(){
		if ($(this).parent().not('.preview-actions')) {
			var formvars = decodeURIComponent($(this).parents("form").serialize());
			formvars = formvars.replace(/utf8=./, '');
			formvars = formvars.replace(/&authenticity_token=/, '');
			formvars = formvars.replace(AUTH_TOKEN + '&', '');
			formvars = formvars.replace(/pictograph\[(\w+)\]/gi, "$1");
			formvars = formvars.replace(/\#/gi, "%23");
		
			// We check to see if the first risk has text
			// If not, don't show the legend (i.e. width is just table width)
			var width = $('table.pictograph').width();
			if ($('input#risks_1_description').val() != '') {
				width += 420;
			}
		
			// NOTE: width and height need to be calculated
			// and to depend on whether there is a legend or not (i.e. whether there are risk descriptions)
			$('#embed div.modal-body p').text('<iframe src="http://' + url + '/pictographs/embed?' + formvars + '" type="text/html" width="' + width + '" height="550" scrolling="no" frameborder="0"></iframe>');
			// $('#embed div.modal-body p').text('<iframe src="" type="text/html" width="' + width + '" height="550" scrolling="no" frameborder="0"></iframe>');
			// url = 'http://icon-array.heroku.com';
			// bit_url(url + '/pictographs/embed/?' + formvars, '#save-share div.modal-body p');
			// http://' + url + '/pictographs/embed?' + formvars + '
		}
		$('#embed').modal('show');
	});
	
	// $('form ul.nav-tabs li a').live('click', function(){
	// 	colorIndex = $(this).attr('href').replace('#color', '');
	// 	curRisk = $('form .tab-content div.active input.risk-field').val();
	// });
	
	// These are all ways of automatically updating the picto risk number
	// They're not well supported across browsers, undfortunately
	// $('form .tab-content div.active input.risk-field').click(function(){
	// 	var val = $(this).val();
	// 	var color = $('div.tab-content div.active').find('input.color-field').val();
	// 	updateSingle(val, color);
	// });
	// 
	// $('form .tab-content div.active input.risk-field').change(function(){
	//    updateMultiple($(this).val(), $('div.tab-content div.active').find('input.color-field').val());
	// });
	// 
	// $('form .tab-content div.active input.risk-field').keyup(function(){
	//    updateMultiple($(this).val(), $('div.tab-content div.active').find('input.color-field').val());
	// });
	// 
	// $('form .tab-content div.active input.risk-field').mousewheel(function(){
	// 	var val = $(this).val();
	// 	var color = $('div.tab-content div.active').find('input.color-field').val();
	// 	updateSingle(val, color);
	// });
	
	// .colorpicker will render just the square
	// this is the id we get: pictograph_risks_attributes_1_hex
	// We're using livequery here because the 'load' event doesn't seem to work with on/live
	$('input.color-field').livequery(function(){
		$(this).miniColors({
	    change: function(hex, rgb) {
				$(this).val(hex);
				var klass = $(this).attr('id').replace('pictograph_risks_attributes_', '').replace('_hex', '');
				$('td.fill' + klass).css('backgroundColor', hex);
				$('td.fill' + klass).attr('data-color', hex);
				//$(this).parent().prev('div.legend-icon').css('background-color', hex);
				$('form ul.nav li.active a').css('background-color', hex);
		 }
		});
	});
	
	// This gives us the cell hover effect for choosing a value
	$('body').on('hover', 'table.pictograph.active td.picto-cell', function( event ) {
		// in
		if ( event.type === 'mouseenter' ) {
			// Form values
			var thisRisk = $(this).attr('id').replace('cell', ''); // value of the cell we're on
			tmpRisk = current_risk();
			
			// If we're using icons--DEPRECATED
			if ($(this).attr('data-icon') != undefined) {
				if (thisRisk > tmpRisk) {
					var icon = $('form .tab-content div.active').find('img.form-icon').attr('src');
				} else {
					var icon = $('form .tab-content div.active').prev().find('img.form-icon').attr('src');
				}
				$(this).children('img').attr('src', icon);			
			} else {
				// This should be on the tab callback, really
				// var el = $('form ul.nav li.active a');
				// var colorIndex = el.attr('href').replace('#color', '');
				
				// If we're moving up
				if (thisRisk > tmpRisk) {
					var color = $('form ul.nav li.active a').css('background-color');
					
				// Otherwise we're moving back
				} else {
					var color = $('input#pictograph_risks_attributes_0_hex').val();
				}
				$(this).children('div').css('background-color', color);
			}	   
		} else {
    	if ($(this).attr('data-icon') != undefined) {
				var curIcon = $(this).attr('data-icon');
				$(this).children('img').attr('src', curIcon);		
			} else {
				var curColor = $(this).attr('data-color');
				$(this).children('div').css('background-color', curColor);
			}
		}
	});
	
	// This actually sets the value
	$('body').on('click', 'table.pictograph.active td.picto-cell', function( event ) {
		var thisRisk = Number($(this).attr('id').replace('cell', '')); // value of the cell we're on
		var totalRisk = 0;
		$('.tab-content div.active').prevAll("div.color-pane:not('.off')").each(function() {
	    totalRisk += Number($(this).find('input.value-field').val());
    });
		var curRisk = current_risk();
		if (thisRisk <= curRisk) {
			thisRisk--;
		}
		updateMultiple(thisRisk, $('div.tab-content div.active').find('input.color-field').val());
		$('form .tab-content div.active input.value-field').val(thisRisk - totalRisk);
		$('a.submittable:visible').hide();
		$('table.pictograph').removeClass('active');
	});
	
	
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
	
	var updateMultiple = function(thisRisk, thisFill) {
		// alert(thisRisk);
		// Table index values
		if (debug) {
			alert('curRisk: ' + curRisk + ' thisRisk: ' + thisRisk);
		}
		
		var adjRisk = Math.ceil(thisRisk); // integer risk
		var decRisk = adjRisk - thisRisk; // leftover decimal risk
		var adjCurRisk = Math.ceil(curRisk); // integer risk
		var decCurRisk = curRisk - adjCurRisk; // leftover decimal risk

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

				$('table.pictograph td.picto-cell div').slice(startVal, endVal).css('background-color', color);
				$('table.pictograph td.picto-cell').slice(startVal, endVal).attr('data-color', color);
				$('table.pictograph td.picto-cell').slice(startVal, endVal + 1).removeClass().addClass('picto-cell fill' + colorIndex);
				startVal = endVal;
			}	
			
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

				$('table.pictograph td.picto-cell div').slice(startVal, endVal).css('background-color', color);
				$('table.pictograph td.picto-cell').slice(startVal, endVal).attr('data-color', color);
				$('table.pictograph td.picto-cell').slice(startVal, endVal).removeClass().addClass('picto-cell fill' + 0);
				startVal = endVal;
			}
		}
		
		// TODO
		// If we need to adjust the value for a decimal
		if (decRisk > 0.0) {
			el2.children('div').height(height * (1.0 - decRisk)).css('margin-top', height * decRisk);
			el2.css('background-color', $('input#pictograph_risks_attributes_0_hex').val());
		}

	
				
		// // If we're moving up
		// if (diff > 0) {
		// 	
		// 	var startVal;
		// 	var startRow;
		// 	var endVal;
		// 	var endRow;
		// 	for(i = row1; i <= row2; i++) {
		// 		endRow = (i + 1) * cols;
		// 		startRow = (i * cols);
		// 		if (i == row1) {
		// 			endVal = val;
		// 		} else {
		// 			endVal = endRow;
		// 		}
		// 		
		// 		if (i == row2) {
		// 			startVal = curVal + 1;
		// 		} else {
		// 			startVal = startRow;
		// 		}
		// 		
		// 		alert(startVal + ' ' + endVal);
		// 		$('table.pictograph td.picto-cell').slice(startVal, endVal).css('background-color', color);
		// 		startVal = endVal;
		// 	}
		// 	
		// 	// If we're in the same row
		// 	if (1 == 1) {
		// 		// $('table.pictograph td.picto-cell').slice(curVal + 1, val).css('background-color', color);
		// 		// $('table.pictograph td.picto-cell').slice(curVal + 1, val).attr('data-color', color);
		// 	} else {
		// 	
		// 		// Upper adjustment
		// 		var high2 = val + 1;
		// 		var high1 = val - (val % cols);
		// 	
		// 		// Lower adjustment
		// 		var low1 = curVal;
		// 		var low2 = curVal - (curVal % cols);
		// 		if ((low1 - high1) >= 10){
		// 			 low2 += cols;
		// 		}
		// 	
		// 		if (debug) {
		// 			alert("high1: " + high1 + ", high2: " + high2);
		// 			alert("low1: " + low1 + ", low2: " + low2);
		// 		}
		// 	
		// 		// If we have a file extension, this is an icon
		// 		if (parts.length > 1) {
		// 			// Get the icon
		// 			var icon = $('form .tab-content div.active').find('img.form-icon').attr('src');
		// 
		// 			// Upper
		// 			$('table.pictograph td.picto-cell').slice(high1, high2).children('img').attr('src', icon);
		// 			$('table.pictograph td.picto-cell').slice(high1, high2).attr('data-icon', icon);
		// 
		// 			// Lower
		// 			$('table.pictograph td.picto-cell').slice(low1, low2).children('img').attr('src', icon);
		// 			$('table.pictograph td.picto-cell').slice(low1, low2).attr('data-icon', icon);
		// 
		// 			// The rest
		// 			$('table.pictograph td.picto-cell').slice(high1 + cols, low2 - 1).children('img').attr('src', icon);
		// 			$('table.pictograph td.picto-cell').slice(high1 + cols, low2 - 1).attr('data-icon', icon);
		// 		} else {
		// 			// get the color
		// 			var color = thisFill;
		// 			
		// 			// Upper
		// 			$('table.pictograph td.picto-cell').slice(high1, high2).css('background-color', color);
		// 			$('table.pictograph td.picto-cell').slice(high1, high2).attr('data-color', color);
		// 
		// 			// Lower
		// 			$('table.pictograph td.picto-cell').slice(low1, low2).css('background-color', color);
		// 			$('table.pictograph td.picto-cell').slice(low1, low2).attr('data-color', color);
		// 
		// 			// The rest
		// 			$('table.pictograph td.picto-cell').slice(high1 + cols, low2 - 1).css('background-color', color);
		// 			$('table.pictograph td.picto-cell').slice(high1 + cols, low2 - 1).attr('data-color', color);
		// 		}
		// 		// Update the fill index
		// 		$('table.pictograph td.picto-cell').slice(high1, high2).removeClass().addClass('picto-cell fill' + colorIndex);			
		// 		$('table.pictograph td.picto-cell').slice(low1, low2).removeClass().addClass('picto-cell fill' + colorIndex);
		// 		$('table.pictograph td.picto-cell').slice(high1 + cols, low2 - 1).removeClass().addClass('picto-cell fill' + colorIndex);
		// 	}
		// } else { // Otherwise, we're decreasing
		// 	
		// 	// Upper adjustment
		// 	var high2 = curVal + 1;
		// 	var high1 = curVal - (curVal % cols);
		// 	
		// 	// Lower adjustment
		// 	var el = $('table.pictograph td#cell' + curRisk)
		// 	var low1 = val + 1;
		// 	var low2 = val - (val % cols) + cols;
		// 	if ((low1 - high1) < 10){
		// 		low1--;
		// 		high1 = low1;
		// 		low2 = high2;
		// 	}
		// 	
		// 	if (debug) {
		// 		alert("high1: " + high1 + ", high2: " + high2);
		// 		alert("low1: " + low1 + ", low2: " + low2);
		// 	}
		// 	
		// 	if (parts.length > 1) {
		// 		// Get the icon
		// 		var icon = $('form .tab-content div.active').find('img.form-icon').attr('src');
		// 		
		// 		// Upper
		// 		$('table.pictograph td.picto-cell').slice(high1, high2).children('img').attr('src', icon);
		// 		$('table.pictograph td.picto-cell').slice(high1, high2).attr('data-icon', icon);
		// 	
		// 		// Lower
		// 		$('table.pictograph td.picto-cell').slice(low1, low2).children('img').attr('src', icon);
		// 		$('table.pictograph td.picto-cell').slice(low1, low2).attr('data-icon', icon);
		// 	
		// 		// The rest
		// 		$('table.pictograph td.picto-cell').slice(high1, low2 - cols).children('img').attr('src', icon);
		// 		$('table.pictograph td.picto-cell').slice(high1, low2 - cols).attr('data-icon', icon);
		// 		
		// 	} else {
		// 		var color = $('form .tab-content div.active').prev().find('input.color-field').val();
		// 		//var color = prevRisk.children('div.legend-icon').attr('data-color');
		// 		
		// 		// Upper
		// 		$('table.pictograph td.picto-cell').slice(high1, high2).css('background-color', color);
		// 		$('table.pictograph td.picto-cell').slice(high1, high2).attr('data-color', color);
		// 	
		// 		// Lower
		// 		$('table.pictograph td.picto-cell').slice(low1, low2).css('background-color', color);
		// 		$('table.pictograph td.picto-cell').slice(low1, low2).attr('data-color', color);
		// 	
		// 		// The rest
		// 		$('table.pictograph td.picto-cell').slice(high1, low2 - cols).css('background-color', color);
		// 		$('table.pictograph td.picto-cell').slice(high1, low2 - cols).attr('data-color', color);	
		// 	}
		// 	$('table.pictograph td.picto-cell').slice(high1, high2).removeClass().addClass('picto-cell fill' + colorIndex);
		// 	$('table.pictograph td.picto-cell').slice(low1, low2).removeClass().addClass('picto-cell fill' + colorIndex);
		// 	$('table.pictograph td.picto-cell').slice(high1, low2 - cols).removeClass().addClass('picto-cell fill' + colorIndex);
		// }
		
		// Set the form val
		// TODO: we don't actually want to set this to the risk
		// We want something like thisRisk - all lower risks
		// $('form .tab-content div.active input.risk-field').val(thisRisk);
		var totalRisk = 0;
    $('input.value-field:not(:disabled)').each(function() {
        totalRisk += Number($(this).val());
    });
		$('input#risks_0_value').val(cells - totalRisk);
		$('.help:visible').hide();
	};
	
	//bit_url function
	function bit_url(url, element) { 
		var url=url;
		var username="ideaoforder"; // bit.ly username
		var key="ENV['BITLY_KEY']";
		$.ajax({
			url:"http://api.bit.ly/v3/shorten",
			data:{longUrl:url,apiKey:key,login:username},
			dataType:"jsonp",
			success:function(v) {
				var bit_url=v.data.url;
				$(element).html(bit_url);
			}
		});
	}
	
	function current_risk() {
		var curCell = $('.tab-content div.active input.value-field').val();
		var curRisk;
		var hiVal = cells - $('input#risks_0_value').val();
		if (curCell == 0) {
			// curRisk = hiVal;
			
			var hiRisk = 0;
			$('.tab-content div.active').prevAll("div.color-pane:not('.off')").each(function() {
		    hiRisk += Number($(this).find('input.value-field').val());
			    });
			curRisk = hiRisk;
		} else {
			curRisk = curCell;
		}
		
		$('.tab-content div.active').prevAll("div.color-pane:not('.off')").each(function() {
	    curRisk += Number($(this).find('input.value-field').val());
    });
		return curRisk;
	}
	
	function isNumber(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}
	
});

// This just gives us basic row and column
(function( $ ) {
  $.fn.col = function() {
  	return this.parent().children().index(this);
  };
  $.fn.row = function() {
  	return this.parent().parent().children().index(this.parent());
  };
})( jQuery );

// This makes our number picker way cooler
(function(c){var a=["DOMMouseScroll","mousewheel"];c.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var d=a.length;d;){this.addEventListener(a[--d],b,false)}}else{this.onmousewheel=b}},teardown:function(){if(this.removeEventListener){for(var d=a.length;d;){this.removeEventListener(a[--d],b,false)}}else{this.onmousewheel=null}}};c.fn.extend({mousewheel:function(d){return d?this.bind("mousewheel",d):this.trigger("mousewheel")},unmousewheel:function(d){return this.unbind("mousewheel",d)}});function b(i){var g=i||window.event,f=[].slice.call(arguments,1),j=0,h=true,e=0,d=0;i=c.event.fix(g);i.type="mousewheel";if(i.wheelDelta){j=i.wheelDelta/120}if(i.detail){j=-i.detail/3}d=j;if(g.axis!==undefined&&g.axis===g.HORIZONTAL_AXIS){d=0;e=-1*j}if(g.wheelDeltaY!==undefined){d=g.wheelDeltaY/120}if(g.wheelDeltaX!==undefined){e=-1*g.wheelDeltaX/120}f.unshift(i,j,e,d);return c.event.handle.apply(this,f)}})(jQuery);

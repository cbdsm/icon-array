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
//= require jquery.row-column
//= require jquery.ui.draggable
//= require modernizr.svg.js
//= require globals
//= require helpers
//= require save_share
//= require pictograph.functions

$(document).ready(function() {
	if (debug) {
		$('td.picto-cell').livequery(function(){
			$(this).children('div').html($('table.pictograph td.picto-cell').index($(this)));
		});
	}
	
	$('.dropdown-toggle').dropdown()
	
	// This allows us to set the li active for any active a tag
	$('.nav a.active').parent('li').addClass('active');
	
	
	// Disabled 'disabled' links
	$('a.disabled').livequery(function(){
		$(this).click(function(){
			return false;
		});
	});
	
	// Set proper help menu

	if (decimals > 1 || thousand()) {
		$('input.value-field:visible').addClass('highlight');
		$('table.pictograph').removeClass('active');
		$('.help:visible').hide();
		$('p#off-help').show();
	}

	// I think this is deprecated
	$('div.legend-icon').on('click', function(event){
		$(this).next('div.risk-fill').toggle();
	});
	
	$('body').on('click', 'input.remove-color', function( event ) {
		var r = confirm("Are you sure? This cannot be undone.");
		if (r) {
			$(this).prev('input').val(1);
			return true;
		} else {
			return false;
		}
	});
	
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
	
	// When we leave the body field, set val
	$("body").on("blur", "input#pictograph_title", function(event){
		$("a[href='#pictograph_title']").html($(this).val());
		$(this).hide();
		$(this).siblings('a.editable').show();
	});
	
	// Show/hide OK button on focus/blur
	$("body").on("focus", "input.editable", function(event){
		$('a.submittable:visible').hide();
		
		$('input').removeClass('active');
		$(this).addClass('active');
		
		if ($(this).hasClass('value-field')) {
			curRisk = current_risk();
			if (decimals < 1 && !thousand()) {
				$('table.pictograph').addClass('active');
				$('.help:visible').hide();
				$('p#value-help').show();
				$(this).removeClass('highlight');
			} else {
				$('input.value-field:visible').addClass('highlight');
				$('table.pictograph').removeClass('active');
				$('.help:visible').hide();
				$('p#off-help').show();
			}
		} else {
			$('input.value-field:visible').addClass('highlight');
			$('table.pictograph').removeClass('active');
			$('.help:visible').hide();
			$('p#off-help').show();
		}
		
		// If there's an open "click to edit field"
		$('input.editor').hide();
		$('input.editor').siblings('a.editable').show();
		
		var submit = $(this).next('a.submittable');
		$(submit).show();
	});
	
	// Same for color picker
	$("body").on("focus", "input.color-field", function(event){
		$('input').removeClass('active');
		$(this).addClass('active');
		$('a.submittable:visible').hide();
		$('table.pictograph').removeClass('active');
		$('.help:visible').hide();
	});
	// Same for color picker
	$("body").on("click", "a.miniColors-trigger", function(event){
		$('input').removeClass('active');
		$('a.submittable:visible').hide();
		$('table.pictograph').removeClass('active');
		$('.help:visible').hide();

		color = hex2rgbstr($("input.color-field:visible").val());
		color_cells = $('td.picto-cell div').filter(function() { return ( $(this).css('background-color') == color )});
		color_bgs = $('td.picto-cell').filter(function() { return ( $(this).css('background-color') == color )});
	});
	
	
	// focus on first risk
	$('input#risks_1_value').focus();
			
	// TODO: this is setting the curVal, so it's disabled until it can be troubleshot		
	// $("body").on("click", "table.pictograph:not(.active)", function(event){	
	// 	$(this).addClass('active');
	// });	
			
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
			var curTotal = current_total();
			var availableRisk = cells - tmpRisk;
			// If this is a thousand unit picto, adjust accordingly
			if (thousand()) {
				cells *= 4;
			}
			if (curTotal > cells) {
				alert("The number you've entered is out of range--we've adjusted accordingly.");
				thisRisk -= (curTotal - cells);
				$(edit).val(thisRisk);
				$(edit).closest('div.color-pane').find('input.destroy').val('0');
				updateMultiple(thisRisk, color);
			} else if (thisRisk > cells || thisRisk < 0 || !isNumber(thisRisk) || !thisRisk) {
				alert("Please enter a number between 0 and " + cells);
				$(edit).val(tmpRisk);
				$(edit).focus();
				$(edit).closest('div.color-pane').find('input.destroy').val('1');
			} else {
				$(edit).closest('div.color-pane').find('input.destroy').val('0');
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
	$("body").on("keyup", "form .tab-content div.active input.risk-field", function(event){
		decimals = num_decimals();
		if (decimals > 0 || thousand()) {
			$('input.value-field:visible').addClass('highlight');
			$('table.pictograph').removeClass('active');
			$('.help:visible').hide();
			$('p#off-help').show();
		} else {
			$('table.pictograph').addClass('active');
			$('.help:visible').hide();
			$('p#value-help').show();
			$(this).removeClass('highlight');
		}
	});
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
				color_cells.css('background-color', hex); 
				color_bgs.css('background-color', hex);

				//$(this).parent().prev('div.legend-icon').css('background-color', hex);
				
				$('form ul.nav li.active a').attr('data-color', hex);
				$('form ul.nav li.active a div.box-icon').css('background-color', hex);
				$('form ul.nav li.active a img').css('background-color', hex);
		 }
		});
	});
	
	// This gives us the cell hover effect for choosing a value
	$('body').on('hover', 'table.pictograph', function( event ) {
		// in
		if ( event.type === 'mouseenter' ) {
			if (thousand()) {
				$('#thousand-alert').show();
			} else if (decimals > 0) {
				$('#decimal-alert').show();
			} 
		// out
		} else {
			$('#decimal-alert').hide();
			$('#thousand-alert').hide();
		}
	});

	// This gives us the cell hover effect for choosing a value
	$('body').on('hover', 'table.pictograph.active td.picto-cell', function( event ) {
		// in
		if ( event.type === 'mouseenter' ) {
			if (decimals < 1 && !thousand()) {
				var index = $('form ul.nav li.active a').attr('href').replace('#color', '');
				
				// Form values
				var thisRisk = $(this).attr('id').replace('cell', ''); // value of the cell we're on
				tmpRisk = current_risk();
				prevRisk = previous_risk();
				var prevTotal = previous_total();
				
				if (thisRisk > prevTotal) {
					// If we're moving up
					if (thisRisk > tmpRisk) {
						var color = $('form ul.nav li.active a').attr('data-color');
					// Otherwise we're moving back
					} else {			
						var color = $('input#pictograph_risks_attributes_0_hex').val();
					}
					change_color($(this), color);
				}	 
			}  

		} else { // Mouse exit
			var curColor = $(this).attr('data-color');
			change_color($(this), curColor);
		}
	});
	
	// This actually sets the value
	$('body').on('click', 'table.pictograph.active td.picto-cell', function( event ) {
		if (decimals < 1 && !thousand()) {
			var thisRisk = Number($(this).attr('id').replace('cell', '')); // value of the cell we're on
			var totalRisk = previous_total();
			curRisk = current_risk();

			// We only allow updates down to the end of the previous color
			// Except if we're on the last color
			if (thisRisk > totalRisk) {
				if (thisRisk <= curRisk) {
					thisRisk--;
				}
				$('form .tab-content div.active input.value-field').val(thisRisk - totalRisk);
				$('form .tab-content div.active input.destroy').val('0');
				updateMultiple(thisRisk, $('div.tab-content div.active').find('input.color-field').val());

				$('a.submittable:visible').hide();
				$('table.pictograph').removeClass('active');
				$('p#off-help').show();
				$('input.value-field:visible').addClass('highlight');
			}
			// This is a start to keep the picto active at all times
		}
		$('input.value-field:visible').focus();
	});
	
	$("div.wide-editor").draggable();

	// When someone clicks on an icon
	$('img.overlay').click(function(){
		var img = $(this).attr('src');
		
		// // Turning this off until Ryan can weigh in on the weird lines
		// if(Modernizr.svg) {
		// 	img = img.replace('png','svg')
		// }

		$('#pictograph_icon').val(img);
		var alt = $(this).attr('alt');
		var height = $('td.picto-cell:first').children(':first').height();
		var color;

		// If we have an image, replace it
		if ($('td.picto-cell:first').find('img').length > 0) {
			$('td.picto-cell img').attr('src', img);
		} else {
			$('td.picto-cell').append('<img class="picto-cell-icon" alt="' + alt + '" src="' + img + '" style="height:' + height + 'px; position: absolute; top: 0px;"></div>');
		}
		
		// Set the tab icon too
		$('li.color-tab a').html('<img alt="' + alt + '" src="' + img + '" style="height:15px;">');
		$('li.color-tab a img').each(function(){
			color = $(this).closest('a').attr('data-color');
			$(this).css('background-color', color);
		});
	});
	
	// When someone clicks on the box
	$('.field div.box-icon').click(function(){
		var td = $('td.picto-cell:first');
		var height = td.children(':first').height();
		var width = td.width();
		$('#pictograph_icon').val(null);

		$('td.picto-cell img').remove();

		$('li.color-tab a').html("<div class='box-icon' style='width:9px; height: 15px;'></div>");
		$('li.color-tab a div.box-icon').each(function(){
			var color = $(this).closest('a').attr('data-color');
			$(this).css('background-color', color);
		});
	});

	// Try to set the axis format when we switch from left to right
	$('body').on('click', 'input#pictograph_axis_position_left', function( event ) {
		$('input#pictograph_axis_format').val('%n ---');
	});
	$('body').on('click', 'input#pictograph_axis_position_right', function( event ) {
		$('input#pictograph_axis_format').val('--- %n');
	});

	// Disable rows/cols and set default options for 1000 unit picto
	$('body').on('change', 'select#pictograph_cell_grouping', function( event ) {
		if ($(this).val() == 'thousand') {
			$('input#pictograph_cols').val('25');
			$('input#pictograph_rows').val('40');
			$('input#pictograph_cell_height').val('10');
			$('input#pictograph_cell_width').val('6');
			$('input#pictograph_cell_spacing').val('2');
			$('input#pictograph_cols').attr('readonly', true);
			$('input#pictograph_rows').attr('readonly', true);
		} else {
			$('input#pictograph_cols').val('10');
			$('input#pictograph_rows').val('10');
			$('input#pictograph_cell_height').val('40');
			$('input#pictograph_cell_width').val('22');
			$('input#pictograph_cell_spacing').val('5');
			$('input#pictograph_cols').attr('readonly', false);
			$('input#pictograph_rows').attr('readonly', false);
		}
	});
	
	
});

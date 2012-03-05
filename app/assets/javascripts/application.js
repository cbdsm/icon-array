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
//= require jquery.miniColors.min

	
$(document).ready(function() {
	// semi-globals
	var curRisk = $('form .tab-content div.active input.risk-field').val();
	var colorIndex = $('form ul.nav li.active a').attr('href').replace('#color', '');
	var cols = 10;
	
	$('form .tab-content div.active input.risk-field').click(function(){
		var val = $(this).val();
		updateSingle(val);
	});

	$('form .tab-content div.active input.risk-field').change(function(){
	   updateMultiple($(this).val());
	});
	
	$('form .tab-content div.active input.risk-field').keyup(function(){
	   updateMultiple($(this).val());
	});
	
	$('form .tab-content div.active input.risk-field').mousewheel(function(){
		var val = $(this).val();
		updateSingle(val);
	});
	
	// .colorpicker will render just the square
	// this is the id we get: pictograph_risks_attributes_1_hex
	$('input.color-field').miniColors({
	    change: function(hex, rgb) {
				$(this).val(hex);
				var klass = $(this).attr('id').replace('pictograph_risks_attributes_', '').replace('_hex', '');
				$('td.fill' + klass).css('backgroundColor', hex);
				$('td.fill' + klass).attr('data-color', hex);
				$('form ul.nav li.active a').css('background-color', hex);
		 }
	});
	
	// This gives us the cell hover effect for choosing a value
	$('table.pictograph td.picto-cell').hover(
		// in
		function() {			
			// Form values
			var thisRisk = $(this).attr('id').replace('cell', ''); // value of the cell we're on
			
			if ($(this).attr('data-icon') != undefined) {
				if (thisRisk > curRisk) {
					var icon = $('form .tab-content div.active').find('img.form-icon').attr('src');
				} else {
					var icon = $('form .tab-content div.active').prev().find('img.form-icon').attr('src');
				}
				$(this).children('img').attr('src', icon);			
			} else {
				// This should be on the tab callback, really
				// var el = $('form ul.nav li.active a');
				// var colorIndex = el.attr('href').replace('#color', '');
				if (thisRisk > curRisk) {
					var color = $('form ul.nav li.active a').css('background-color');
				} else {
					var color = $('form .tab-content div.active').prev().find('input.color-field').val();
				}
				$(this).css('background-color', color);
			}
		},
		// out
		function(){
			if ($(this).attr('data-icon') != undefined) {
				var curIcon = $(this).attr('data-icon');
				$(this).children('img').attr('src', curIcon);		
			} else {
				var curColor = $(this).attr('data-color');
				$(this).css('background-color', curColor);
			}
		}
	);
	
	// This actually sets the value
	$('table.pictograph td.picto-cell').click(function(){
		var thisRisk = Number($(this).attr('id').replace('cell', '')) + 1; // value of the cell we're on
		updateMultiple(thisRisk);
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
	
	var updateMultiple = function(thisRisk) {
		// Table index values
		var el = $('table.pictograph td#cell' + curRisk)
		var curVal = $('table.pictograph td.picto-cell').index(el);
		var el2 = $('table.pictograph td#cell' + thisRisk)
		var val = $('table.pictograph td.picto-cell').index(el2) - 1;
		
		// If we're moving up
		if (thisRisk > curRisk) {
			// Upper adjustment
			var high2 = val + 1;
			var high1 = val - (val % cols);
			
			// Lower adjustment
			var low1 = curVal;
			var low2 = curVal - (curVal % cols) + cols;
			
			if (el2.attr('data-icon') != undefined) {
				// Get the icon
				var icon = $('form .tab-content div.active').find('img.form-icon').attr('src');

				// Upper
				$('table.pictograph td.picto-cell').slice(high1, high2).children('img').attr('src', icon);
				$('table.pictograph td.picto-cell').slice(high1, high2).attr('data-icon', icon);
		
				// Lower
				$('table.pictograph td.picto-cell').slice(low1, low2).children('img').attr('src', icon);
				$('table.pictograph td.picto-cell').slice(low1, low2).attr('data-icon', icon);

				// The rest
				$('table.pictograph td.picto-cell').slice(high1 + cols, low2 - 1).children('img').attr('src', icon);
				$('table.pictograph td.picto-cell').slice(high1 + cols, low2 - 1).attr('data-icon', icon);
			} else {
				// get the color
				var color = $('form .tab-content div.active input.color-field').val();
					
				// Upper
				$('table.pictograph td.picto-cell').slice(high1, high2).css('background-color', color);
				$('table.pictograph td.picto-cell').slice(high1, high2).attr('data-color', color);
		
				// Lower
				$('table.pictograph td.picto-cell').slice(low1, low2).css('background-color', color);
				$('table.pictograph td.picto-cell').slice(low1, low2).attr('data-color', color);

				// The rest
				$('table.pictograph td.picto-cell').slice(high1 + cols, low2 - 1).css('background-color', color);
				$('table.pictograph td.picto-cell').slice(high1 + cols, low2 - 1).attr('data-color', color);
			}
			// Update the fill index
			$('table.pictograph td.picto-cell').slice(high1, high2).removeClass().addClass('picto-cell fill' + colorIndex);			
			$('table.pictograph td.picto-cell').slice(low1, low2).removeClass().addClass('picto-cell fill' + colorIndex);
			$('table.pictograph td.picto-cell').slice(high1 + cols, low2 - 1).removeClass().addClass('picto-cell fill' + colorIndex);
		} else { // Otherwise, we're decreasing
			// TODO: this should actually suss out separate colors!!!
			// Right now, it just uses the color from the previous tab
			// Or perhaps just stop where the color ends (find min)
			colorIndex--;
			
			// Upper adjustment
			var high2 = curVal + 1;
			var high1 = curVal - (curVal % cols);
			
			// Lower adjustment
			var el = $('table.pictograph td#cell' + curRisk)
			var low1 = val;
			var low2 = val - (val % cols) + cols;
			
			if (el2.attr('data-icon') != undefined) {
				// Get the icon
				var icon = $('form .tab-content div.active').find('img.form-icon').attr('src');
				
				// Upper
				$('table.pictograph td.picto-cell').slice(high1, high2).children('img').attr('src', icon);
				$('table.pictograph td.picto-cell').slice(high1, high2).attr('data-icon', icon);
	
				// Lower
				$('table.pictograph td.picto-cell').slice(low1, low2).children('img').attr('src', icon);
				$('table.pictograph td.picto-cell').slice(low1, low2).attr('data-icon', icon);
			
				// The rest
				$('table.pictograph td.picto-cell').slice(high1, low2 - cols).children('img').attr('src', icon);
				$('table.pictograph td.picto-cell').slice(high1, low2 - cols).attr('data-icon', icon);
				
			} else {
				var color = $('form .tab-content div.active').prev().find('input.color-field').val();

				// Upper
				$('table.pictograph td.picto-cell').slice(high1, high2).css('background-color', color);
				$('table.pictograph td.picto-cell').slice(high1, high2).attr('data-color', color);
	
				// Lower
				$('table.pictograph td.picto-cell').slice(low1, low2).css('background-color', color);
				$('table.pictograph td.picto-cell').slice(low1, low2).attr('data-color', color);
			
				// The rest
				$('table.pictograph td.picto-cell').slice(high1, low2 - cols).css('background-color', color);
				$('table.pictograph td.picto-cell').slice(high1, low2 - cols).attr('data-color', color);	
			}
			$('table.pictograph td.picto-cell').slice(high1, high2).removeClass().addClass('picto-cell fill' + colorIndex);
			$('table.pictograph td.picto-cell').slice(low1, low2).removeClass().addClass('picto-cell fill' + colorIndex);
			$('table.pictograph td.picto-cell').slice(high1, low2 - cols).removeClass().addClass('picto-cell fill' + colorIndex);
		}
		
		// Set the form val
		$('form .tab-content div.active input.risk-field').val(thisRisk);
		curRisk = thisRisk;
	};
	
});

// This makes our number picker way cooler
(function(c){var a=["DOMMouseScroll","mousewheel"];c.event.special.mousewheel={setup:function(){if(this.addEventListener){for(var d=a.length;d;){this.addEventListener(a[--d],b,false)}}else{this.onmousewheel=b}},teardown:function(){if(this.removeEventListener){for(var d=a.length;d;){this.removeEventListener(a[--d],b,false)}}else{this.onmousewheel=null}}};c.fn.extend({mousewheel:function(d){return d?this.bind("mousewheel",d):this.trigger("mousewheel")},unmousewheel:function(d){return this.unbind("mousewheel",d)}});function b(i){var g=i||window.event,f=[].slice.call(arguments,1),j=0,h=true,e=0,d=0;i=c.event.fix(g);i.type="mousewheel";if(i.wheelDelta){j=i.wheelDelta/120}if(i.detail){j=-i.detail/3}d=j;if(g.axis!==undefined&&g.axis===g.HORIZONTAL_AXIS){d=0;e=-1*j}if(g.wheelDeltaY!==undefined){d=g.wheelDeltaY/120}if(g.wheelDeltaX!==undefined){e=-1*g.wheelDeltaX/120}f.unshift(i,j,e,d);return c.event.handle.apply(this,f)}})(jQuery);

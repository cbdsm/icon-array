function current_risk() {
	var curRisk = Number($('.tab-content div.active input.value-field').val());
	$('.tab-content div.active').prevAll("div.color-pane:not('.off')").each(function() {
    curRisk += Number($(this).find('input.value-field').val());
  });
  debug_log(curRisk);
	return curRisk;
}

function previous_risk() {	
	var prevs = $('.tab-content div.active').prevAll("div.color-pane:not('.off')");
	if (prevs.length > 0) {
		return Number(prevs.first().find('input.value-field').val());
	} else {
		return 0.0;
	}
}

function previous_total() {	
	var prevs = $('.tab-content div.active').prevAll("div.color-pane:not('.off')");
	var totalRisk = 0;
	if (prevs.length > 0) {
	  prevs.each(function() {
	  	totalRisk += Number($(this).find('input.risk-field').val());
	  });
		return totalRisk;
	} else {
		return 0.0;
	}
}

function current_total() {	
	var risks = $("div.color-pane:not('.off')");
	var totalRisk = 0;
	if (risks.length > 0) {
	  risks.each(function() {
	  	totalRisk += Number($(this).find('input.risk-field').val());
	  });
		return totalRisk;
	} else {
		return 0.0;
	}
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function hex2rgb(hexStr){
   // note: hexStr should be #rrggbb
	if (hexStr[0] != '#') {
		var rgb = hexStr.replace('rgb(', '').replace(')', '')
		return rgb.split(',');
	} else {
		var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b = hex & 0x0000ff;
		return [r, g, b];
	}	    
}

function hex2rgbstr(hexStr){
   // note: hexStr should be #rrggbb
	if (hexStr[0] != '#') {
		var rgb = hexStr.replace('rgb(', '').replace(')', '')
		return rgb.split(',');
	} else {
		var hex = parseInt(hexStr.substring(1), 16);
    var r = (hex & 0xff0000) >> 16;
    var g = (hex & 0x00ff00) >> 8;
    var b = hex & 0x0000ff;
		return 'rgb(' + r + ', ' + g + ', ' + b + ')';
	}	    
}

function change_color(el, color) {
	if (el.length > 1) {
		var testImg = el.first();
	} else {
		var testImg = el;
	}
	var height = testImg.height();

	el.find('div').css('background-color', color);
	el.css('background-color', $('input#pictograph_risks_attributes_0_hex').val());

	el.each(function(){
		$(this).find('div:first').height(height).css('margin-top', '0');
	});
}

function num_decimals() {
	var decs = 0;
	$('form .tab-content div.active input.risk-field').each(function(){
		if ($(this).val() % 1 != 0) {
			decs++;
		}
	});
	return decs;
}

function thousand() {
	if ($('select#pictograph_cell_grouping').val() == 'thousand') {
		return true;
	} else {
		return false;
	}
}

function debug_log(message) {
	// This allows for easy console
	if(window.console && debug){ 
		console.log(message);
	}
}
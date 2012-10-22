//bit_url function
function bit_url(url, element) { 
	var url=url;
	var username="ideaoforder"; // bit.ly username
	var key="R_8d6c2265f9e37f9d332547673e8610d6";
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
	var curRisk = Number($('.tab-content div.active input.value-field').val());
	$('.tab-content div.active').prevAll("div.color-pane:not('.off')").each(function() {
    curRisk += Number($(this).find('input.value-field').val());
  });
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

function change_color(el, color) {
	if (el.length > 1) {
		var testImg = el.first();
	} else {
		var testImg = el;
	}
	if (testImg.find('img').length > 0) {
		el.find('img').css('background-color', color);
	} else {
		el.find('div').css('background-color', color);
	}
}
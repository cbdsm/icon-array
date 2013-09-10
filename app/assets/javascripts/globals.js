$(document).ready(function() {

	// globals
	// This stuff is mostly for embedding/linking
	debug = false;
	
	//  host = window.location.hostname;
	//  port = window.location.port;
	// if (port != 80) {
	// 	url = host + ':' + port;
	// } else {
	// 	url = host;
	// }
	url = window.location.protocol + '//' + window.location.host;
	overlay_opacity = 1.0;

	// semi-globals
	curRisk = $('input#risks_1_value').val(); //$('form .tab-content div.active input.risk-field').val();
	colorIndex = 1; //$('form ul.nav li.active a').attr('href').replace('#color', '');
	cols = $('table.pictograph tr:first td.picto-cell').length;
	rows = $('table.pictograph tr:not(".bottom-row")').length;
	cells = rows * cols;
	width = $('td#cell1').width();
	height = $('td#cell1').height();
	decimals = num_decimals();
	var color_cells;
	var color_bgs;
});
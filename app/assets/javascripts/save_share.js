$(document).ready(function() {

	// Advanced Tab
	$('div.navbar ul.nav > li > a').click(function(){
		if ($('.actions a:contains("edit")').length > 0) {
			var formvars = $('.actions a:contains("edit")').attr('href').replace('/?', '');
			$(this).attr('href', $(this).attr('href') + '?' + formvars);
		} else if ($("form.picto-form").length > 0) {
			var formvars = decodeURIComponent($("form.picto-form").serialize());
			formvars = formvars.replace(/utf8=./, '');
			formvars = formvars.replace(/&authenticity_token=/, '');
			formvars = formvars.replace(AUTH_TOKEN + '&', '');
			// formvars = formvars.replace(/pictograph\[(\w+)\]/gi, "$1");
			formvars = formvars.replace(/\#/gi, "%23");
			// $('#save-share div.modal-body p').html(url + '/pictographs/view?' + formvars);
			// $('#save-share').modal('show');
			$(this).attr('href', $(this).attr('href') + '?' + formvars);
		}
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

});
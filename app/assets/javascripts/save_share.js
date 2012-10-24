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
			// $('#save-share div.modal-body p').html(url + '/pictographs/view?' + formvars);
			// $('#save-share').modal('show');
			formvars = encodeURI(formvars)
				.replace(/%5B/gi, '[')
				.replace(/%5D/gi, ']')
				.replace(/\#/gi, "%23");
			$(this).attr('href', $(this).attr('href') + '?' + formvars);
		}
	});
	
	// Save/Share
	$('a[href="#save-share"]').click(function(){
		if ($(this).parent().hasClass('preview-actions')) {

		} else {
			var formvars = decodeURIComponent($(this).parents("form").serialize());
			formvars = formvars.replace(/utf8=./, '');
			formvars = formvars.replace(/&authenticity_token=/, '');
			formvars = formvars.replace(AUTH_TOKEN + '&', '');
			formvars = formvars.replace(/pictograph\[(\w+)\]/gi, "$1");
			formvars = encodeURI(formvars)
				.replace(/%5B/gi, '[')
				.replace(/%5D/gi, ']')
				.replace(/\#/gi, "%23");

			full_url = url + '/pictographs/view/?' + formvars;
			biturl = 'http://www.iconarray.com' + '/pictographs/view/?' + formvars;
			$('#save-share div#full-link p').html(full_url);
			bit_url(biturl + '/pictographs/view/?' + formvars, '#save-share div#short-link p');
		}
		// $('#save-share ul.nav-tabs li.active a').tab('show');
		$('#save-share').modal('show');
		$('a[href="#full-link"]').click();
		$('a[href="#short-link"]').click();
		return false;
	});

	// Embed
	$('a[href="#embed"]').click(function(){
		if ($(this).parent().hasClass('preview-actions')) {

		} else {
			var formvars = decodeURIComponent($(this).parents("form").serialize());
			formvars = formvars.replace(/utf8=./, '');
			formvars = formvars.replace(/&authenticity_token=/, '');
			formvars = formvars.replace(AUTH_TOKEN + '&', '');
			formvars = formvars.replace(/pictograph\[(\w+)\]/gi, "$1");
			formvars = encodeURI(formvars)
				.replace(/%5B/gi, '[')
				.replace(/%5D/gi, ']')
				.replace(/\#/gi, "%23");
	
			// We check to see if the first risk has text
			// If not, don't show the legend (i.e. width is just table width)
			var width = $('table.pictograph').width();
			if ($('input#risks_1_description').val() != '') {
				width += 420;
			}
			// NOTE: width and height need to be calculated
			// and to depend on whether there is a legend or not (i.e. whether there are risk descriptions)
			$('#embed div#full-embed p').text('<iframe src="' + url + '/pictographs/embed?' + formvars + '" type="text/html" width="' + width + '" height="550" scrolling="no" frameborder="0"></iframe>');
			// $('#embed div.modal-body p').text('<iframe src="" type="text/html" width="' + width + '" height="550" scrolling="no" frameborder="0"></iframe>');
			biturl = 'http://www.iconarray.com' + '/pictographs/embed/?' + formvars;
			bit_embed(biturl, '#embed div#short-embed p');
			// http://' + url + '/pictographs/embed?' + formvars + '
		}
		$('#embed').modal('show');
		$('a[href="#full-embed"]').click();
		$('a[href="#short-embed"]').click();

		return false;
	});

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
				var biturl=v.data.url;
				$(element).html(biturl);
			}
		});
	}

	function bit_embed(url, element) { 
		var url=url;
		var username="ideaoforder"; // bit.ly username
		var key="ENV['BITLY_KEY']";
		$.ajax({
			url:"http://api.bit.ly/v3/shorten",
			data:{longUrl:url,apiKey:key,login:username},
			dataType:"jsonp",
			success:function(v) {
				var biturl=v.data.url;
				$(element).text('<iframe src="' + biturl + '" type="text/html" width="' + width + '" height="550" scrolling="no" frameborder="0"></iframe>');
			}
		});
	}

  $('a[href="#copy"]').zclip({
    path:"http://www.steamdev.com/zclip/js/ZeroClipboard.swf",
    // copy:$(this).closest('tab-content').find('div.active p').text(),
    copy:$('#short-link p').text(),
    beforeCopy:function(){
          alert('HUH?');
      },
    afterCopy:function(){
          alert($('#short-link p').text());
      }
  });

});
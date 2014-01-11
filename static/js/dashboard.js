$(function() {
	// Set page title to #pjax .title
	var oldClass = '';
	function setPjaxedValues(newClass) {
		// Container class
		var pjax = $('#pjax')
		pjax.removeClass(oldClass);
		pjax.addClass(newClass);
		oldClass = newClass;

		// Page subheading
		$('.page-title').html($('#pjax .title').html());

		// Select link & sidebar section
		$('.sidebar *').removeClass('current');
		$('.sidebar a[href$="'+newClass+'"]')
			.addClass('current')
			.closest('.section')
			.addClass('current');
	}

	// Load options pages in with pjax
	$(document).pjax('.sidebar a', '#pjax');

	// Listen to pjax events, change titles/classes/etc around are required
	$(document).on('pjax:end', function(e) {
		setPjaxedValues(e.currentTarget.URL.split('/').pop());
	});

	if ($('#pjax :first-child').hasClass('loading')) {
		// If the content is the loading page, trigger the first item in the sidebar
		$('.sidebar a')[0].click();
	} else {
		// This is a preloaded pjax page, so set the title & class
		setPjaxedValues(document.location.pathname.split('/').pop());
	}

	// Change password modal
	$('#pjax.password form').submit(function(e) {
		e.preventDefault();
		var saveButton = $('#pjax.password button[type="submit"]');
		$(this).ajaxSubmit(function(response) {
			// Remove existing alerts
			$('.alert .close').click();

			// Add an alert
			var error = response.type == 'error';
			$('#pjax.password form').prepend(
				'<div class="alert '+(error?'error':'info')+'">'+
				'<button type="button" class="close icon">&times;</button>'+
				(error?'<strong>Error!</strong> ':'')+response.message+'</div>'
			);
			if (!error) {
				$('#pjax.password input').val('');
			}
		});
		return false;
	});




	

	// Edit avatar button redirection
	$('.button.file').click(function(event) {
		// prevents duplicate click event
		var input = $(this).find('input')[0];
		if (input == event.target) { return; }
		
		input.click();
	});
});
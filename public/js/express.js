$(function() {
	$('#state').change(function() {
		$(this).children('option').each(function() {
			if ($(this).val() == $(this).parent().val()) {
				$(this).attr('selected', 'selected');
			} else {
				$(this).removeAttr('selected');
			}
		});
	});
});
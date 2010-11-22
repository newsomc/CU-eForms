function getFormData(type) {
	//We can use one Request object many times.
	var req = new Request.HTML({url:'http://10.0.1.9/~hcnewsom/forms-interface/js/'+type+'.html', 
		append: $('form-canvas'),
		onFailure: function() {
			$('form-canvas').set('text', 'The request failed.');
		}
	});
	req.send();	
}

window.addEvent('domready', function() {
	
	var selectorToFormData = {
		'li.single-line-text': 'single-line-text',
		'li.paragraph-text': 'paragraph-text',
		'li.multiple-choice': 'multiple-choice',
		'li.section-break': '',
		'li.number': '',
		'li.dropdown': ''
	};
	
	$H(selectorToFormData).each(function(type, selector) {
		$$(selector).addEvent("click", function(e) {
			getFormData(type);
		});
	});

});
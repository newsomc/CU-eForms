var sort;

function getFormData(type) {
	var req = new Request.HTML({url:'http://dyn-209-2-234-251.dyn.columbia.edu/~hcnewsom/CU-eForms/js/'+type+'.html', 
		append: $('form-canvas'),
		onFailure: function() {
			$('form-canvas').set('text', 'The request failed.');
		}, 
	    onSuccess: onFormData
	});
	req.send();	
}

function onFormData() {
	sort.addItems($$('#form-canvas li').getLast());
	$$('.label').addEvent('click', function(e){	
	    $(this).addClass('hidden');
		var openClass = $(this).getNext('.label-input');
		openClass.setStyle('opacity', 0);
		openClass.removeClass('hidden');
		openClass.fade('in');
		openClass.setStyle('background-color', '#fff6db');
	});	
	keyEnter($$('.label-input'));
}

function keyEnter(element){	
	element.addEvent('keydown:keys(enter)', function(){
		alert("you pressed enter");
	});
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
	
    sort = new Sortables('form-canvas', {
	   handle: '.form-elem',
	   constrain: true,
	   clone: true
	});
	
	$H(selectorToFormData).each(function(type, selector) {
		$$(selector).addEvent("click", function(e) { 
		   getFormData(type);

	  });
	});
		
	$$('.tab-open').addEvent("click", function(e){
		$$('.tab-open').each(function(element, selector){
			$$(element).removeClass('pressed');
		});
		$(this).addClass('pressed');
		
		$$('.tab').each(function(element, selector) {
			$$(element).fade('out');
			console.log(element);
		});
		var openIdentifier = '#' + $$(this).get('open')[0];
		$$(openIdentifier).fade('in');
	});
				
});
var sort;

function getFormData(type) {
	var req = new Request.HTML({url:'http://10.0.1.9/~hcnewsom/CU-eForms/js/'+type+'.html', 
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
		//var openClass = $(this).getElements('.label-input');
		openClass.setStyle('opacity', 0);
		openClass.removeClass('hidden');
		openClass.fade('in');
		console.log(openClass);
		openClass.setStyle('background-color', '#fff6db');			
	});	
	
	$$('.label-input').addEvent('keydown:keys(enter)', function(){		
		var label = $(this).getPrevious('.label');
		var inputValue = this.value;
		$(this).addClass('hidden');
		label.removeClass('hidden');
        test = label.set('text', inputValue);
	});
	
	var formElem = $$('.form-elem');

	formElem.addEvents({
	   mouseover: function(){
	     $$('.edit-field-button').removeClass('hidden');
	   },
	   mouseout: function(){
		 $$('.edit-field-button').addClass('hidden');
	   },
	   click: function(){
		 var myFx = new Fx.Tween(this);
		 myFx.set('background-color', '#CBE6F2');
		 $$('.edit-field-button').removeClass('hidden');
	   }	
	});
	
	//List element interaction. TODO: needs to be set to toggle.
	$$('.edit-field-button').addEvent('click', function(){

       	$$('.tab-open').each(function(element, selector){
			$$(element).removeClass('pressed');
		});
		
		$$('.tab').each(function(element, selector) {
			$$(element).fade('out');
			$$(element).removeClass('hidden');
			console.log(element);
		});
		var openIdentifier = $$('#form-tools-two').get('open')[0];
		console.log(openIdentifier);
		$$(openIdentifier).fade('in');
		$$('#form-tools-two').fade('in');
		$$("#field-settings").addClass('pressed');
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
	
	// form-tools tabs	
	$$('.tab-open').addEvent("click", function(e){
		$$('.tab-open').each(function(element, selector){
			$$(element).removeClass('pressed');
		});
		$(this).addClass('pressed');
		
		$$('.tab').each(function(element, selector) {
			$$(element).fade('out');
			$$(element).removeClass('hidden');
			console.log(element);
		});
		var openIdentifier = '#' + $$(this).get('open')[0];
		console.log(openIdentifier);
		$$(openIdentifier).fade('in');
	});
	
	// header tabs
	$$('.header-tab').addEvent("click", function(e){
		$$('.header-tab').each(function(element, selector){
			$$(element).removeClass('header-pressed');
		});
		$(this).addClass('header-pressed');
		
		$$('.header').each(function(element, selector) {
			$$(element).fade('out');
			console.log(element);
		});
		var openIdentifier = '#' + $$(this).get('open')[0];
		console.log(openIdentifier);
		$$(openIdentifier).fade('in');
	});
						
});
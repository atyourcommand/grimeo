$(function() {
    
	var $header = $('.not-in-use');
	$(window).scroll(function () {
	   if(scrollY <= 0){
		   //$header.removeClass('content-scroll');
		   $header.animate({
				opacity: 1,
		   }, 500);
	   }
	   if(scrollY > 0 && $header.is(':not(:animated)')){
		   //$header.addClass('content-scroll');
		   $header.animate({
				opacity: .5,
		   }, 500);
	   }
	});
	
	$('.fn-toggle-control').click(function(){
		var $userControl = $(this).closest('.result').find('.control');
		var $userOptions = $(this).closest('.result').find('.user-options');
		$userControl.fadeToggle();
		$userOptions.fadeToggle();
		return false;
		console.log('clicked');
	
	});
	
	$('.fn-expand-panel').click(function(){
		var $icon = $(this).children('i:first');
		var $panelColumn = $(this).closest('.result').parent('.column');
		var $otherPanelColumns = $panelColumn.siblings('.column');	
		$panelColumn.toggleClass('panel-full-width');
		$otherPanelColumns.removeClass('panel-full-width');
		$icon.toggleClass('fa-compress');
		
		scrollTop($(this));
		return false;
	});
	
	var uiOptions = (function(){
		var	$body = $( 'body' ),
		//$container = $('.sub-menu'),
		$header = $('header'),
		$search = $('.ui-options-search');
		$logo = $('.logo');
		//$mainMenu = $('.main-nav');
		//var choices = form.find(':radio');
		var $uiOption = $('input[name="options[1]"]', '.ui-options');
			
		$uiOption.change(function(){
			var $uiOptionChecked = $('input[name="options[1]"]:checked', '.ui-options').val();
			console.log($uiOptionChecked);	
			if ($uiOptionChecked === 'search'){
				$header.addClass('search-active');
				$logo.removeClass('logos-logo');
				$logo.addClass('logos-logo-mobile');
				$search.delay('400').fadeIn('slow');
			} else {
				$header.removeClass('search-active');
				$logo.removeClass('logos-logo-mobile');
				$logo.addClass('logos-logo');
				$search.hide();	
			}
				
		});
		
		$('.fn-change-text').click(function(e){
			e.preventDefault();		
			var span = $(this).find('span');
			//var secondSpan = $(this).child('span')[1];
			span.toggleClass('fade-in');
		});
		
			
	});
	
	uiOptions();
	
});
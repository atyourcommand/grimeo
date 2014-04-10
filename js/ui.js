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
	
		$header = $('header'),
		$search = $('.search');
		$searchMovie = $('.search-movie');
		$searchTv = $('.search-tv'),
		$userOptions = $('.options'),
		$logo = $('.logo'),
		$genreInput = $('input[name="options[4_A]"]'),
		$genreInputLabel = $('input[name="options[4_A]"]').next('label');
		
		var $uiOption = $('input[name="options[1]"]', '.ui-options');
			
		$uiOption.change(function(){
			
			var $uiOptionChecked = $('input[name="options[1]"]:checked', '.ui-options').val();
			console.log($uiOptionChecked);	
			if ($uiOptionChecked === 'movies'){
				$header.addClass('search-active');
				$logo.removeClass('logos-logo');
				$logo.addClass('logos-logo-mobile');
				$searchMovie.delay('400').addClass('show');
				$('.options-nav').addClass('show');
				$searchTv.removeClass('show');
				$genreInput.prop('disabled', false);
				$genreInputLabel.removeClass('disabled');
				$search.delay('400').fadeIn('slow');
				
			}else if ($uiOptionChecked === 'tv'){
				$header.addClass('search-active');
				$logo.removeClass('logos-logo');
				$logo.addClass('logos-logo-mobile');
				$searchMovie.removeClass('show');
				$searchTv.delay('400').addClass('show');
				$('.options-nav').removeClass('show');
				$genreInput.prop('disabled', true);
				$genreInputLabel.addClass('disabled');
				$search.delay('400').fadeIn('slow');
			
			} else {
				//$header.removeClass('search-active');
				//$header.addClass('search-active');
				
				//$searchMovie.removeClass('show');
				//$searchTv.removeClass('show');
				
				//$search.hide();
				//$('.options-nav').removeClass('show');
				//$userOptions.delay('400').fadeIn('slow');
			}
				
		});
		
		$('input[name="options[3_A]"]').change(function(){
			if ($userOptions.css("display") == "none")
    		$userOptions.slideDown('fast');
			else
    		$userOptions.slideUp('fast');
		});
		
		//User option radio options to change classes
		var $userOptionOne = $('input[name="options[2_A]"]', '.user-options');
		$userOptionOne.change(function(){
			$body.toggleClass('show-trailers');
		});
		
		var $userOptionTwo = $('input[name="options[2_B]"]', '.user-options');
		$userOptionTwo.change(function(){
			$header.toggleClass('show-adult');
		});
		
		//Favourites Option
		var $userOptionTwo = $('input[name="options[2_C]"]', '.user-options');
		var $userOptionTwoChecked = $('input[name="options[2_C]"]:checked', '.user-options').val;

		if ($userOptionTwoChecked === 'favourites'){
			$body.addClass('show-favourites')
			console.log('is checked');	
		}else{
			$body.removeClass('show-favourites')
			console.log('is not checked');	
		}
		$userOptionTwo.change(function(){
			$body.toggleClass('show-favourites');
		});
		
		$(document).ajaxStart(function() {
		  //$("input").attr("disabled", true);
		  //$("input").closest('label').addClass('disabled');
		}).ajaxComplete(function() {
		  //$("input").removeAttr("disabled");
		  //$("input").closest('label').removeClass('disabled');
		});
			
	});
	
	uiOptions();
	
});
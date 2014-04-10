(function($) {
	$(document).ready(function() {
    
		$('.fn_assign_link .panel').on('click',function(e) {
		   e.stopPropagation();
		   console.log('working');
		   var thisHref = $(this).children('h3').children('a[data-attribute="link"]').attr('href');
		   var displayStatus = $(this).children('h3').children('a').attr('data-attribute');
			 if(displayStatus=="link")
			 {
				 $(this).children('a[data-attribute="link"]').click();
				 window.location.href = thisHref;
				 //console.log(displayStatus); 
			 }
		});
	
		$('body').on('mouseenter','.fn-add-hover',
		function(e){ 
			$(this).addClass('hover')
		});
		$('body').on('mouseleave','.fn-add-hover',
		function(e){
			 $(this).removeClass('hover')
		});
		
		$(window).load(function(){
			$('input').each(function() { 
				console.log('this each function is working');
				$this = $(this);
				$label = $('label[for="'+ $this.attr('id') +'"]');
					if ($label.length > 0 ) {
					  if ($(this).is(':checked'))
						$label.addClass('selected');
					  else
						$label.removeClass('selected');
					}
			});
		
		});
				
		$(document).on('change', 'input', function() { 
			console.log('input change');
			$this = $(this);
			$label = $('label[for="'+ $this.attr('id') +'"]');
			if ($(this).is(':checked'))
			   $label.addClass('selected');
			else
			   $label.removeClass('selected');
		});
		
		//Adds .has-menu & adds or removes .show-menu when clicked
		var menuHelper = function() {
				
				$('.fn_menu-helper li').each(function(){
					var $childMenu = $('li > ul');	
					if($(this).find($childMenu).length > 0 ){
						$(this).addClass('has-menu');	
					}
				
				});
				
				//var $trigger = $this.children('a'); 
				$('.fn_menu-helper ul li a').bind('click',function(e){
					e.stopPropagation
					var $this = $(this);
					//console.log($this);
					var $listItem = $this.parent('li');
					var $listItemSiblings = $listItem.siblings();
					var $listItemWithClass = $listItem.filter('.show-menu');
					if ($listItemWithClass.length > 0){
						$listItem.removeClass('show-menu');
						console.log('remove class');
					} else {
						$listItem.addClass('show-menu');
						$listItemSiblings.removeClass('show-menu');
						console.log('add class');
					}
					return false;
				});
		}
		
		// Basic Accordion
		$('.accordion ul').hide();	
		$('.accordion li a').click(function (e) {
			
			var $list = $(this).parent().children('ul:first');
			var $otherLists = $(this).parent('li').siblings().children('ul');
			var $otherListsParent = $otherLists.parent('li');
			$list.slideToggle();
			$otherLists.slideUp();
			$otherListsParent.removeClass('show-menu');
			e.preventDefault();
		
		});
		
	   menuHelper();	
		//console.log('has menu function is running');
	
			
	});   
})(jQuery);
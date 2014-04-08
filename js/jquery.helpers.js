(function($) {
	$( document ).ready(function() {
    
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
		
		//extra helper function
		//TICK
		
		$('body').on('mouseenter','.fn-add-hover',
		function(e){ 
			$(this).addClass('hover')
		});
		$('body').on('mouseleave','.fn-add-hover',
		function(e){
			 $(this).removeClass('hover')
		});
		
		//Adds .has-menu when present
		//Adds or removes .show-menu when clicked
		//OK
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
		
		//BASIC ACCORDION
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
		
			
		//open and close menus
		/*$('.sub-menu li a').on('click',function(e){
			var	$this = $(this);
			var $listItem = $this.parent('li');
			//var $listItems = $listItem.siblings();
			var $listItemHasClass = $listItem.filter('.show-menu')
			if ($listItemHasClass.length > 0){
				$listItem.
				
				removeClass('show-menu');
				//$listItem.addClass('show-menu');
				console.log('remove');	
			} else {
				$listItem.addClass('show-menu');
			}
		});*/
		
		//extra radio or checkbox selected helper function
		//TICK
	   //$('input:checked').closest('label').addClass('selected');
	   //$('input').change(function () {
		//	if ($(this).is(':checked'))
		//		$(this).closest('label').addClass('selected');
		//	else
				//$(this).removeAttr('checked');
		//		$(this).closest('label').removeClass('selected');
			
       //});
	   
	   menuHelper();	
		//console.log('has menu function is running');
		
		// Working with local
	
			
	});   
})(jQuery);
(function ( $ ) {
    $.fn.SavedList = function( options ) {
        var settings = $.extend({
        }, options );		
			
			
			var $list = $('#show-items'),
				$listItem = $list.find('li'),
				shows = '',
				$btnClear = $('#clear-all');  
		
			$list.append( localStorage.getItem('shows'));
		
		   
			function on_change(event){
				var input = $(event.target),
					//data = JSON.parse(localStorage[key]),
					//$myPost  = input.val(),
					$posterPath = input.attr('data-asset-poster-path');
					$assetImage = '<img src='+ $posterPath +'/>';
					$assetName = input.attr('data-asset-name');
					$deleteLink = '<a href="#" class="button closer">Remove</a>';
					newItem = '<li>' + $assetImage + $assetName + $deleteLink +'</li>'; 
			   
				$list.append(newItem);
				shows = $list.html(); //sets the html of the list to a variable     
				localStorage.setItem( 'shows', shows );//sets the newly appended list to storage
				console.log('add a list item');
			}
			return this.each(function(){    
				var element = $(this);
			
				element.find('input').change(on_change);
				
				//click function to clear localStorage and
				//clear the html of the list
				$btnClear.click(function(e){
					alert('Are you sure you want to remove this list');
					localStorage.clear();
					$list.html( '' );
					e.preventDefault();
			
				});
				
				//click function to make of item as complete or remove it
				 $listItem.find('.closer').live('click',function(e){
					//var $closeButton = $(this)
					if ($(this).parent('li').hasClass('selected')){
						$(this).parent('li').fadeOut('slow').delay(400).remove();
						tasks = $list.html();      
						localStorage.setItem('tasks', tasks);
			
					} else {
						$(this).parent('li').addClass('selected');
						
					}
					e.preventDefault();
			
				});
			
			});

			
			
    };     
}( jQuery ))		
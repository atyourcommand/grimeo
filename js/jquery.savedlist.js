(function ( $ ) {
    $.fn.SavedList = function( options ) {
        var settings = $.extend({
        }, options );		
			
			
			var $list = $('#show-items'),
				$listItem = $list.find('li'),
				tasks = '',
				key = 'my-new-list',
				$btnClear = $('#clear-all') ,
				data = '';  
			
			function on_change(event){
				var input = $(event.target),
				
				assetId = input.attr('id');
				assetName = input.attr('data-asset-name');	
				assetValue  = input.val(),
				posterPath = input.attr('data-asset-poster-path');
				
				$assetImage = '<img src='+ posterPath +'/>';
				$assetName = assetName;
				$deleteLink = '<a href="#" class="button closer">Remove</a>';
				
				tasks = $list.html();    
				//Add the data we have to a list on the page
				newItem = '<li>' + $assetImage + $assetName + $deleteLink +'</li>'; 
				//adds the new item to the bottom of the list
				$list.append( newItem );
				//sets the html of the list to a variable
				tasks = $list.html();      
				//sets the newly appended list to storage
				//localStorage.setItem( 'tasks', tasks ); NO NOT THIS TIME
				
				//get existing form local storage
				var data = localStorage.getItem('favourite-shows');
				if (data != null) {
				data = JSON.parse(data);
				} else {
				data = new Array();
				}
			    //new from input
				var tempData = {"assetId":assetId, "assetName":assetName, "assetImage":posterPath};
				//add new
				data.push(tempData);
				localStorage.setItem("favourite-shows", JSON.stringify(data));
				console.log('add a list item');
			}
			
			return this.each(function(){    
				var element = $(this);
			
				element.find('input').change(on_change);
				
				//clear the html of the list
				$btnClear.click(function(e){
					localStorage.clear("favourite-shows");
					$list.html( '' );
					e.preventDefault();
			
				});
				
				//click function to make of item as complete or remove it
				 $listItem.find('.closer').live('click',function(e){
					var $listItem = $(this).parent('li');
					
					if ($listItem.hasClass('task-complete')){
						$(this).closest('li').fadeOut('slow').remove();
						//localStorage.setItem('tasks', tasks);
						//console.log('condition 1');
			
					} else {
						$listItem.addClass('task-complete');
						//console.log('condition 2');
					}
					e.preventDefault();
			
				});
			
			});

			
			
    };     
}( jQuery ))		
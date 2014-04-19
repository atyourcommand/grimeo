(function ( $ ) {
    $.fn.SavedList = function( options ) {
        var settings = $.extend({
        }, options );		
			
			var $list = $('#show-items'),
				$listItem = $list.find('li'),
				tasks = '',
				key = 'favourite-shows',
				$btnClear = $('#clear-all'),
				data = '', 
				newData = '';  
			
			function on_change(event){
				var input = $(event.target),
					isChecked = input.is(':checked');
					$id = input.attr('id'),
					assetName = input.attr('data-asset-name'),	
					assetValue  = input.val(),
					posterPath = input.attr('data-asset-poster-path'),
					$assetImage = '<img src='+ posterPath +'/>',
					$assetName = assetName,
					$deleteLink = '<a href="#" class="button closer">Remove</a>',
					newItem = '<li id=\"'+$id+'\">' + $assetImage + $assetName + $deleteLink +'</li>'; //make the list item
					//$list.append( newItem );//adds to list
					tasks = $list.html(); //sets the html of the list to a variable     
				
				//data from input
				var tempData = {"assetId":$id, "assetName":assetName, "assetImage":posterPath};
				
				//remove an item from the saved list
				var removeItem = function(itemId){
					var $listItemWithId = $list.find('#' + itemId);
					$listItemWithId.remove();
				}
				
				//get existing form local storage
				var data = localStorage.getItem(key);
				if (data != null) {
				data = JSON.parse(data);
				} else {
				data = new Array();
				}
				
				if (isChecked === true){
					console.log('is not checked?');	
					//add new
					//localStorage[key] = JSON.stringify(data);
					data.push(tempData);
					localStorage.setItem(key, JSON.stringify(data));
					$list.append(newItem);//adds to list
				} else {
					//var storedData = localStorage.getItem(key);
					//JSON.parse(storedData);
					var newData = data.filter(function(jsonObject) { return jsonObject.assetId != $id;});
					
					//JSON.parse(newData); // parses String back into an Object
					console.log(newData);
					//var storedData = [storedData];
					
					
					localStorage.removeItem(key);
					data.push(newData);
					localStorage.setItem(key, JSON.stringify(newData));
					removeItem($id);//remove from the list
				}
				
				
			}
			
			return this.each(function(){    
				var element = $(this);
			
				element.find('input').change(on_change);
				//clear the html of the list
				$btnClear.click(function(e){
					localStorage.removeItem(key);
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
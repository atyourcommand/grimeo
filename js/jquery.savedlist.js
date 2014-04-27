(function ($) {
    $.fn.SavedList = function( options ) {
        var settings = $.extend({
        }, options );		
			
				var element = $(this),
				$list = $('#show-items'),
				$listItem = $list.find('li'),
				tasks = '',
				key = 'favourites',
				key2 = element.attr('name'),
				$btnClear = $('#clear-all'),
				$deleteLink = '<a href="#" class="button closer">Remove</a>',
				newData = ''; 
			
			//Build list function
			var buildList = (function(){
				$.each(data, function(index, value) {
					$($list).append('<li id=\"'+ value.assetId +'\"><img src='+ value.assetImage +'/>' + value.assetName + $deleteLink + '</li>');	
				});
			});
			
			//Get existing data for list from local storage
			var data = localStorage.getItem(key);
			if (data != null) {
				data = JSON.parse(data);
			} else {
				data = new Array();
			} 
			buildList(); //Build list on load of page
			
			function on_change(event){
				var input = $(event.target),
					isChecked = input.is(':checked');
					$id = input.attr('id'),
					$name = input.attr('name'),
					assetName = input.attr('data-asset-name'),	
					assetValue  = input.val(),
					posterPath = input.attr('data-asset-poster-path'),
					$assetImage = '<img src='+ posterPath +'/>',
					$assetName = assetName,
					newItem = '<li id=\"'+$id+'\">' + $assetImage + $assetName + $deleteLink +'</li>'; 
				
				var checkedData = (function (){
					
					var dataChecked = JSON.parse(localStorage[key2]);
					dataChecked[input.attr('name')] = input.is(':checked');
					console.log('this is the data' + dataChecked);
					localStorage[key2] = JSON.stringify(dataChecked);
				
				})();
								
				//Favourites List data from input
				var tempData = {"assetId":$id, "assetName":assetName, "assetImage":posterPath};
					//Get existing from local storage
					var data = localStorage.getItem(key);
					if (data != null) {
					data = JSON.parse(data);
					} else {
					data = new Array();
					}
					
					//Function to remove an item from the Favourites List and Local Storage
					var removeItem = function(itemId){
						var $listItemWithId = $list.find('#' + itemId);
						$listItemWithId.remove();
						var newData = data.filter(function(jsonObject) { return jsonObject.assetId != $id;});
						console.log('new data is' + newData);
						localStorage.removeItem(key);
						data.push(newData);
						localStorage.setItem(key, JSON.stringify(newData));

					}
										
					if (isChecked === true){
						//add new
						data.push(tempData);
						localStorage.setItem(key, JSON.stringify(data));
						$list.append(newItem);//adds to list
					} else {
						
						removeItem($id); //remove from the list
					}
					
			}
			
			return this.each(function(){    
				var element = $(this);
				
				if(typeof(Storage)!=="undefined"){
						
						var dataChecked = false;
						if(localStorage[key2]) {
							dataChecked = JSON.parse(localStorage[key2]);
						}
						
						if(!dataChecked) {
							localStorage[key2] = JSON.stringify({});
							dataChecked = JSON.parse(localStorage[key2]);
						}
						
						element.find('input').change(on_change);
						
						element.find('input').each(function(e){
							if($(this).attr('type') != 'submit') {
								var input = $(this);
								var value = dataChecked[input.attr('name')];
								if(value) {
									input.attr('checked', input.prop('checked', true));
									console.log('has a value' + value );
								} else {
									input.removeAttr('checked');
									console.log('no value');
								}
							}
						});
						
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
				}
				else {
					alert('local storage is not available');
				}		
			});
			
    };     
}(jQuery))		
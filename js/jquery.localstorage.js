(function ( $ ) {
    $.fn.FormCache = function( options ) {
        var settings = $.extend({
        }, options );
        
        function on_change(event) {
            var input = $(event.target);
            var key = input.parents('form:first').attr('name');
            var data = JSON.parse(localStorage[key]);
            
            if(input.attr('type') == 'checkbox') {
                data[input.attr('name')] = input.is(':checked');
			
			}else if (input.attr('type') == 'radio'){
				data[input.attr('id')] = input.is(':checked');
			
			}else {
                data[input.attr('name')] = input.val();
            }
            
            localStorage[key] = JSON.stringify(data);
        }
        
        return this.each(function() {    
            var element = $(this);
            
            if(typeof(Storage)!=="undefined"){
                var key = element.attr('name');
                
                var data = false;
                if(localStorage[key]) {
                    data = JSON.parse(localStorage[key]);
                }
                
                if(!data) {
                    localStorage[key] = JSON.stringify({});
                    data = JSON.parse(localStorage[key]);
                }
                element.find('input, select').change(on_change);
                
                element.find('input, select').each(function(e){
                    if($(this).attr('type') != 'submit') {
                        var input = $(this);
                        //var value = data[input.attr('name')];
                        if(input.attr('type') == 'checkbox') {
                            var value = data[input.attr('name')];
							if(value) {
                                input.attr('checked', input.prop('checked', true));
								//console.log('adding checkbox checked on', e );
                            } else {
                                input.removeAttr('checked');
								//console.log('removing checkbox checked on', e );
                            }
							
						} else if (input.attr('type') == 'radio'){
                        	var value = data[input.attr('id')];
							if(value) {
                                input.attr('checked', input.prop('checked', true));
								//console.log('adding radio checked on', e );
                            } else {
                                input.removeAttr('checked');
								//console.log('removing radio checked on', e );
                            }
						
						
						} else {
                            input.val(value);
                        }
                    }
                });
                
                
            }
            else {
                alert('local storage is not available');
            }
        });
    };     
}( jQuery ))
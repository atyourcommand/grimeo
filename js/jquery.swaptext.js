var swapText = (function (){
			
	var $swapItem = $('.fn-change-text');
	var $spanFirst = $swapItem.children('span').eq(0);
	var $spanSecond = $swapItem.children('span').eq(1);
	var $item,
	current = -1;
	
	function init(){
		$swapItem.on('click',open)	
	}
	
	function open (event){
		
		var $item = $(event.currentTarget);
		var idx = $item.index();
				
		if( current !== -1 ) {
			$swapItem.eq( current ).removeClass( 'open' );	
			//console.log('current is not -1');
		} 
		
		if( current === idx ) {
			$swapItem.removeClass( 'open' );
			current = -1;
			//console.log('current is ' + idx);
			$spanFirst.addClass('fade-in');
			$spanSecond.removeClass('fade-in');
			
		} else {
			$swapItem.addClass( 'open' );
			$spanFirst.removeClass('fade-in');
			$spanSecond.addClass('fade-in');
			current = idx;
		}
		
		return false	
	}
	function close (event){
		$swapItem.removeClass( 'open' );
		$spanFirst.addClass('fade-in');
		$spanSecond.removeClass('fade-in');
		current = -1;
	}
	function swap(){
		open();	
	}
	function revert(){
		close();	
	}
	
	return {init:init, swap:swap, revert:revert}
		
})();


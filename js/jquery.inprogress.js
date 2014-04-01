var loadingContent = (function(){
	
	
	function init(){
		console.log('loading content layer working');
	}
	
	var $inProgressBg = $('.in-progress-bg'); 
	var $inProgressMsg = $('.in-progress-msg'); 
		
	function start(message){
		var $loader = "<img src=\"images/misc/loading-small.gif\" class=\"\"/>";
		var $message = "<p>"+message+"</p>";
		var $items;
		$inProgressBg.addClass('show');	
		//console.log('state is starting');
		$items = "<div class=\"\">"+$loader+$message+"</div>" ;
		$inProgressMsg.html($items);
		return true;			
	}
	function end(message){
		$inProgressBg.removeClass('show');	
		$inProgressMsg.html('');
		return true;			
	}
	
	return { init: init, start: start, end : end };	
	
})();
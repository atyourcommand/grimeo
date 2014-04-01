/*Add Adsense code to the dom*/
var appendAdCode = (function(){
	
	function init(){
		//console.log('loading ads to content');
	}
	
	var adBlockOne = $('.ad-block-one');
	var adOneCode = '<p>here it is</p>';
	
	function loadAds (){
		adBlockOne.html(adOneCode);	
		console.log('loading ads');
	}
	
	return {loadAds: loadAds, init: init}
	
})();
/*Add Adsense code to the dom*/
var appendAdCode = (function(){
	
	function init(){
		//console.log('loading ads to content');
	}
	
	function loadAds (){
		setTimeout(function (){
			
			var $adsense1 = '<div class="ad-spot-header"><script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><ins class="adsbygoogle" style="display:inline-block;width:234px;height:60px"data-ad-client="ca-pub-9333805017415789"data-ad-slot="7244347139"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script></div>'
			
			var adSpotOne = $('#ad-location-one');
			var adBlockOne = '<div class="ad-block-one">'+$adsense1+'</div>';
			//adSpotOne.hide().html(adBlockOne).fadeIn('2000');	
			adSpotOne.html(adBlockOne);			
		
		}, 10000);
	}
	
	return {loadAds: loadAds, init: init}
	
})();




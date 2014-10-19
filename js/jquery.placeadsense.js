/*Add Adsense code to the dom*/
var appendAdCode = (function(){
	
	function init(){
		//console.log('loading ads to content');
	}
	
	function loadAds (){
		setTimeout(function (){
			
			var $adsense1 = '<div class="ad-spot-header"><script async       src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><!-- Grimeo Navigation Desktop --><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9333805017415789" data-ad-slot="5050111138"     data-ad-format="auto"></ins><script>adsbygoogle = window.adsbygoogle || []).push({});</script></div>'
			
			var $adsense2 = '<div class="ad-spot-header"><script async       src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><!-- Grimeo Navigation Desktop --><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9333805017415789" data-ad-slot="5050111138"     data-ad-format="auto"></ins><script>adsbygoogle = window.adsbygoogle || []).push({});</script></div>';
			
			var adSpotOne = $('#ad-location-one');
			var adBlockOne = '<div class="ad-block-one">'+$adsense1+'</div>';
			var adBlockTwo = '<div class="ad-block-one">'+$adsense2+'</div>';
			//adSpotOne.hide().html(adBlockOne).fadeIn('2000');	
			if ($('header').width() <= 480 ){
				adSpotOne.html(''); 
			} else {
				adSpotOne.html(''); 
				adSpotOne.html(adBlockOne);   
			}	adSpotOne.html(adBlockTwo); 
			console.log('ads loading');
			   
			$(window).resize(function(){     
			   
			});

		
		}, 10);
	}
	
	return {loadAds: loadAds, init: init}
	
})();




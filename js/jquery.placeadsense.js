/*Add Adsense code to the dom*/
var appendAdCode = (function(){
	
	function init(){
		//console.log('loading ads to content');
	}
	
	function loadAds (){
		
			var $adsense1 = '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><!-- Grimeo Top Home | Movies --><ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-9333805017415789"    data-ad-slot="1882991930"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';
			
			var $adsense2 = '<div class="ad-spot-header"><script async       src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><!-- Grimeo Navigation Desktop --><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-9333805017415789" data-ad-slot="5050111138"     data-ad-format="auto"></ins><script>adsbygoogle = window.adsbygoogle || []).push({});</script></div>';
			
			var adSpotOne = $('#ad-location-one');
			var adBlockOne = '<li class="ad-block-one">'+$adsense1+'</li>';
			var adBlockTwo = '<div class="ad-block-two">'+$adsense2+'</div>';
			//adSpotOne.hide().html(adBlockOne).fadeIn('2000');	
			if ($('header').width() <= 960 ){
				adSpotOne.html(''); 
			} else {
				console.log('ads loading');
				$('.pagination ul li:nth-child(3)').after(adBlockOne).fadeIn(); 
				//adSpotOne.html(adBlockOne);   
			}	
			$(window).resize(function(){     
			   
			});
	}
	$(window).resize(function(){     
		
	});
		
	
	return {loadAds: loadAds, init: init}
	
})();




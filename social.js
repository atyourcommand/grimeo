<!--Facebook SDK--> 
FBinitIsDone = false;   
window.fbAsyncInit = function() {
	FB.init({ 
	appId:'694907180553170', cookie:true, 
	status:true, xfbml:true,oauth : true 
	});
	FBinitIsDone = true;
	/*FB.ui({
		method: 'share_open_graph',
		action_type: 'og.likes',
		action_properties: JSON.stringify({
		object:'https://developers.facebook.com/docs/',
		})
	}, function(response){});*/
};
(function(d){
         var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement('script'); js.id = id; js.async = true;
         js.src = "//connect.facebook.net/en_US/all.js";
         ref.parentNode.insertBefore(js, ref);
         }(document));

function fb_callout() {
     (function(d){
         var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement('script'); js.id = id; js.async = true;
         js.src = "//connect.facebook.net/en_US/all.js";
         ref.parentNode.insertBefore(js, ref);
         }(document));
     }

/*(function(d){
	var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement('script'); js.id = id; js.async = true;
	js.src = "//connect.facebook.net/en_US/all.js";
	ref.parentNode.insertBefore(js, ref);
}(document));*/

$('#facebook').click(function(e) {
	FB.login(function(response) {
	  if(response.authResponse) {
		  parent.location ='<?php echo $base_url; ?>/welcome/fblogin';
	  }
	},{scope: 'email,read_stream,publish_stream,user_birthday,user_location,user_work_history,user_hometown,user_photos'});
});

$(window).load(function(){
	$('.facebook-share').each(function() {
		
		$(this).click(function(){
			//fb_callout(console.log('call out'));
			if(typeof window.FB == 'undefined'){
			   console.log('Facebook SDK is unable to load, display some alternative content for visitor');
			}
			else{
			  console.log('Facebook is working just fine');
			}
			if(FBinitIsDone){
			   console.log('Facebook Init is done');
			}
			else{
			  console.log('NO facebook Init!');
			}
			
			var url = $(this).attr('data-url');
			var pic = $(this).attr('data-picture');
			var titl = $(this).attr('data-name');
			var desc = $(this).attr('data-description');
			fbShare = {};
			//fbShare.base = 'https://www.facebook.com/dialog/feed';
			//fbShare.appId = '?app_id=694907180553170';
			fbShare.redirectUrl = 'http://www.grimeo.com';
			//fbShare.url = '&link=http://www.grimeo.com' + '/' + url; //!!!!!!!!!!!! FB does not like this		
			fbShare.url = 'http://www.grimeo.com';	
			fbShare.name = titl;
			fbShare.picture = pic; 
			fbShare.caption = 'I just watched this movie trailer - check it out here'; 
			fbShare.description = desc; 
			//console.log(fbShare);
			
			postToFeed(fbShare);
			return false
		});
	});
	
	function postToFeed() {
		var obj = {
		  method: 'feed',
		  //redirect_uri: fbShare.redirectUrl,
		  link: fbShare.url,
		  picture: fbShare.picture,
		  name: fbShare.name,
		  caption: fbShare.caption,
		  description: fbShare.description
		};
		//console.log(obj);
		
		FB.ui(obj, console.log('huh'), function(response) {
			//window.location.reload();
			if(response && response.post_id){}
			else{}
		});
		
		/*FB.ui(obj, callback, console.log('huh'));
		function callback(response) {
		  //document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
		  location.href= baseURL + '#close-window';
		}*/
		
	}
			
});
	

<!--//Facebook SDK-->
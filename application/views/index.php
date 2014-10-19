<?php $this->load->helper('html');?>
<?php $base_url=$this->config->item('base_url'); ?>
<!DOCTYPE HTML>
<html ng-app="myApp">
<head>
<?php $header_data = get_header_data();?>
<meta name="fragment" content="!">  
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<!--<title>Best Movie and TV Search | Thousands of titles | Grimeo</title>-->
<!--Facebook Meta-->
<title ng-controller="titleController">{{ pageTitle}} | Grimeo | Movie Search</title>
<meta property="og:title" content="Grimeo - Movie Search" />
<meta property="og:type" content="video.movie" />
<meta property="og:url" content="http://www.grimeo.com" />
<meta property="og:image" content="http://www.grimeo.com/facebook-image-og.jpg" />
<!--//Facebook Meta-->
<link rel="shortcut icon" type="image/ico" href="favicon.ico" />
<link rel="apple-touch-icon" href="apple-touch-icon.png"/>
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
<link href="css/app.css?version=08.04.14" rel="stylesheet" type="text/css">
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
<!-- ANGULAR SPELLS -->
<script src="lib/angular/angular.js"></script>
<script src="lib/angular/angular-resource.js"></script>
<script src="bower_components/angular-cache/dist/angular-cache.min.js"></script>
<!--<script src="bower_components/angular-route/angular-route.js"></script>-->
<script src="bower_components/lodash/dist/lodash.min.js"></script>
<script src="bower_components/restangular/dist/restangular.js"></script>
<script src="bower_components/angular-local-storage/angular-local-storage.min.js"></script>
<script src="lib/angular/angular-slugify.js"></script>  
<script type="text/javascript" src="app-angular.js"></script>
<!-- //ANGULAR SPELLS -->
<script data-require="angular-ui-bootstrap@0.3.0" data-semver="0.3.0" src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.3.0.min.js"></script>
<script type="text/javascript" src="main.min.js"></script>
</head>
<body class="show-trailers" ng-controller="mainController">
<?php include ('partials/options.html') ?>
<section ng-controller="TypeaheadCtrl">
<?php include ('partials/header.html') ?>
<?php include ('partials/movies-template-search.html') ?>
</section>
<section id="main" class="main"> 
	<div ng-view class="slide" onload="onViewLoad()"></div>
    <!--In progress message-->
    <div class="in-progress-bg">
        <div class="in-progress">
          <div class="in-progress-msg"></div>
        </div>
    </div>
    <!--//In progress message--> 
    <div id='fb-root'></div>
<!--<script src='http://connect.facebook.net/en_US/all.js'></script>-->
<!--<script src="social.js"></script> -->
<script><!--Facebook SDK--> 
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


function fbFeed(elem) {
			
		//console.log(elem);			
		var url = $(elem).attr('data-url');
		var pic = $(elem).attr('data-picture');
		var titl = $(elem).attr('data-name');
		var desc = $(elem).attr('data-description');
		fbShare = {};
		//fbShare.base = 'https://www.facebook.com/dialog/feed';
		//fbShare.appId = '?app_id=694907180553170';
		fbShare.redirectUrl = 'http://www.grimeo.com';
		//fbShare.url = '&link=http://www.grimeo.com' + '/' + url; //!!!!!!!!!!!! FB does not like this		
		fbShare.url = 'http://www.grimeo.com/' + url;	
		fbShare.name = titl;
		fbShare.picture = pic; 
		fbShare.caption = 'I just watched this movie trailer - check it out here'; 
		fbShare.description = desc; 
		//console.log(fbShare);
		
		postToFeed(fbShare);
		return false
	
}

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
	FB.ui(obj, function(response) {
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

<!--//Facebook SDK-->
</script>   
</section>

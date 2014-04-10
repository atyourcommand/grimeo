<?php  $this->load->helper('html');?>
<?php $base_url=$this->config->item('base_url'); ?>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width">
<title>Best Movie and TV Search | Thousands of titles | Grimeo</title>
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
<link href="css/app.css?version=08.04.14" rel="stylesheet" type="text/css">
<!--<link href="css/paging.css" media="screen" rel="stylesheet" type="text/css" />-->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
</head>
<body>
<section class="options" style="display:none;">
  <div class="row">
    <div class="column small-12">
      <div class="user-options center">
      <form name="user-options">
        <input type="checkbox" name="options[2_A]" value="trailers" id="2_A">
        <label for="2_A" class="checkboxes inline-block"> Show Movie Trailers </label>
        <input type="checkbox" name="options[2_B]" value="adult" id="2_B" disabled >
        <label for="2_B" class="checkboxes inline-block disabled" > Adult </label>
        <input type="checkbox" name="options[2_C]" value="favourites" id="2_C" >
        <label for="2_C" class="checkboxes inline-block">Create a favourite show list</label>
        </form>
      </div>
    </div>
  </div>
</section>
<header class="fn-add-hover search-active">

    <div class="row show-for-small-only">
      <div class="column small-12 static"> <a href="/" class="inline-block margin-auto logo logos-logo-mobile"></a> </div>
    </div>
    <div class="row">
      <div class="column small-12 medium-2 static">
        <div class="dropdown-menu main-nav fn_dropdown">
          <ul class="menu-inline-list">
            <li><a href="#">Menu <i class="fa fa-arrow-circle-right"></i></a>
              <div class="sub-menu fn_menu-helper">
                <div class="inner">
                  <ul class="plain row-1 fn-blocks">
                    <li class="show-menu"><a href="#">Movies</a>
                      <ul class="plain menu row-2 fn-blocks">
                        <li class="show-menu"><a href="#">Search</a>
                          <ul class="plain menu row-3 fn-blocks">
                            <li>
                              <h2>Fastest search</h2>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                              <!-- <p><a href="#" class="learn-more">Go to page</a></p>--> 
                            </li>
                          </ul>
                        </li>
                        <li><a href="#">All movies</a>
                          <ul class="plain menu row-3 fn-blocks">
                            <li>
                              <h2>Largest array of movie titles</h2>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                              <!-- <p><a href="#" class="learn-more">Go to page</a></p>--> 
                            </li>
                          </ul>
                        </li>
                        <li><a href="#">Movie details</a>
                          <ul class="plain menu row-3 fn-blocks">
                            <li>
                              <h2>Descriptions, backdrops and reviews</h2>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                              <!--  <p><a href="#" class="learn-more">Go to page</a></p>--> 
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                    <li><a href="#">TV</a>
                      <ul class="plain menu row-2 fn-blocks">
                        <li class="show-menu"><a href="#">List items 2</a>
                          <ul class="plain menu row-3 fn-blocks">
                            <li>
                              <h2>Fund<br>
                                Sustainability</h2>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                              <p><a href="#" class="learn-more">Go to page</a></p>
                            </li>
                          </ul>
                        </li>
                        <li><a href="#">List items 2</a>
                          <ul class="plain menu row-3 fn-blocks">
                            <li>
                              <h2>Fund<br>
                                Sustainability</h2>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                              <p><a href="#" class="learn-more">Go to page</a></p>
                            </li>
                          </ul>
                        </li>
                        <li><a href="#">List items 2</a>
                          <ul class="plain menu row-3 fn-blocks">
                            <li>
                              <h2>Fund<br>
                                Sustainability</h2>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna </p>
                              <p><a href="#" class="learn-more">Go to page</a></p>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li><a href="#" class="show-for-small-only">Genres</a>
              <div class="sub-menu">
                <div class="inner"> 
                  <!--Genre menu output-->
                  <dl class="plain menu-genre row">
                  </dl>
                  <!--//Genre menu output--> 
                  <a href="#" class="right fn-close closer"><i class="fa fa-times-circle"></i></a> </div>
              </div>
            </li>
            <!--<li><a href="#">More</a>
                  <div class="sub-menu">
                    <div class="inner">
                      <ul class="plain">
                        <li><a href="#">More</a></li>
                      </ul>
                    </div>
                  </div>
                </li>--> 
            <!--<li><a href="#">More</a></li>--> 
            <!-- <li><a href="#">More</a></li>-->
          </ul>
        </div>
      </div>
      <div class="column small-12 medium-8 static center"> <a href="/" class="inline-block margin-auto logo logos-logo fn-wobble show-for-medium-up"></a>
        <div class="relative">
          <div class="row">
            <div class="column small-12"> 
              <!--Radio Options-->
              <div class="ui-options fn-ui-options">
                <input type="radio" name="options[1]" value="movies" id="1_A">
                <label for="1_A" class="inline-block">Movies </label>
                <input type="radio" name="options[1]" value="tv" id="1_B" >
                <label for="1_B" class="inline-block"> Television </label>
              </div>
            </div>
          </div>
          <div class="row search" style="display:none;">
            <div class="column small-3">
              <input type="checkbox" name="options[4_A]" value="genres" id="4_A" class="fn_dropdown-alt">
              <label for="4_A" class="checkboxes inline-block"> Genres</label>
            </div>
            <div class="column small-6">
              <div class="search-tv">
                <input type="text" value="" name="tv" id="tv" class="main-search" placeholder="Search all television shows"/ >
                <!--Alt dropdowns--> 
                <!--No dropdowns yet--> 
                <!--//Alt dropdowns--> 
              </div>
              <div class="search-movie show">
                <input type="text" value="" name="movie"  id="movie" class="main-search" placeholder="Search all movies"/ >
              </div>
            </div>
            <div class="column small-3">
              <input type="checkbox" name="options[3_A]" value="options" id="3_A">
              <label for="3_A" class="checkboxes inline-block"> Options</label>
            </div>
          </div>
        </div>
        <!--Alt dropdowns-->
        <div class="dropdown-menu dropdown-alt options-nav show">
          <ul class="menu-inline-list">
            <li class=""><a href="#" class="button small fn-change-text" style="display:none;"><span class="fade-in">or chose from 35 genres <i class="fa fa-arrow-circle-right"></i></span><span> <i class="fa fa-arrow-circle-left"></i> Close Genres</span></a>
              <div class="sub-menu">
                <div class="inner"> 
                  <!--Genre menu output-->
                  <dl class="plain menu-genre row">
                  </dl>
                  <!--//Genre menu output--> 
                  <a href="#" class="right fn-close closer"><i class="fa fa-times-circle"></i></a> </div>
              </div>
            </li>
            <!--<li><a href="#">More</a>
                      <div class="sub-menu">
                        <div class="inner">
                          <ul class="plain">
                            <li><a href="#">More</a></li>
                          </ul>
                        </div>
                      </div>
                    </li>--> 
            <!--<li><a href="#">More</a></li>--> 
            <!-- <li><a href="#">More</a></li>-->
          </ul>
        </div>
        
        <!--//Alt dropdowns--> 
        
      </div>
      <div class="column small-12 medium-2 show-for-medium-up"> 
        <!--<a href="#" class="inline-block graphics-fb right"></a>-->
        
        <div class="center"> 
          <!--<i class="fa fa-film"></i>--> 
          <!--<i class="fa fa-facebook"></i>-->
          <?php 
$sesUser = $this->session->userdata('User');
//if($this->session->userdata($sesUser) !== FALSE)   { 
if(!empty($sesUser))   { 
	echo '<img src="https://graph.facebook.com/'. $sesUser['id'] .'/picture" class="fb-thumb" width="50" height="50"/><div><small>'.$sesUser['name'].'</small></div>';	
	echo '<small><a href="'.$this->session->userdata('logout').'">LOGOUT</a></small>';
} else{
	echo img(array('src'=>$base_url.'/images/misc/fb-48.png','id'=>'facebook','style'=>'cursor:pointer;'));
}
?>
          <div id="fb-root"></div>
          <!--Facebook SDK--> 
          <script type="text/javascript">
  window.fbAsyncInit = function() {
     FB.init({ 
       appId:'<?php echo $this->config->item('appID'); ?>', cookie:true, 
       status:true, xfbml:true,oauth : true 
     });
   };
   (function(d){
           var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
           if (d.getElementById(id)) {return;}
           js = d.createElement('script'); js.id = id; js.async = true;
           js.src = "//connect.facebook.net/en_US/all.js";
           ref.parentNode.insertBefore(js, ref);
         }(document));
 $('#facebook').click(function(e) {
    FB.login(function(response) {
	  if(response.authResponse) {
		  parent.location ='<?php echo $base_url; ?>/welcome/fblogin';
	  }
 },{scope: 'email,read_stream,publish_stream,user_birthday,user_location,user_work_history,user_hometown,user_photos'});
});
</script> 
          <!--//Facebook SDK--> 
        </div>
      </div>
    </div>

</header>

<section class="main"> 
  <!--Paging results-->
  <div class="holder"></div>
  <!--Paging results--> 
  <!--Results Header-->
  <div class="results-header">
    <div class="row">
      <div class="column medium-3 show-for-medium-up">&nbsp;</div>
      <div class="column medium-6">
        <div class="searching-for center" style="display:none">Searching for: <span class="term">&nbsp;</span> </div>
        <div class="category center"> <span class="title">Latest Movies</span> </div>
      </div>
      <div class="column medium-3 show-for-medium-up" >&nbsp;</div>
    </div>
  </div>
  <!--Search Output-->
  <div class="results relative">
    <div class="row">
      <div class="column medium-12">
      
        <form name="save-shows">
        <ul id="content" class="row search-output">
        </ul>
        </form>
      </div>
    </div>
    <!--//Search Output--> 
    <!--Detailed Output-->
    <div class="row">
      <div class="column large-12">
        <ul class="asset-detail">
        </ul>
      </div>
    </div>
    <!--In progress message-->
    <div class="in-progress-bg">
      <div class="in-progress">
        <div class="in-progress-msg"></div>
      </div>
    </div>
    <!--//In progress message--> 
  </div>
</section>

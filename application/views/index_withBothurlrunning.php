<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>JB TV</title>
<link href="css/app.css" rel="stylesheet" type="text/css">

</head>
<body>
<header class="fn-add-hover">
  <div class="row">
    <div class="column small-12 medium-2 static">
    	<div class="logo">
        	<i class="fa fa-film"></i>
        </div>
    </div>
    <div class="column small-12 medium-8 static">
  <!--Menu-->
  <div class="dropdown-menu fn_dropdown">
  	<ul class="main-nav menu-inline-list">
                <li><a href="#">Genre</a>
                  <div class="sub-menu">
                    <div class="inner">
                    
                      <!--Genre menu output-->
                      <dl class="plain menu-genre row">
                      </dl>
                      <!--//Genre menu output-->
                      <a href="#" class="right fn-close closer"><i class="fa fa-times-circle"></i></a>
                    </div>
                  </div>
                </li>
                <li><a href="#">About</a>
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
                <li><a href="#">More</a>
                  <div class="sub-menu">
                    <div class="inner">
                      <ul class="plain">
                        <li><a href="#">More</a></li>
                      </ul>
                    </div>
                  </div>
                </li>
                <!--<li><a href="#">More</a></li>-->
               <!-- <li><a href="#">More</a></li>-->
              </ul>
  </div>
  <!--//Menu--> 
    </div>
    <div class="column small-12 medium-2">&nbsp;<a href="#" class="inline-block graphics-fb right"></a></div>
  </div>
  <!--Old Genre menu output-->
  <dl class="row menu">
  </dl>
  <!--//Old Genre menu output-->
</header>
<section class="main">
    <!--Text search-->
    <dl class="row">
        <dd class="column large-4"> </dd>
        <dd class="column large-4">
          <input type="text" value="" id="movie" class="main-search" placeholder="Search all shows"/>
          <div class="searching-for help-text center" style="display:none">Searching for: 												<span class="term"></span>
           </div>
          <!--<button>Search</button>--> 
        </dd>
        <dd class="column large-4"> </dd>
    </dl>
  <!--//Text search-->  
  <!--Search Output-->
  <div class="row">
    <div class="column medium-12">
      <ul class="row search-output">
      </ul>
    </div>
  </div>
  <!--//Search Output-->
  <!--Detailed Output-->
  <div class="row">
    <div class="column large-12">
      <ul class="asset-detail"></ul>
    </div>
  </div>
  <!--//Detailed Output-->
  <!--Record placeholders and examples-->
  <!--
  <div class="row">
    <div class="column large-12">
      <div class="row collapse">
        <div class="column medium-6 large-4">
          <div class="result latest">
            <div class="image-container"> <img src="images/poster-1.jpg" width="1280" height="720"> </div>
            <div class="meta">
              <h1>Breaking Bad (2011) <a href="#"class="right fn-expand-panel fn-asset-link"><i class="fa fa-expand"></i></a></h1>
            </div>
            <div class="cta user-options">
              <div class="row collapse">
                <div class="column small-3"> <a href="#" class="button small expand preview"><i class="fa fa-film"></i> Trailer</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand rate"><i class="fa fa-star-half-o"></i> Rate</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand share"><i class="fa fa-check-square-o"></i> List</a> </div>
                <div class="column small-3 end"> <a href="#" class="button small expand review fn-toggle-control"><i class="fa fa-pencil-square-o"></i> Review</a> </div>
              </div>
            </div>
            <div class="control review" style="display:none">
              <div class="row collapse">
                <div class="column medium-9">
                  <input type="text" placeholder="add a review here"/>
                </div>
                <div class="column medium-2"> <a class="button small expand submit">Submit</a> </div>
                <div class="column medium-1"> <a class="button small expand close fn-toggle-control">x</a> </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column medium-6 large-4">
          <div class="result latest">
            <div class="image-container"> <img src="images/poster-2.jpg" width="1280" height="720"> </div>
            <div class="meta">
              <h1>The Big Bang Theory <a href="#"class="right fn-expand-panel"><i class="fa fa-expand"></i></a></h1>
            </div>
            <div class="cta user-options">
              <div class="row collapse">
                <div class="column small-3"> <a href="#" class="button small expand preview"><i class="fa fa-film"></i> Trailer</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand rate"><i class="fa fa-star-half-o"></i> Rate</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand share"><i class="fa fa-check-square-o"></i> List</a> </div>
                <div class="column small-3 end"> <a href="#" class="button small expand review fn-toggle-control"><i class="fa fa-pencil-square-o"></i> Review</a> </div>
              </div>
            </div>
            <div class="control review" style="display:none">
              <div class="row collapse">
                <div class="column medium-9">
                  <input type="text" placeholder="add a review here"/>
                </div>
                <div class="column medium-2"> <a class="button small expand submit">Submit</a> </div>
                <div class="column medium-1"> <a class="button small expand close fn-toggle-control">x</a> </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column medium-6 large-4">
          <div class="result latest">
            <div class="image-container"> <img src="images/poster-3.jpg" width="1280" height="720"> </div>
            <div class="meta">
              <h1>The title <a href="#"class="right fn-expand-panel"><i class="fa fa-expand"></i></a></h1>
            </div>
            <div class="cta user-options">
              <div class="row collapse">
                <div class="column small-3"> <a href="#" class="button small expand preview"><i class="fa fa-film"></i> Trailer</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand rate"><i class="fa fa-star-half-o"></i> Rate</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand share"><i class="fa fa-check-square-o"></i> List</a> </div>
                <div class="column small-3 end"> <a href="#" class="button small expand review fn-toggle-control"><i class="fa fa-pencil-square-o"></i> Review</a> </div>
              </div>
            </div>
            <div class="control review" style="display:none">
              <div class="row collapse">
                <div class="column medium-9">
                  <input type="text" placeholder="add a review here"/>
                </div>
                <div class="column medium-2"> <a class="button small expand submit">Submit</a> </div>
                <div class="column medium-1"> <a class="button small expand close fn-toggle-control">x</a> </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column medium-6 large-4">
          <div class="result latest">
            <div class="image-container"> <img src="images/poster-4.jpg" width="1280" height="720"> </div>
            <div class="meta">
              <h1>The title <a href="#"class="right fn-expand-panel"><i class="fa fa-expand"></i></a></h1>
            </div>
            <div class="cta user-options">
              <div class="row collapse">
                <div class="column small-3"> <a href="#" class="button small expand preview"><i class="fa fa-film"></i> Trailer</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand rate"><i class="fa fa-star-half-o"></i> Rate</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand share"><i class="fa fa-check-square-o"></i> List</a> </div>
                <div class="column small-3 end"> <a href="#" class="button small expand review fn-toggle-control"><i class="fa fa-pencil-square-o"></i> Review</a> </div>
              </div>
            </div>
            <div class="control review" style="display:none">
              <div class="row collapse">
                <div class="column medium-9">
                  <input type="text" placeholder="add a review here"/>
                </div>
                <div class="column medium-2"> <a class="button small expand submit">Submit</a> </div>
                <div class="column medium-1"> <a class="button small expand close fn-toggle-control">x</a> </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column medium-6 large-4">
          <div class="result latest">
            <div class="image-container"> <img src="images/poster-5.jpg" width="1280" height="720"> </div>
            <div class="meta">
              <h1>The title <a href="#"class="right fn-expand-panel"><i class="fa fa-expand"></i></a></h1>
            </div>
            <div class="cta user-options">
              <div class="row collapse">
                <div class="column small-3"> <a href="#" class="button small expand preview"><i class="fa fa-film"></i> Trailer</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand rate"><i class="fa fa-star-half-o"></i> Rate</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand share"><i class="fa fa-check-square-o"></i> List</a> </div>
                <div class="column small-3 end"> <a href="#" class="button small expand review fn-toggle-control"><i class="fa fa-pencil-square-o"></i> Review</a> </div>
              </div>
            </div>
            <div class="control review" style="display:none">
              <div class="row collapse">
                <div class="column medium-9">
                  <input type="text" placeholder="add a review here"/>
                </div>
                <div class="column medium-2"> <a class="button small expand submit">Submit</a> </div>
                <div class="column medium-1"> <a class="button small expand close fn-toggle-control">x</a> </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column medium-6 large-4">
          <div class="result latest">
            <div class="image-container"> <img src="images/poster-6.jpg" width="1280" height="720"> </div>
            <div class="meta">
              <h1>The title <a href="#"class="right fn-expand-panel"><i class="fa fa-expand"></i></a></h1>
            </div>
            <div class="cta user-options">
              <div class="row collapse">
                <div class="column small-3"> <a href="#" class="button small expand preview"><i class="fa fa-film"></i> Trailer</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand rate"><i class="fa fa-star-half-o"></i> Rate</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand share"><i class="fa fa-check-square-o"></i> List</a> </div>
                <div class="column small-3 end"> <a href="#" class="button small expand review fn-toggle-control"><i class="fa fa-pencil-square-o"></i> Review</a> </div>
              </div>
            </div>
            <div class="control review" style="display:none">
              <div class="row collapse">
                <div class="column medium-9">
                  <input type="text" placeholder="add a review here"/>
                </div>
                <div class="column medium-2"> <a class="button small expand submit">Submit</a> </div>
                <div class="column medium-1"> <a class="button small expand close fn-toggle-control">x</a> </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column medium-6 large-4">
          <div class="result latest">
            <div class="image-container"> <img src="images/poster-7.jpg" width="1280" height="720"> </div>
            <div class="meta">
              <h1>The title <a href="#"class="right fn-expand-panel"><i class="fa fa-expand"></i></a></h1>
            </div>
            <div class="cta user-options">
              <div class="row collapse">
                <div class="column small-3"> <a href="#" class="button small expand preview"><i class="fa fa-film"></i> Trailer</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand rate"><i class="fa fa-star-half-o"></i> Rate</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand share"><i class="fa fa-check-square-o"></i> List</a> </div>
                <div class="column small-3 end"> <a href="#" class="button small expand review fn-toggle-control"><i class="fa fa-pencil-square-o"></i> Review</a> </div>
              </div>
            </div>
            <div class="control review" style="display:none">
              <div class="row collapse">
                <div class="column medium-9">
                  <input type="text" placeholder="add a review here"/>
                </div>
                <div class="column medium-2"> <a class="button small expand submit">Submit</a> </div>
                <div class="column medium-1"> <a class="button small expand close fn-toggle-control">x</a> </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column medium-6 large-4">
          <div class="result latest">
            <div class="image-container"> <img src="images/poster-8.jpg" width="1280" height="720"> </div>
            <div class="meta">
              <h1>The title <a href="#"class="right fn-expand-panel"><i class="fa fa-expand"></i></a></h1>
            </div>
            <div class="cta user-options">
              <div class="row collapse">
                <div class="column small-3"> <a href="#" class="button small expand preview"><i class="fa fa-film"></i> Trailer</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand rate"><i class="fa fa-star-half-o"></i> Rate</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand share"><i class="fa fa-check-square-o"></i> List</a> </div>
                <div class="column small-3 end"> <a href="#" class="button small expand review fn-toggle-control"><i class="fa fa-pencil-square-o"></i> Review</a> </div>
              </div>
            </div>
            <div class="control review" style="display:none">
              <div class="row collapse">
                <div class="column medium-9">
                  <input type="text" placeholder="add a review here"/>
                </div>
                <div class="column medium-2"> <a class="button small expand submit">Submit</a> </div>
                <div class="column medium-1"> <a class="button small expand close fn-toggle-control">x</a> </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column medium-6 large-4">
          <div class="result latest">
            <div class="image-container"> <img src="images/poster-9.jpg" width="1280" height="720"> </div>
            <div class="meta">
              <h1>The title <a href="#"class="right fn-expand-panel"><i class="fa fa-expand"></i></a></h1>
            </div>
            <div class="cta user-options">
              <div class="row collapse">
                <div class="column small-3"> <a href="#" class="button small expand preview"><i class="fa fa-film"></i> Trailer</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand rate"><i class="fa fa-star-half-o"></i> Rate</a> </div>
                <div class="column small-3"> <a href="#" class="button small expand share"><i class="fa fa-check-square-o"></i> List</a> </div>
                <div class="column small-3 end"> <a href="#" class="button small expand review fn-toggle-control"><i class="fa fa-pencil-square-o"></i> Review</a> </div>
              </div>
            </div>
            <div class="control review" style="display:none">
              <div class="row collapse">
                <div class="column medium-9">
                  <input type="text" placeholder="add a review here"/>
                </div>
                <div class="column medium-2"> <a class="button small expand submit">Submit</a> </div>
                <div class="column medium-1"> <a class="button small expand close fn-toggle-control">x</a> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  -->
  <!--//Record placeholders and examples-->	

</section>
<footer>
<div class="row">
  <div class="column large-12"><small>At Your Command</small></div>
  </footer>
</div>
</body>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
<script type="text/javascript" src="main.min.js"></script>
<script>
$(function() {
	dropDownMenu.init();
	
});
</script>
<script type="text/javascript">
	jQuery(function($) {
	  $('.fn-blocks').responsiveEqualHeightGrid();	
	});
</script>

<script type="text/javascript" src="//use.typekit.net/nra0wdi.js"></script>
<script type="text/javascript">try{Typekit.load();}catch(e){}</script>
<script src="http://code.jquery.com/jquery-latest.min.js"
        type="text/javascript"></script>
<script type="text/javascript" src="//use.typekit.net/nra0wdi.js"></script>
<script type="text/javascript">try{Typekit.load();}catch(e){}</script>

<script>
(function($) {
    $(document).ready(function() {
	
	//GENRE LIST FOR NAVIGATION
	function loadGenreList(data){
		console.log(data);
		var mode = 'genre/list',
			url = url + mode + key ,
			list,
			$genreResultDiv = $('.menu-genre');//
		
		$.each(data, function(i, item) {
			if(i == "genres") {
				da = data[i];
				$.each(da, function (j, item) {  
						var $id = item.id; 
						var $genres = "<a href=\"#\" class=\"fn-genre-link\" id=\""+$id+"\">"+item.name+"</a>";
						list +="<dd class=\"column small-6 medium-3 large-2 end\">"+$genres+"</dd>" ; 
				});
			} 
		});  
		list = list.replace("undefined", "");
		$genreResultDiv.html(list).fadeIn();
	}
	
	//UPCOMING MOVIES
function loadUpcomingMovies(){
var media = 'movie',
	mode = '/upcoming',
	url = 'http://api.themoviedb.org/3/',
   key = '?api_key=ba5a09dba76b1c3875e487780468ef93';
 $.ajax({
		url: url + media + mode + key, 
		success: function (data) {  
				var list = '';
				var $resultDiv = $('.search-output');
				$.each(data, function(i, item) {
				if(i == "results") {
				da = data[i];
				$.each(da, function (j, item) {  
					var $poster_path = base_url+item.poster_path;
					var $id = item.id;
					var $title = "<li><a href=\"#\" class=\"fn-asset-link\" id=\""+$id+"\">"+item.title+"</a></li>";
					var $poster = "<img src=\""+$poster_path+"\"/>";
					var $loader = "<img src=\"images/misc/loading.gif\" class=\"loader\"/>";
					list +="<li class=\"column small-6 medium-3 large-2 end\"><ul>"+$loader +$poster+$title+"</ul></li>" ;
				});
				} 
				});	 
				list = list.replace("undefined", "");
				$resultDiv.html(list).fadeIn();
				//Detect broken images
				$('img').load(function () {

				$(this).hide();
				$('.loader').fadeOut('fast');
				$(this).fadeIn();
				})
				.error(function () {
				$(this).attr('src','http://placehold.it/150x225');
				})
		}, 
		error: function (request,error) {
			alert('Network error has occurred please try again!');
		}  
	});
}
	
	var url = 'http://api.themoviedb.org/3/',
		base_url = 'http://image.tmdb.org/t/p/w92',//for images
		base_backdrop_url = 'http://image.tmdb.org/t/p/w780',//for images
        mode = 'genre/list',
		trailer = '/trailers',
        input,
        movieName,
        key = '?api_key=ba5a09dba76b1c3875e487780468ef93';
	
	$.ajax({
		//type: 'GET',
		//url: url + mode + key + '&query='+movieName ,
		
		url: url + mode + key ,
		async: false,
		contentType: 'application/json',
		dataType: 'jsonp',
						
		success: function (data) {  
			loadGenreList(data);
			loadUpcomingMovies();		

		}, 
		error: function (request,error) {
			alert('Network error has occurred please try again!');
		} 
	});
	//GENRE RESULTS
     $(document).on('click','.fn-genre-link', function(e){
			console.log('clicked');
			var $id  = $(this).attr('id'),
			mode = 'genre/',
			media = '/movies'; 
			$.ajax({
				//type: 'GET',
				url: url + mode + $id + media+ key, 
				async: false,
				contentType: 'application/json',
				dataType: 'jsonp', 
				success: function (data) {   
					console.log(data); 
					var str;
					var list;
					var $resultDiv = $('.search-output');// 
					$.each(data, function(i, item) {
						if(i == "results") {
							da = data[i];
							$.each(da, function (j, item) {  
									
									var $poster_path = base_url+item.poster_path;
									var $id = item.id;
									var $title = "<li><a href=\"#\" class=\"fn-asset-link\" id=\""+$id+"\">"+item.title+"</a></li>";
									var $poster = "<img src=\""+$poster_path+"\"/>";
									var $loader = "<img src=\"images/misc/loading.gif\" class=\"loader\"/>";
									list +="<li class=\"column small-6 medium-3 large-2 end\"><ul>"+$loader +$poster+$title+"</ul></li>" ;
							});
						} 
					});
				list = list.replace("undefined", "");
				$resultDiv.html(list).fadeIn();
				//Detect broken images
				$('img').load(function () {
				
					$(this).hide();
					$('.loader').fadeOut('fast');
					$(this).fadeIn();
				})
				.error(function () {
					$(this).attr('src','http://placehold.it/150x225');
				})
				},
				 
				error: function (request,error) {
            		alert('Network error has occurred please try again!');
        		}
        	});
    });
	//MAIN TEXT SEARCH
    $('.main-search').on('keyup',function() {
			var input = $('#movie').val(),
				movieName = encodeURI(input),
				mode = 'search/',
				media = 'movie';
			$.ajax({
				//type: 'GET',
				url: url + mode + media + key + '&query='+movieName ,
				async: false,
				contentType: 'application/json',
				dataType: 'jsonp',
				beforeSend: function(html) {
					$('.searching-for').show();
					$('.term').html(input);	 
					// Check if text search box is empty or clear 
					if(!input) $('.search-output').hide();
				}, 
				success: function (data) {   
					console.log(data);
					var str;
					var list;
					var $resultDiv = $('.search-output');//
					console.log(data); // 
					$.each(data, function(i, item) {
						if(i == "results") {
							da = data[i];
							$.each(da, function (j, item) {  
									var $poster_path = base_url+item.poster_path;
									var $id = item.id;
									var $title = "<li><a href=\"#\" class=\"fn-asset-link\" id=\""+$id+"\">"+item.title+"</a></li>";
									var $poster = "<img src=\""+$poster_path+"\"/>";
									var $loader = "<img src=\"images/misc/loading.gif\" class=\"loader\"/>";
									list +="<li class=\"column small-6 medium-3 large-2 end\"><ul class=\"clearfix\" >"+$loader +$poster+$title+"</ul></li>" ;
							});
						} 
					}); 
				list = list.replace("undefined", "");
				$resultDiv.html(list).fadeIn();
				//Detect broken images
				$('img').load(function () { 
					$(this).hide();
					$('.loader').fadeOut('fast');
					$(this).fadeIn();
				})
				.error(function () {
					$(this).attr('src','http://placehold.it/150x225');
				}) 
				},  
				error: function (request,error) {
            		alert('Network error has occurred please try again!');
        		}  
        	});
    });
	//CLICK ON TEXT SEARCH RESULTS LINKS
	$(document).on('click','.fn-asset-link', function(e){
		//console.log('working');
		
		var $id  = $(this).attr('id'),
		media = 'movie/';
		//var url = "http://mymovieapi.com/?type=json&id="+$id+"&release=full&plot=full";
		
		//$('#imdbcontents').html('<center><img src="images/loading.gif" alt="loading..."></center>');
		$('search-output').hide();	
		$.ajax({
		  url: url + media + $id + key,
		  dataType: 'json',
		  async: false,
		  contentType: 'application/json',
		  dataType: 'jsonp',
		  beforeSend: function() {
			$('.searching-for').hide();
			$('.term').hide();
			$('.search-output').fadeOut();	
		  },
		  success: function(data){
				console.log(data);
				var list;
				var $resultDiv = $('.asset-detail');//
				console.log(data); //
					if(true) {
						//str +="\nTitle: "+item.title;
						//var $title = "<li>\nTitle: "+item.title+"</li>";
						var $title = "<h1>"+data.original_title+"</h1>";
						var $tagline = "<div class=\"tagline\">"+data.tagline+"</div>";
						var $overview = "<p>"+data.overview+"</p>";
						var $releaseDate = "<div class=\"vote-average\">Release date: "+data.release_date+"</div>";
						var $voteAverage = "<div class=\"vote-average\">Vote average: "+data.vote_average+"</div>";
						var $voteCount = "<div class=\"vote-count\">Total votes: "+data.vote_count+"</div>";
						var $poster = "<img src=\""+base_url+data.poster_path+"\"/>";
						
						var $backdrop = "<li><img src=\""+base_backdrop_url+data.backdrop_path+"\" class=\"hero\"/></li>";
						list +="<li class=\"column small-12 medium-12 large-12\"><ul>"+$poster+$title+$tagline+$releaseDate+$voteCount+$voteAverage+$backdrop+$overview+"</ul></li>" ;
					
					} else {
						alert('no record found');
						console.log('no record found');		
					}
		  list = list.replace("undefined", "");
		  $resultDiv.html(list).fadeIn();
		  
		  },
		  error: function (request,error) {
          	alert('Network error has occurred please try again!');
			//console.log(url);
          }
		  
		});
		//end ajax
		e.preventDefault();
  	});
  
	});  
})(jQuery);
</script>
</html>
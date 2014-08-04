<footer>
  <div class="row">
    <div class="column large-12">
      <p class="copy">Grimeo is a comprehensive Movie and Television search application. All the data on this site are provided by <a href="http://www.themoviedb.org/">TMDb</a>. We thank them for all their awesomeness in providing this.</p>
    </div>
    <div class="column large-12">
      <p class="attribution"><a href="http://www.atyourcommand.com.au">Responsive Web Design by At Your Command</a></p>
      <p><a href="#" data-reveal-id="myShows">Launch My Shows</a></p>
    </div>
  </div>
</footer>
<div id="myModal" class="reveal-modal video">
  <div class="video-container"></div>
  <a class="close-reveal-modal">&#215;</a>
</div>
<div id="myShows" class="reveal-modal">
 <h3>My Shows</h3>
 <p>Here are your saved and favourited shows</p>
 <div class="show-container">
   <ul id="show-items"></ul>
   <a href="#" id="clear-all" class="button">Clear All</a>
 </div>
  <a class="close-reveal-modal">&#215;</a>
</div>
</body>
<script>
jQuery(function($) {
	dropDownMenu.init();
	dropDownMenuAlternate.init();
	swapText.init();
	$('.fn-blocks').responsiveEqualHeightGrid();
	
	
});
$(window).load(function() {
    $('[name="user-options"]').FormCache();
	$('[name="save-shows"]').SavedList();
});
</script>


<!--<script type="text/javascript" src="js/jquery.pages.js"></script>-->
<script>


(function($) {
    $(document).ready(function() {
    // variables show in one page
	var $header = $('header');
	var onepagerecord = 18;
	// GET VIDEO 
	function videoLink($id, $videoMode){
		var src;
		$.ajax({
			async: false,
			url: 'http://api.themoviedb.org/3/'+$videoMode+'/'+$id+'/trailers?api_key=ba5a09dba76b1c3875e487780468ef93', 
			success: function (data) { 
						$.each(data, function(i, item) {
							if(i == "youtube") {
								da = data[i];
								$.each(da, function (j, item) {  
									 if(item.source!="") { src  = item.source; }
								});
							}  
						});  
			}   
		});  
		return '//www.youtube.com/embed/'+src;
	}
		
	// GET ALL ACTORS LIST
	function actorname($id, $creditsMode){
			var op;
			$.ajax({
				async: false,
				url: 'http://api.themoviedb.org/3/'+$creditsMode+'/'+$id+'/credits?api_key=ba5a09dba76b1c3875e487780468ef93', 
				success: function (data) {  
						var name;
						$.each(data, function(i, item) {
							if(i == "cast") {
								da = data[i];
								$.each(da, function (j, item) {  
									 if(item.name!="") { name += item.name+', '; }
								});
							}  
						});	
						op =  name.substr(0, name.length-2);  
				}   
			});  
			return op.replace("undefined", "");
	}
	//GENRE LIST FOR NAVIGATION
	function loadGenreList(data){
		////console.log(data);
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
	var $getdata = "";
	for(var k=1;k<=2;k++){
		var media = 'movie',
		mode = '/upcoming',
		url = 'http://api.themoviedb.org/3/',
		key = '?api_key=ba5a09dba76b1c3875e487780468ef93';
		$.ajax({
			async: false,
			url: url + media + mode + key +'&page='+k, 
			success: function (data) {  
					$.each(data, function(i, item) {
						if(i == "results") {
							da = data[i];
							$.each(da, function (j, item) {  
								var $poster_path = base_url+item.poster_path;
								var $id = item.id; 
								//var $title = "<li><a href=\"#\" class=\"fn-asset-link\" id=\""+$id+"\">"+item.title+"</a></li>";
								//var $videoModalLink = "<li><a href=\"#\" data-reveal-id=\"myModal\" class=\"fn-play-video\" data-asset-id=\""+$id+"\">Play trailer</a></li>";
								var $poster = "<img src=\""+$poster_path+"\"/><a href=\"#\" data-reveal-id=\"myModal\" class=\"btn fn-play-video\" data-asset-id=\""+$id+"\" data-video-mode=\"movie\"><i></i><b>Play Trailer</b></a><a href=\"#\" class=\"btn fn-asset-link\" id=\""+$id+"\"><i></i><b>Show more</b></a><h3><a href=\"#\" class=\"fn-asset-link\" id=\""+$id+"\">"+item.title+"</a></h3>";
								var $loader = "<img src=\"images/misc/loading.gif\" class=\"loader\"/>";
								var $actions = "<div class=\"myshows-actions relative\"><input name=\"asset["+$id+"]\" id=\""+$id+"\" type=\"checkbox\" data-asset-name=\""+item.title+"\" data-asset-poster-path=\""+$poster_path+"\" value=\"save\"/><label for=\""+$id+"\" class=\"fn-add-hover checkboxes\"><span class=\"first\">Save it</span><span class=\"second\">Saved</span></label></div>"
								
								;
								$getdata +="<li class=\"column small-6 medium-3 large-2 end fn-add-hover\"><ul><div class=\"image-container fn-add-hover\" >"+$loader+$poster+$actions+"</div></ul></li>" ; 
								
							});
						} 
					});	
			}   
		}); 
	}
	//var $resultDiv = $('.search-output'); 
	$('.holder').fadeIn();	
	//alert('s');
	$getdata = $getdata.replace("undefined", ""); 
	$('.search-output').html($getdata).fadeIn();
	
	// paging function call
	$("div.holder").jPages({
		containerID : "content",
		perPage: onepagerecord
	});
		
	//Loader image first
	$('img').load(function () { 
		$(this).hide();
		$('.loader').fadeOut('fast');
			$(this).fadeIn();
	}) 
		
	.error(function () {
		$(this).attr('src','images/misc/poster-missing.gif');
	})
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
		 
		contentType: 'application/json',
		dataType: 'jsonp',
		
		beforeSend: function(){
			loadingContent.start('Please wait, loading up coming movies');
		},
		success: function (data) {  
			
			loadGenreList(data);
			//loadUpcomingMovies();
			loadingContent.end(); //Remove loading message
		}, 
		error: function (request,error) {
			alert('Network error has occurred please try again!');
		} 
	});
	//GENRE RESULTS
     $(document).on('click','.fn-genre-link', function(e){
			//get text string of link
			var linkValue = $(this).text(),
			$id  = $(this).attr('id'),
			mode = 'genre/',
			media = '/movies';
			$.ajax({
				//type: 'GET',
				url: url + mode + $id + media+ key, 
				async: false,
				contentType: 'application/json',
				dataType: 'jsonp', 
				beforeSend: function(html) {
					$('.holder').fadeIn();		
					$('.asset-details').html('');	
					$('.searching-for').hide();
					$('.category').show();
					$('.title').html(linkValue);
					
					//close drop down menu
					dropDownMenu.closeMenu();
					dropDownMenuAlternate.closeMenu();
					//console.log('shut menu');	 	 
				},
				success: function (data) {   
					//console.log(linkValue)
					//console.log(data); 
					var str;
					var list;
					var $resultDiv = $('.search-output');// 
					$.each(data, function(i, item) {
						if(i == "results") {
							da = data[i];
							$.each(da, function (j, item) {  
									
									var $poster_path = base_url+item.poster_path;
									var $id = item.id;
									//var $title = "<li><a href=\"#\" class=\"fn-asset-link\" id=\""+$id+"\">"+item.title+"</a></li>";
									var $poster = "<div class=\"image-container fn-add-hover\" ><img src=\""+$poster_path+"\"/><a href=\"#\" data-reveal-id=\"myModal\" class=\"btn fn-play-video\" data-asset-id=\""+$id+"\" data-video-mode=\"movie\"><i></i><b>Play Trailer</b></a><a href=\"#\" class=\"btn fn-asset-link\" id=\""+$id+"\"><i></i><b>Show more</b></a><h3><a href=\"#\" class=\"fn-asset-link\" id=\""+$id+"\">"+item.title+"</a></h3></div>";
									var $loader = "<img src=\"images/misc/loading.gif\" class=\"loader\"/>";
									list +="<li class=\"column small-6 medium-3 large-2 end\"><ul>"+$loader +$poster+"</ul></li>" ;
							});
						} 
					});
				list = list.replace("undefined", "");
				$resultDiv.html(list).fadeIn();
				// paging function call
				$("div.holder").jPages({
					containerID : "content",
					perPage: onepagerecord
				});
				//Loader image first
				$('img').load(function () {
				
					$(this).hide();
					$('.loader').fadeOut('fast');
					$(this).fadeIn();
				})
				.error(function () {
					$(this).attr('src','images/misc/poster-missing.gif');
				})
				
				},
				 
				error: function (request,error) {
            		alert('Network error has occurred please try again!');
        		}
        	});
    });
	//MAIN MOVIE SEARCH
    $('[name="movie"]').on('keyup',function() {
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
					$('.holder').fadeIn();		
					$('.category').hide();
					$('.searching-for').show();
					$('.term').html(input);	 
					// Check if text search box is empty or clear 
					if(!input) $('.search-output').hide();
				}, 
				success: function (data) {   
					//console.log(data);  
					var str;
					var list;
					var $resultDiv = $('.search-output');//
					//console.log(data); // 
					$.each(data, function(i, item) {
						if(i == "results") {
							da = data[i];
							$.each(da, function (j, item) {  
									var $poster_path = base_url+item.poster_path;
									var $id = item.id;
									//var $title = "<li><a href=\"#\" class=\"fn-asset-link\" id=\""+$id+"\">"+item.title+"</a></li>";
									var $poster = "<div class=\"image-container fn-add-hover\" ><img src=\""+$poster_path+"\"/><a href=\"#\" data-reveal-id=\"myModal\" class=\"btn fn-play-video\" data-asset-id=\""+$id+"\" data-video-mode=\"movie\"><i></i><b>Play Trailer</b></a><a href=\"#\" class=\"btn fn-asset-link\" id=\""+$id+"\"><i></i><b>Show more</b></a><h3><a href=\"#\" class=\"fn-asset-link\" id=\""+$id+"\">"+item.title+"</a></h3></div>";
									var $loader = "<img src=\"images/misc/loading.gif\" class=\"loader\"/>";
									list +="<li class=\"column small-6 medium-3 large-2 end\"><ul class=\"clearfix\" >"+$loader +$poster+"</ul></li>" ;
							});
						} 
					}); 
				list = list.replace("undefined", "");
				$resultDiv.html(list).fadeIn();
				// paging function call
				$("div.holder").jPages({
					containerID : "content",
					perPage: onepagerecord
				});
				//Detect broken images
				$('img').load(function () { 
					$(this).hide();
					$('.loader').fadeOut('fast');
					$(this).fadeIn();
				})
				.error(function () {
					$(this).attr('src','images/misc/poster-missing.gif');
				}) 
				},  
				error: function (request,error) {
            		alert('Network error has occurred please try again!');
        		}  
        	});
    });
	
	//MAIN TV SEARCH
    $('[name="tv"]').on('keyup',function() {
			var input = $('#tv').val(),
				movieName = encodeURI(input),
				mode = 'search/',
				media = 'tv';
			$.ajax({
				//type: 'GET',
				url: url + mode + media + key + '&query='+movieName ,
				async: false,
				contentType: 'application/json',
				dataType: 'jsonp',
				beforeSend: function(html) {
					$('.holder').fadeIn();		
					$('.category').hide();
					$('.searching-for').show();
					$('.term').html(input);	 
					// Check if text search box is empty or clear 
					if(!input) $('.search-output').hide();
				}, 
				success: function (data) {   
					//console.log(data);  
					var str;
					var list;
					var $resultDiv = $('.search-output');//
					//console.log(data); // 
					$.each(data, function(i, item) {
						if(i == "results") {
							da = data[i];
							$.each(da, function (j, item) {  
									var $poster_path = base_url+item.poster_path;
									var $id = item.id;
									//var $title = "<li><a href=\"#\" class=\"fn-asset-link\" id=\""+$id+"\">"+item.title+"</a></li>";
									var $poster = "<div class=\"image-container fn-add-hover\" ><img src=\""+$poster_path+"\"/><a href=\"#\" data-reveal-id=\"myModal\" class=\"btn fn-play-video\" data-asset-id=\""+$id+"\" data-video-mode=\tv\"><i></i><b>Play Trailer</b></a><a href=\"#\" class=\"btn fn-asset-link-tv\" id=\""+$id+"\"><i></i><b>Show more</b></a><h3><a href=\"#\" class=\"fn-asset-link-tv\" id=\""+$id+"\">"+item.name+"</a></h3></div>";
									var $loader = "<img src=\"images/misc/loading.gif\" class=\"loader\"/>";
									list +="<li class=\"column small-6 medium-3 large-2 end\"><ul class=\"clearfix\" >"+$loader +$poster+"</ul></li>" ;
							});
						} 
					}); 
				list = list.replace("undefined", "");
				$resultDiv.html(list).fadeIn();
				// paging function call
				$("div.holder").jPages({
					containerID : "content",
					perPage: onepagerecord
				});
				//Detect broken images
				$('img').load(function () { 
					$(this).hide();
					$('.loader').fadeOut('fast');
					$(this).fadeIn();
				})
				.error(function () {
					$(this).attr('src','images/misc/poster-missing.gif');
				}) 
				},  
				error: function (request,error) {
            		alert('Network error has occurred please try again!');
        		}  
        	});
    });
	//CLICK ON TEXT SEARCH RESULTS LINKS
	$(document).on('click','.fn-asset-link_', function(e){
		//console.log('working');
		
		var $id  = $(this).attr('id'),
		media = 'movie/', $videoMode = 'movie', $creditsMode = 'movie';
		//var url = "http://mymovieapi.com/?type=json&id="+$id+"&release=full&plot=full";
		
		//$('#imdbcontents').html('<center><img src="images/loading.gif" alt="loading..."></center>');
		$('search-output').hide();	
		$('.holder').hide();	
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
				//console.log(data);
				var list;
				var $resultDiv = $('.asset-detail'); 
				//console.log(data);  
					if(true) { 
						//str +="\nTitle: "+item.title;
						//var $title = "<li>\nTitle: "+item.title+"</li>";
						var $title = "<h1>"+data.original_title+"</h1>";
						var $tagline = "<div class=\"tagline\">"+data.tagline+"</div>";
						var $overview = "<p>"+data.overview+"</p>";
						var $videolink = "<p>"+'<iframe width="560"  height="315" src="'+videoLink($id)+'" frameborder="0" allowfullscreen=""></iframe>'+"</p>";
						var $releaseDate = "<div class=\"vote-average\">Release date: "+data.release_date+"</div>";
						var $voteAverage = "<div class=\"vote-average\">Vote average: "+data.vote_average+"</div>";
						var $voteCount = "<div class=\"vote-count\">Total votes: "+data.vote_count+"</div>";
						var $actors = "<div class=\"vote-count\">All Actors: "+actorname($id, $creditsMode )+"</div>";
						var $poster = "<img src=\""+base_url+data.poster_path+"\"/>";
						var $backdrop = "<li><img src=\""+base_backdrop_url+data.backdrop_path+"\" class=\"hero\"/></li>";
						list +="<li class=\"column small-12 medium-12 large-12\"><ul>"+$poster+$title+$tagline+$releaseDate+$voteCount+$actors+$voteAverage+$backdrop+$overview+$videolink+"</ul></li>" ;
					
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
	
	//CLICK ON TV RESULTS LINKS
	$(document).on('click','.fn-asset-link-tv_', function(e){
		//console.log('working');
		
		var $id  = $(this).attr('id'),
		media = 'tv/', $videoMode = 'tv', $creditsMode = 'tv';
		
		//var url = "http://mymovieapi.com/?type=json&id="+$id+"&release=full&plot=full";
		
		//$('#imdbcontents').html('<center><img src="images/loading.gif" alt="loading..."></center>');
		$('search-output').hide();	
		$('.holder').hide();	
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
				var $resultDiv = $('.asset-detail'); 
				//console.log(data);  
					if(true) { 
						//str +="\nTitle: "+item.title;
						//var $title = "<li>\nTitle: "+item.title+"</li>";
						var $title = "<h1>"+data.original_name+"</h1>";
						//var $tagline = "<div class=\"tagline\">"+data.tagline+"</div>";
						var $episodesSeasons = "<div class=\"tagline\">Seasons: "+data.number_of_seasons+"&nbsp;"+"Episodes: " +data.number_of_episodes +"</div>";
						//var $episodes = "<div class=\"tagline\">Episodes: "+ data.number_of_episodes + "</div>";
						var $overview = "<p>"+data.overview+"</p>";
						var $videolink = "<p>"+'<iframe width="560"  height="315" src="'+videoLink($id)+'" frameborder="0" allowfullscreen=""></iframe>'+"</p>";
						var $releaseDate = "<div class=\"vote-average\">Release date: "+data.release_date+"</div>";
						var $voteAverage = "<div class=\"vote-average\">Vote average: "+data.vote_average+"</div>";
						var $voteCount = "<div class=\"vote-count\">Total votes: "+data.vote_count+"</div>";
						var $actors = "<div class=\"vote-count\">All Actors: "+actorname($id, $creditsMode)+"</div>";
						var $poster = "<img src=\""+base_url+data.poster_path+"\"/>";
						
						var $backdrop = "<li><img src=\""+base_backdrop_url+data.backdrop_path+"\" class=\"hero\"/></li>";
						list +="<li class=\"column small-12 medium-12 large-12\"><ul>"+$poster+$title+$episodesSeasons+$releaseDate+$voteCount+$actors+$voteAverage+$backdrop+$overview+$videolink+"</ul></li>" ;
					
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
	
	

//TOP RATED TV FUNCTION

 function loadTopRatedTV(){  
	var $getdata = "";
	for(var k=1;k<=3;k++){
		var media = 'tv',
		mode = '/top_rated',
		//adult= '&include_adult=true',
		url = 'http://api.themoviedb.org/3/',
		key = '?api_key=ba5a09dba76b1c3875e487780468ef93';
		$.ajax({
			async: false,
			url: url + media + mode + key+'&page='+k, 
			success: function (data) {  
					$.each(data, function(i, item) {
						if(i == "results") {
							da = data[i];
							$.each(da, function (j, item) {  
								console.log(data);  
								var $poster_path = base_url+item.poster_path;
								var $id = item.id; 
								//var $title = "<li><a href=\"#\" class=\"fn-asset-link\" id=\""+$id+"\">"+item.title+"</a></li>";
								//var $videoModalLink = "<li><a href=\"#\" data-reveal-id=\"myModal\" class=\"fn-play-video\" data-asset-id=\""+$id+"\">Play trailer</a></li>";
								var $poster = "<div class=\"image-container fn-add-hover\" ><img src=\""+$poster_path+"\"/><a href=\"#\" data-reveal-id=\"myModal\" class=\"btn fn-play-video\" data-asset-id=\""+$id+"\" data-video-mode=\"tv\"\"><i></i><b>Play Trailer</b></a><a href=\"#\" class=\"btn fn-asset-link-tv\" id=\""+$id+"\"><i></i><b>Show more</b></a><h3><a href=\"#\" class=\"fn-asset-link-tv\" id=\""+$id+"\">"+item.name+"</a></h3></div>";
								var $loader = "<img src=\"images/misc/loading.gif\" class=\"loader\"/>";
								$getdata +="<li class=\"column small-6 medium-3 large-2 end\"><ul>"+$loader +$poster+"</ul></li>" ; 
								
							});
						} 
					});	
					 
			}   
		}); 
	}
	//var $resultDiv = $('.search-output'); 
	$('.holder').fadeIn();	
	//alert('s');
	$getdata = $getdata.replace("undefined", ""); 
	$('.search-output').hide().html($getdata).fadeIn();
	// paging function call
	$("div.holder").jPages({
		containerID : "content",
		perPage: onepagerecord
	});
		
	//Detect broken images
	$('img').load(function () { 
		$(this).hide();
		$('.loader').fadeOut('fast');
			$(this).fadeIn();
	}); 
}
// MOVIE CONTENT VIA MOVIE RADIO OPTION
$('input[id="1_A"]', '.ui-options').on('click', function(){
	
	var url = 'http://api.themoviedb.org/3/',
		base_url = 'http://image.tmdb.org/t/p/w92',//for images
		base_backdrop_url = 'http://image.tmdb.org/t/p/w780',//for images
        mode = 'genre/list',
		trailer = '/trailers',
        input,
        movieName,
        key = '?api_key=ba5a09dba76b1c3875e487780468ef93',
		modeHeading = 'Upcoming movies';
	
	$.ajax({
		//type: 'GET',
		//url: url + mode + key + '&query='+movieName ,
		url: url + mode + key ,
		 
		contentType: 'application/json',
		dataType: 'jsonp',
		
		beforeSend: function(){
			loadingContent.start('Please wait, loading upcoming movies');
			$('.title').html(modeHeading);	
		},
		success: function (data) {  
			loadGenreList(data);
			loadUpcomingMovies();
			loadingContent.end(); //Remove loading message
		}, 
		error: function (request,error) {
			alert('Network error has occurred please try again!');
		} 
	});
});

// TV CONTENT ON VIA TV RADIO OPTION
$('input[id="1_B"]', '.ui-options').on('click', function(){
	
	var url = 'http://api.themoviedb.org/3/',
		base_url = 'http://image.tmdb.org/t/p/w92',//for images
		base_backdrop_url = 'http://image.tmdb.org/t/p/w780',//for images
        //mode = 'genre/list',
		trailer = '/trailers',
        input,
        movieName,
        key = '?api_key=ba5a09dba76b1c3875e487780468ef93',
		modeHeading = 'Top rated TV shows';
		
	$.ajax({
		//type: 'GET',
		//url: url + mode + key + '&query='+movieName ,
		url: url + mode + key ,
		 
		contentType: 'application/json',
		dataType: 'jsonp',
		
		beforeSend: function(){
			loadingContent.start('Please wait, loading top rated TV');
			$('.title').html(modeHeading);	
			
		},
		success: function (data) {  
			
			//loadGenreList(data);
			//loadUpcomingMovies();
			loadTopRatedTV();
			loadingContent.end(); //Remove loading message
		}, 
		error: function (request,error) {
			alert('Network error has occurred please try again!');
		} 
	});
});
	
	// PLAY VIDEO IN MODAL
	$(document).on('click','.fn-play-video', function(e){	
		var $modal = $('.reveal-modal');
		var $id = $modal.attr('data-asset-id');
		var $videoMode = $modal.attr('data-video-mode');
		var $videolink = '<iframe width="560"  height="315" src="'+videoLink($id, $videoMode)+'?autoplay=1" frameborder="0" allowfullscreen=""></iframe>';
		var $videoContainer = $('.video-container');
		$videoContainer.html($videolink);
		e.preventDefault();
	});
  
	});  
})(jQuery);
</script>
<!--GA-->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-740836-42', 'grimeo.com');
  ga('send', 'pageview');

</script>
<script>
$(document).ajaxStop(function(){
     appendAdCode.loadAds();
});

</script>
<!--//GA-->
</html>
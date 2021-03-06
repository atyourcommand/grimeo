var myApp = angular.module('myApp',['ngRoute','ui.bootstrap', 'slugifier', 'ngResource', 'LocalStorageModule', 'ngAnimate' ]);
//http://stackoverflow.com/questions/18892793/angularjs-directives-how-to-conditionally-apply-a-template
var urlBase = 'http://ec2-54-183-177-210.us-west-1.compute.amazonaws.com:80/rest/',
	keyWebService = 'grimeo/',
	//media = 'movie/',
	appName = '&app_name=grimeo',
	
	urlMovies = urlBase + keyWebService,
	imageUrlBase = 'http://image.tmdb.org/t/p/w92',
	base_backdrop_url = 'http://image.tmdb.org/t/p/w780';
		
// Configure our routes
myApp.config(['$routeProvider',
	function($routeProvider) {
		
		$routeProvider.

			// route for the home page
			when('/', {
				templateUrl : 'pages/home.php',
				controller  : 'mainController', 
				title: 'home'
			}).
			
			// route for a movies page
			when('/movies/', {
				templateUrl : 'pages/movies.php',
				controller  : 'MoviesCtrl',
				title: 'Latest Movies'
			}).
			
			// route for the movie page
			when('/movie/:movieId/:MovieName/', {
				templateUrl : 'pages/movie.php',
				controller  : 'MovieCtrl', 
				title: 'Movie',
				description: 'Here are the latest Movies'
			}).
			
			// route for a tv shows page
			when('/tv/', {
				templateUrl : 'pages/tv-shows.php',
				controller  : 'ShowsCtrl',
				title: 'Latest TV'
			}).
			
			// route for the tv show page
			when('/tv/:tvId/:tvName/', {
				templateUrl : 'pages/tv-show.php',
				controller  : 'ShowCtrl', 
				title: 'TV',
				description: 'Here are the latest TV Shows'
			}).

			// route for the about page
			when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'AboutController',
				title: 'About'
			}).

			// route for the contact page
			when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'ContactController',
				title: 'Contact'
			}).
			
			otherwise({
				redirectTo: '/',
				title: 'Redirect'
			})
			
}]);

//Pages work as Hash Bangs #!
myApp.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
		//$locationProvider.html5Mode(true);
    }
]);
	
//Dynamic Title Tags
myApp.controller('titleController', function($scope, $route, $log, $routeParams){
	$scope.$on('$routeChangeSuccess', function(){
		//$scope.pageTitle = '';
		
		if ($routeParams.MovieName){
			$scope.pageTitle = deSlugify($routeParams.MovieName);			
			
		} else if ($routeParams.tvName){	
			$scope.pageTitle = deSlugify($routeParams.tvName);	
		} else {
			$scope.pageTitle = $route.current.title;
		}
	});
})

//Dynamic Description Tags
myApp.controller('descriptionController', function($scope, $route, $log, $routeParams){
	$scope.$on('$routeChangeSuccess', function(){
		
		if ($routeParams.MovieName){
			$scope.descriptionKeyword = deSlugify($routeParams.MovieName);	
			$scope.description = "Watch the trailer for";
			$scope.pageDescription = $scope.description + ' ' + $scope.descriptionKeyword;		
			
		} else if ($routeParams.tvName){	
			$scope.descriptionKeyword = deSlugify($routeParams.tvName);	
			$scope.description = "Watch the trailer for";
			$scope.pageDescription = $scope.description + ' ' + $scope.descriptionKeyword;	
		} else {
			$scope.pageDescription = $route.current.description;
		}
	});
})
//Slugify filter
function MyCtrl($scope, Slug) {
    $scope.slugify = function(input) {
        $scope.mySlug = slugify(input);
    };
}

//De-slug function //Remove -'s and Capitalize
function deSlugify(str){
	var newStr = str.replace(/-/g,' ');	
	firstLetter = newStr.substr(0, 1);
	return firstLetter.toUpperCase() + newStr.substr(1);
}

//Fallback images 
myApp.directive('fallbackSrc', function () {
  var fallbackSrc = {
    link: function postLink(scope, iElement, iAttrs) {
      iElement.bind('error', function() {
        angular.element(this).attr("src", iAttrs.fallbackSrc);
      });
    }
   }
   return fallbackSrc;
});
////http://stackoverflow.com/questions/14968690/sending-event-when-angular-js-finished-loading
//Check if resource has video available
myApp.directive('_videoCheck',['$timeout', function(timer){
  return {
    restrict: 'A',
	//require: '^videoCheck',
	scope: {
      dataId: '&',
	  videoMode: '&',
	  assetId: '@assetId', 
	  videoMode: '@videoMode', 
	  mediaName: '@mediaName', 
    },
	template:'<a href="#" data-reveal-id="myModal" class="btn fn-play-video" data-asset-id="{{assetId}}" data-video-mode="{{videoMode}}" data-media-name="{{mediaName}}"><i></i><b>Play Trailer</b></a>',
	
  };
  
}]);

// Caching
myApp.factory('myCache', function($cacheFactory) {
 return $cacheFactory('myData');
});

myApp.factory('GenreFactory', function($http, myCache){
	var mode = 'genres';
	return {
		getData: function(callback){
			data =  [
						{
						  "id": 1,
						  "genresId": 28,
						  "title": "Action"
						},
						{
						  "id": 2,
						  "genresId": 12,
						  "title": "Adventure"
						},
						{
						  "id": 3,
						  "genresId": 16,
						  "title": "Animation"
						},
						{
						  "id": 4,
						  "genresId": 35,
						  "title": "Comedy"
						},
						{
						  "id": 5,
						  "genresId": 80,
						  "title": "Crime"
						},
						{
						  "id": 6,
						  "genresId": 105,
						  "title": "Disaster"
						},
						{
						  "id": 7,
						  "genresId": 99,
						  "title": "Documentary"
						},
						{
						  "id": 8,
						  "genresId": 18,
						  "title": "Drama"
						},
						{
						  "id": 9,
						  "genresId": 82,
						  "title": "Eastern"
						},
						{
						  "id": 10,
						  "genresId": 2916,
						  "title": "Erotic"
						},
						{
						  "id": 11,
						  "genresId": 10751,
						  "title": "Family"
						},
						{
						  "id": 12,
						  "genresId": 10750,
						  "title": "Fan Film"
						},
						{
						  "id": 13,
						  "genresId": 14,
						  "title": "Fantasy"
						},
						{
						  "id": 14,
						  "genresId": 10753,
						  "title": "Film Noir"
						},
						{
						  "id": 15,
						  "genresId": 10769,
						  "title": "Foreign"
						},
						{
						  "id": 16,
						  "genresId": 36,
						  "title": "History"
						},
						{
						  "id": 17,
						  "genresId": 10595,
						  "title": "Holiday"
						},
						{
						  "id": 18,
						  "genresId": 27,
						  "title": "Horror"
						},
						{
						  "id": 19,
						  "genresId": 10756,
						  "title": "Indie"
						},
						{
						  "id": 20,
						  "genresId": 10402,
						  "title": "Music"
						},
						{
						  "id": 21,
						  "genresId": 22,
						  "title": "Musical"
						},
						{
						  "id": 22,
						  "genresId": 9648,
						  "title": "Mystery"
						},
						{
						  "id": 23,
						  "genresId": 10754,
						  "title": "Neo-noir"
						},
						{
						  "id": 24,
						  "genresId": 1115,
						  "title": "Road Movie"
						},
						{
						  "id": 25,
						  "genresId": 10749,
						  "title": "Romance"
						},
						{
						  "id": 26,
						  "genresId": 878,
						  "title": "Science Fiction"
						},
						{
						  "id": 27,
						  "genresId": 10755,
						  "title": "Short"
						},
						{
						  "id": 28,
						  "genresId": 9805,
						  "title": "Sport"
						},
						{
						  "id": 29,
						  "genresId": 10758,
						  "title": "Sporting Event"
						},
						{
						  "id": 30,
						  "genresId": 10757,
						  "title": "Sports Film"
						},
						{
						  "id": 31,
						  "genresId": 10748,
						  "title": "Suspense"
						},
						{
						  "id": 32,
						  "genresId": 10770,
						  "title": "TV movie"
						},
						{
						  "id": 33,
						  "genresId": 53,
						  "title": "Thriller"
						},
						{
						  "id": 34,
						  "genresId": 10752,
						  "title": "War"
						},
						{
						  "id": 35,
						  "genresId": 37,
						  "title": "Western"
						}
  					];
				callback(data);
		}
	};
});

myApp.factory('MoviesFactory', function($http, myCache){
	
	var mode = 'genres_move';
	//var filterPopular = '?filter=types%3D%22popular%22';
	var limitedSet = '&limit=1000'; //Most we are only ever going to get 1000 anyways
	var latestByReleaseDate = '?order=release_date%20DESC&related=group_by_mov_id';
	
	return {
		getData: function(callback){
		  $('.in-progress-bg').addClass('show');
		    //$http.get('fake-data.json')
			$http.get(urlMovies + mode + latestByReleaseDate + limitedSet + appName, {cache:true})
			.success(function(data, status, headers, config) {
				callback(data);
			})
			.error(function(data, status, headers, config) {
				alert("Error grabbing popular movies ");
			});  
		}
	};
});

myApp.factory('MovieFactory', function($http, $routeParams){
	var mode = 'genres_move',
	appName = '?app_name=grimeo';
	return {
		
		getData: function(callback){
		  $('.in-progress-bg').addClass('show');
		  
		  var $id = $routeParams.movieId;
		  $http.get(urlMovies + mode + '/'+ $id + appName)
		  .success(function(data, status, headers, config) {
		  	callback(data);
    	  })
		  .error(function(data, status, headers, config) {
		  	alert("Sorry there was an error connecting to the Database");
    	  });
		}
	};
	
});

myApp.factory('ShowsFactory', function($http, myCache){
	
	var mode = 'tv_detail';
	//var filterPopular = '?filter=types%3D%22popular%22';
	var limitedSet = '&limit=1000'; //Most we are only ever going to get 1000 anyways
	var byPopularity = '?order=popularity%20DESC';
	
	return {
		getData: function(callback){
		  $('.in-progress-bg').addClass('show');
			$http.get(urlMovies + mode + byPopularity + limitedSet + appName, {cache:true})
			.success(function(data, status, headers, config) {
				callback(data);
			})
			.error(function(data, status, headers, config) {
				alert("Error grabbing TV Shows");
			});  
		}
	};
});

myApp.factory('ShowFactory', function($http, $routeParams){
	var mode = 'tv_detail',
	appName = '?app_name=grimeo';
	return {
		
		getData: function(callback){
		  $('.in-progress-bg').addClass('show');
		  
		  var $id = $routeParams.tvId;
		  $http.get(urlMovies + mode + '/'+ $id + appName)
		  .success(function(data, status, headers, config) {
		  	callback(data);
    	  })
		  .error(function(data, status, headers, config) {
		  	alert("Error grabbing this TV Show");
    	  });
		}
	};
	
});

		
myApp.factory('TypeaheadFactory', function($http, $routeParams){
	var mode = 'genres_move',
		appName = '&app_name=grimeo';
	
	return {
		
		getData: function(tmpStr, callback){
			var clearMovie = true;
			$('.in-progress-bg').addClass('show');
			var filterTitleContains = '?filter=title%20LIKE%20%27%25' + tmpStr + '%25%27';
			$http.get(urlMovies + mode + filterTitleContains + appName)
			//$http.get('fake-data.json')
			.success(function(data, status, headers, config){
				callback(data);
			})
			.error(function(data, status, headers, config) {
				alert("Sorry there was an error connecting to the Database");
			});
		}
	};
	
});		
		
myApp.controller ('MoviesCtrl', ['$scope', 'MoviesFactory', 'GenreFactory', 'videoFactory', '$timeout', 'myCache','localStorageService','limitToFilter',
	function($scope, MoviesFactory, GenreFactory, videoFactory, $timeout, myCache, localStorageService, limitToFilter){
		
		movies = localStorageService.get('latestMovies');
		//newMovies = localStorageService.get('latestMovies');
		
		filteredMovies = []
		//console.log(filteredMovies);
				
		if(movies == null){
			MoviesFactory.getData(function(data){
				records = data.record;
				//console.log('we have no local storage');
				//There seems to be dups to
				movies = $.grep(records,function(v,k){
                	return $.inArray(v,arr) === k;
            	});
				
				paging(movies);
				localStorageService.add('latestMovies', $scope.movies);
				$('.in-progress-bg').removeClass('show');
				
			});
		}else{
			//console.log('we have local storage');
			
			// What genre has been selected
			var sltVal = null;
			$scope.$watch('showGenre', function(sltVal){
				//console.log('hit it:' + sltVal);
				//$scope.selectedGenres = null;
				$scope.selectedGenres = sltVal;
				
				if($scope.selectedGenres == null || $scope.selectedGenres == ''){
					$scope.pagedMovies = []	
					paging(movies);
					//console.log('genre is ' + $scope.selectedGenres);
				}else {
					
					filteredMovies = $.grep(movies, function(v){
						return v.genresId == sltVal;	
					});
					$scope.pagedMovies = []	
					paging(filteredMovies);	
					//console.log('genre is ' + $scope.selectedGenres);
				}
			});
			
		}	
		
		//Paging
		function paging(movies){
			//movies = limitToFilter(movies, sltVal);
			
			$scope.movies = movies,
			$scope.pagedMovies = [],
			$scope.currentPage = 1,
			$scope.numPerPage = 12,
			$scope.maxSize = 100000;
			$scope.numPages = function () {
				return Math.ceil($scope.movies.length / $scope.numPerPage);
			};
			$scope.$watch('currentPage + numPerPage', function() {
				var begin = (($scope.currentPage - 1) * $scope.numPerPage)
				, end = begin + $scope.numPerPage;
				$scope.pagedMovies = $scope.movies.slice(begin, end).reverse();
				
				//console.log($scope.pagedMovies);
				videoIds = []
				videoMode = 'movie';
				mediaName = 'trailers';
				$.each($scope.pagedMovies, function(i, obj){
						videoIds.push(obj.mov_id)
						//console.log(obj.mov_id);	
					});
				//console.log(videoIds);	
				videoFactory.checkData(videoIds, videoMode, mediaName)
			});
		};
		
		// Get Genres for drop down
		GenreFactory.getData(function(data){
			$scope.genres = [];
			$scope.genres = data;
		});
		
		$scope.imageUrlBase = imageUrlBase;
		$scope.message = 'Home - Latest Movies';	
}]);

myApp.controller('MovieCtrl',  ['$scope','MovieFactory', 'videoFactory',
 	function($scope, MovieFactory, videoFactory) {
		MovieFactory.getData(function(data){
			$('.in-progress-bg').removeClass('show');
			console.log(data);
			$scope.movie = data;
			$scope.imageUrlBase = imageUrlBase;
			$scope.backdropUrlBase = base_backdrop_url;
			
			//CHECK FOR VIDEOS
			videoIds = []
			videoMode = 'movie';
			mediaName = 'trailers';
			id = data.mov_id
			videoIds.push(id)
			videoFactory.checkData(videoIds, videoMode, mediaName)
		});
		$scope.message = 'This is the main movie page';	
}]);

myApp.controller ('ShowsCtrl', ['$scope','ShowsFactory', 'GenreFactory', 'videoFactory', '$timeout', 'myCache','localStorageService','limitToFilter',
	function($scope, ShowsFactory, GenreFactory, videoFactory, $timeout, myCache, localStorageService, limitToFilter){
		
		shows = localStorageService.get('latestShows');
		//newMovies = localStorageService.get('latestShows');
		
		filteredShows = []
		//console.log(filteredShows);
				
		if(shows == null){
			ShowsFactory.getData(function(data){
				shows = data.record;
				//console.log('we have no local storage');
				paging(shows);
				localStorageService.add('latestShows', $scope.shows);
				$('.in-progress-bg').removeClass('show');
				
			});
		}else{
			//console.log('we have local storage');
			
			// What genre has been selected
			var sltVal = null;
			$scope.$watch('showGenre', function(sltVal){
				//console.log('hit it:' + sltVal);
				//$scope.selectedGenres = null;
				$scope.selectedGenres = sltVal;
				
				if($scope.selectedGenres == null || $scope.selectedGenres == ''){
					$scope.pagedShows = []	
					paging(shows);
					//console.log('genre is ' + $scope.selectedGenres);
				}else {
					
					filteredShows = $.grep(shows, function(v){
						return v.genresId == sltVal;	
					});
					$scope.pagedShows = []	
					paging(filteredShows);	
					//console.log('genre is ' + $scope.selectedGenres);
				}
			});
			
		}	
		
		//Paging
		function paging(shows){
			//movies = limitToFilter(movies, sltVal);
			
			$scope.shows = shows,
			$scope.pagedShows = [],
			$scope.currentPage = 1,
			$scope.numPerPage = 12,
			$scope.maxSize = 1000;
			$scope.numPages = function () {
				return Math.ceil($scope.shows.length / $scope.numPerPage);
			};
			$scope.$watch('currentPage + numPerPage', function() {
				var begin = (($scope.currentPage - 1) * $scope.numPerPage)
				, end = begin + $scope.numPerPage;
				$scope.pagedShows = $scope.shows.slice(begin, end).reverse();
				
				//console.log($scope.pagedMovies);
				videoIds = []
				videoMode = 'tv';
				mediaName = 'videos';
				$.each($scope.pagedShows, function(i, obj){
						videoIds.push(obj.tv_id)
						//console.log(obj.mov_id);	
					});
				//console.log(videoIds);	
				videoFactory.checkData(videoIds, videoMode, mediaName)
			});
			//console.log('paging');	
		};
		
		// Get Genres for drop down
		GenreFactory.getData(function(data){
			$scope.genres = [];
			$scope.genres = data;
		});
		
	$scope.imageUrlBase = imageUrlBase;
	$scope.message = 'Latest TV Shows';	
}]);

myApp.controller('ShowCtrl',  ['$scope','ShowFactory','videoFactory',
 	function($scope, ShowFactory, videoFactory) {
		ShowFactory.getData(function(data){
			$('.in-progress-bg').removeClass('show');
			//console.log(data);
			$scope.show = data;
			$scope.imageUrlBase = imageUrlBase;
			$scope.backdropUrlBase = base_backdrop_url;
			
			//CHECK FOR VIDEOS
			videoIds = []
			videoMode = 'tv';
			mediaName = 'videos';
			id = data.tv_id
			videoIds.push(id)
				
			videoFactory.checkData(videoIds, videoMode, mediaName)
		});
		$scope.message = 'This is the main show page';	
		
}]);

myApp.controller ('mainController', ['$scope','MoviesFactory', 'GenreFactory', 'videoFactory', '$timeout', 'myCache','localStorageService','limitToFilter',
	function($scope, MoviesFactory, GenreFactory, videoFactory, $timeout, myCache, localStorageService, limitToFilter){
		
		movies = localStorageService.get('latestMovies');
		//newMovies = localStorageService.get('latestMovies');
		
		filteredMovies = []
		//console.log(filteredMovies);
				
		if(movies == null){
			MoviesFactory.getData(function(data){
				rawMovies = data.record;
				
				//filter out duplicates
				movies = _.uniq(rawMovies, true /* array already sorted */, function(item) {
					return item.mov_id;
				});
							
				paging(movies);
				localStorageService.add('latestMovies', $scope.movies);
				$('.in-progress-bg').removeClass('show');
				
			});
		}else{
			//console.log('we have local storage');
			
			// What genre has been selected
			var sltVal = null;
			$scope.$watch('showGenre', function(sltVal){
				//console.log('hit it:' + sltVal);
				//$scope.selectedGenres = null;
				$scope.selectedGenres = sltVal;
				
				if($scope.selectedGenres == null || $scope.selectedGenres == ''){
					$scope.pagedMovies = []	
					paging(movies);
					//console.log('genre is ' + $scope.selectedGenres);
					
				}else {
					
					filteredMovies = $.grep(movies, function(v){
						return v.genresId == sltVal;	
					});
					$scope.pagedMovies = []	
					paging(filteredMovies);	
					//console.log('genre is ' + $scope.selectedGenres);
				}
			});
			
		}	
		
		//Paging
		function paging(movies){
			//movies = limitToFilter(movies, sltVal);
			
			$scope.movies = movies,
			$scope.pagedMovies = [],
			$scope.currentPage = 1,
			$scope.numPerPage = 12,
			$scope.maxSize = 100000;
			$scope.numPages = function () {
				return Math.ceil($scope.movies.length / $scope.numPerPage);
			};
			$scope.$watch('currentPage + numPerPage', function() {
				var begin = (($scope.currentPage - 1) * $scope.numPerPage)
				, end = begin + $scope.numPerPage;
				$scope.pagedMovies = $scope.movies.slice(begin, end).reverse();
				
				//console.log($scope.pagedMovies);
				videoIds = []
				videoMode = 'movie';
				mediaName = 'trailers';
				$.each($scope.pagedMovies, function(i, obj){
						videoIds.push(obj.mov_id)
						//console.log(obj.mov_id);	
					});
				//console.log(videoIds);	
				videoFactory.checkData(videoIds, videoMode, mediaName)
			});
		};
		
		// Get Genres for drop down
		GenreFactory.getData(function(data){
			$scope.genres = [];
			$scope.genres = data;
		});
		
	$scope.imageUrlBase = imageUrlBase;
	$scope.message = 'Home - Latest Movies';	
}]);


//https://gist.github.com/bahattincinic/9671766
//Typeahead Search

myApp.controller('TypeaheadCtrl',  ['TypeaheadFactory','$scope','$http','limitToFilter','$rootScope',
 	function(TypeaheadFactory, $scope, $http, limitToFilter, $rootScope) {
		$scope.searchMovies = []
		$scope.$watch('searchStr', function(tmpStr){
			if(tmpStr != '' && tmpStr != undefined && tmpStr.length > 2){
				TypeaheadFactory.getData(tmpStr, function(data){
					$('.in-progress-bg').fadeIn();
					movies = limitToFilter(data.record, 15);
					$scope.searchMovies = movies;
					console.log($scope.searchMovies);
					$scope.imageUrlBase = imageUrlBase;
					
					$scope.backdropUrlBase = base_backdrop_url;
				});
			}else {
				$scope.searchMovies = [];
			}
			if(tmpStr != '' && tmpStr != undefined && tmpStr.length > 0){
				$rootScope.clearMovies = true;
			} else {
				$rootScope.clearMovies = false;
			}
			
		})
	$scope.searchMessage = 'Searching for:';	
}]);

myApp.controller('AboutController', function($scope) {
	$scope.message = 'About us.';
});

myApp.controller('ContactController', function($scope) {
	$scope.message = 'Contact us';
});

myApp.factory('videoFactory', ['$location', function($location){
	var url = $location.url(),
		homeUrl = '/',
		moviesUrl = '/movies/',
		tvUrl = '/tv/';
	
	return {
		checkData: function(array, videoMode, mediaName){
				setTimeout(function(){
					arrayLength = array.length;
					
					for(var i = 0; i < arrayLength; i++){
						//console.log(array[i]);
						id = array[i];
						var url = $location.url(),
							videoStatus = false,
							$videoList = $('.video-list'),
							list, 
							videoBtn;
								
						function previewUi(id){
							
								if(url == moviesUrl || url == tvUrl || url == homeUrl){
									var videoWrap = $('div[data-asset-id='+id+']');
									$.each(videoWrap, function(){
										$(this).html(videoBtn);
										$(this).addClass('preview');
										console.log('assetid'+ id +' '+ url + ' '+'add the button');	
									});
									//$('div[data-asset-id='+id+']').html(videoBtn);
									//$('div[data-asset-id='+id+']').addClass('preview');
									//console.log('assetid'+ id +' '+ url + ' '+'add the button');
								} else {
									//list = list.replace("undefined", ""); //For detail page
									$videoList.html(list).fadeIn();	
									console.log(url + ' '+'add the list');		
								}
							
						}	
					
						$.ajax({
							async: false,
							url: 'http://api.themoviedb.org/3/'+videoMode+'/'+id+'/'+mediaName+'?api_key=ba5a09dba76b1c3875e487780468ef93', 
							success: function (data) { 
								$.each(data, function(i, item) {
									//may be quicktime to check here too!
									if(videoMode != "movie") {
										console.log(i, item);
										if(i == "results"){
											da = data[i];
											$.each(da, function(j, item){
												v_id = item.id;
												v_lang = item.iso_639_1;
												v_key = item.key;
												v_name = item.name;
												v_name = v_name.replace(/\"/g, "");  
												v_type = item.type;	
												v_site = item.site;
												v_size = item.size;
												videoBtn = '<a href=\"#\" class=\"btn fn-play-video\" data-reveal-id=\"myModal\" data-video-key="'+ v_key +'" data-asset-id="'+ id +'"><i></i><b>Play Trailer</b></a>';	
												list +='<li><a href=\"#\" class=\"fn-play-video\" data-reveal-id=\"myModal\" data-video-key="'+ v_key +'">'+v_name+'</a></li>';
											});
										}
										
									}else {
										console.log(i, item);
										if (i == "youtube"){
											da = data[i];
											$.each(da, function(j, item){
												v_key = item.source;
												v_name = item.name;
												//v_name = v_name.replace(/\"/g, "");  
												v_type = item.type;	
												v_size = item.size;
												videoBtn = '<a href=\"#\" class=\"btn fn-play-video\" data-reveal-id=\"myModal\" data-video-key="'+ v_key +'" data-asset-id="'+ id +'"><i></i><b>Play Trailer</b></a>';									
												list +='<li><a href=\"#\" class=\"fn-play-video\" data-reveal-id=\"myModal\" data-video-key="'+ v_key +'">'+v_name+'</a></li>';
											});
											previewUi(id)
										}
									}
									
								}); 
								
								
								
								
							}   
						});
						
						
					}
	
				}, 2000);				
		}
	}
	
	
	
}]);
// PLAY VIDEO IN MODAL
$(document).on('click','.fn-play-video', function(e){	
	var $modal = $('.reveal-modal');
	var $videoKey = $(this).attr('data-video-key');
	var $src = '//www.youtube.com/embed/'+$videoKey;
	var $videolink = '<iframe width="560"  height="315" src="'+$src+'?autoplay=1" frameborder="0" allowfullscreen=""></iframe>';
	var $videoContainer = $('.video-container');
	$videoContainer.html($videolink);
	e.preventDefault();
});
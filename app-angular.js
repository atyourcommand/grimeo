var myApp = angular.module('myApp',['restangular', 'ui.bootstrap', 'slugifier', 'ngResource', 'LocalStorageModule' ]);

var urlBase = 'https://dsp-grimeo.cloud.dreamfactory.com:443/rest/',
	keyWebService = 'grimeo/',
	media = 'movie/',
	appName = '&app_name=grimeo',
	urlMovies = urlBase + keyWebService,
	imageUrlBase = 'http://image.tmdb.org/t/p/w92',
	base_backdrop_url = 'http://image.tmdb.org/t/p/w780';
	
// Configure our routes
myApp.config(['$routeProvider',
	function($routeProvider, RestangularProvider) {
		
		$routeProvider.

			// route for the home page
			when('/', {
				templateUrl : 'pages/home.html',
				controller  : 'mainController', 
				title: 'home'
			}).
			
			// route for a movie page
			when('/movies/', {
				templateUrl : 'pages/movies.html',
				controller  : 'ListMoviesCtrl',
				title: 'Latest Movies'
			}).
			
			// route for the movie list page
			when('/movie/:movieId/:MovieName/', {
				templateUrl : 'pages/movie.html',
				controller  : 'MovieController', 
				title: 'Movie',
				description: 'Here are the latest Movies'
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
				
					redirectTo: '/grimeo/',
					title: 'Redirect'
			})
			
}]);

//Pages work as Hash Bangs #!
myApp.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
	
//Dynamic Title Tags
myApp.controller('titleController', function($scope, $route, $log, $routeParams){
	$scope.$on('$routeChangeSuccess', function(){
		//$scope.pageTitle = '';
		
		if (! $routeParams.MovieName){
			$scope.pageTitle = $route.current.title;
		}else{
			$scope.pageTitle = deSlugify($routeParams.MovieName);	
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

// Caching
myApp.factory('myCache', function($cacheFactory) {
 return $cacheFactory('myData');
});

myApp.factory('MoviesFactory', function($http, myCache){
	
	var mode = 'movie';
	var filterPopular = '?filter=types%3D%22popular%22';
	var limitedSet = '&limit=600';
	
	return {
		getData: function(callback){
		  $('.in-progress-bg').addClass('show');
		  
			$http.get(urlMovies + mode + filterPopular + limitedSet + appName, {cache:true})
			.success(function(data, status, headers, config) {
				callback(data);
			})
			.error(function(data, status, headers, config) {
				alert("error");
			});  
		}
	};
	
});

myApp.factory('MovieFactory', function($http, $routeParams){
	var mode = 'movie',
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

		
myApp.factory('TypeaheadFactory', function($http, $routeParams){
	var mode = 'movie',
		appName = '&app_name=grimeo';
	
	return {
		
		getData: function(tmpStr, callback){
			
			$('.in-progress-bg').addClass('show');
			var filterTitleContains = '?filter=title%20LIKE%20%27%25' + tmpStr + '%25%27';
			$http.get(urlMovies + mode + filterTitleContains + appName)
			.success(function(data, status, headers, config){
				callback(data);
			})
			.error(function(data, status, headers, config) {
				alert("Sorry there was an error connecting to the Database");
			});
		}
	};
	
});		
		

myApp.controller ('ListMoviesCtrl', ['$scope','MoviesFactory', '$timeout', 'myCache','localStorageService',
	function($scope, MoviesFactory, $timeout, myCache, localStorageService){
		
		movies = localStorageService.get('latestMovies');
		if(movies == null){
			MoviesFactory.getData(function(data){
				movies = data.record;
				paging(movies);
				localStorageService.add('latestMovies',$scope.movies);
				$('.in-progress-bg').removeClass('show');
			});
			
		}else{
			paging(movies);
		}	
		
		//Paging
		function paging(movies){
			$scope.movies = movies,
			$scope.filteredMovies = [],
			$scope.currentPage = 1,
			$scope.numPerPage = 12,
			$scope.maxSize = 500;
			$scope.numPages = function () {
				return Math.ceil($scope.movies.length / $scope.numPerPage);
			};
			$scope.$watch('currentPage + numPerPage', function() {
				var begin = (($scope.currentPage - 1) * $scope.numPerPage)
				, end = begin + $scope.numPerPage;
				$scope.filteredMovies = $scope.movies.slice(begin, end);
			});	
		};	
		$scope.imageUrlBase = imageUrlBase;
		$scope.message = 'Latest Movies';	
}]);

myApp.controller('MovieController',  ['$scope','MovieFactory',
 	function($scope, MovieFactory) {
		MovieFactory.getData(function(data){
			$('.in-progress-bg').removeClass('show');
			console.log(data);
			$scope.movie = data;
			$scope.imageUrlBase = imageUrlBase;
			$scope.backdropUrlBase = base_backdrop_url;
		});
		$scope.message = 'This is the main movie page';	
	
}]);

myApp.controller ('mainController', ['$scope','MoviesFactory', '$timeout', 'myCache','localStorageService',
	function($scope, MoviesFactory, $timeout, myCache, localStorageService){
		movies = localStorageService.get('latestMovies');
		if(movies == null){
			MoviesFactory.getData(function(data){
				movies = data.record;
				paging(movies);
				localStorageService.add('latestMovies',$scope.movies);
				$('.in-progress-bg').removeClass('show');
			});
			
		}else{
			//console.log('we have local storage');
			paging(movies);
			//console.log(movies);
		}	
		
		//Paging
		function paging(movies){
			$scope.movies = movies,
			$scope.filteredMovies = [],
			$scope.currentPage = 1,
			$scope.numPerPage = 12,
			$scope.maxSize = 500;
			$scope.numPages = function () {
				return Math.ceil($scope.movies.length / $scope.numPerPage);
			};
			$scope.$watch('currentPage + numPerPage', function() {
				var begin = (($scope.currentPage - 1) * $scope.numPerPage)
				, end = begin + $scope.numPerPage;
				$scope.filteredMovies = $scope.movies.slice(begin, end);
			});	
		};	
		
	$scope.imageUrlBase = imageUrlBase;
	$scope.message = 'Home - Latest Movies';	
}]);
//https://gist.github.com/bahattincinic/9671766
//Typeahead Search
myApp.controller('TypeaheadCtrl',  ['TypeaheadFactory','$scope','$http','limitToFilter',
 	function(TypeaheadFactory, $scope, $http, limitToFilter) {
		$scope.searchMovies = []
		$scope.$watch('searchStr', function(tmpStr){
			if(tmpStr != '' && tmpStr != undefined && tmpStr.length > 2){
				TypeaheadFactory.getData(tmpStr, function(data){
					
					$('.in-progress-bg').removeClass('show');
					$scope.searchMovies = limitToFilter(data.record, 15);
					
					$scope.imageUrlBase = imageUrlBase;
					$scope.backdropUrlBase = base_backdrop_url;
					console.log($scope.searchMovies);
				});
			}else {
				$scope.searchMovies = [];
			}
		})
}]);

myApp.controller('AboutController', function($scope, Restangular) {
	$scope.message = 'About us.';
});

myApp.controller('ContactController', function($scope, Restangular) {
	$scope.message = 'Contact us';
});
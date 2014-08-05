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
			//console.log('we have local storage');
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

//Typeahead Search
myApp.controller('TypeaheadCtrl',  ['$scope','$http','limitToFilter',
 	function($scope, $http, limitToFilter) {
		var mode = 'movie',
		appName = '&app_name=grimeo';
		//var $id = $routeParams.movieId;
		//$http.get(urlMovies + mode + '/'+ $id + appName)
		
		$scope.movies = function(movieName) {
			                               //?filter=title%20LIKE%20%27%25the%25%27
										   //http://gd.geobytes.com/AutoCompleteCity?callback=JSON_CALLBACK &filter=US&q="+cityName
    		var filterTitleContains = '?callback=JSON_CALLBACK&filter=title%20LIKE%20%27%25' + movieName + '%25%27';
			
			return $http.get(urlMovies + mode + filterTitleContains + appName)
			.then(function(response){
      		return limitToFilter(response.data, 15);
    		});
  		};
	
}]);

myApp.controller('AboutController', function($scope, Restangular) {
	$scope.message = 'About us.';
});

myApp.controller('ContactController', function($scope, Restangular) {
	$scope.message = 'Contact us';
});
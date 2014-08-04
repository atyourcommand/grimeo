// Angular Pieces

var myApp = angular.module('myApp',['ngRoute', 'restangular', 'ui.bootstrap', 'slugifier']);

//var urlBase = 'http://api.themoviedb.org/3/',
var urlBase = 'https://dsp-grimeo.cloud.dreamfactory.com:443/rest/',
//var urlBase = 'http://localhost:8080/rest/',
	
	keyWebService = 'grimeo/',
	media = 'movie/',
	urlMovies = urlBase + keyWebService,
	
	imageUrlBase = 'http://image.tmdb.org/t/p/w92',
	base_backdrop_url = 'http://image.tmdb.org/t/p/w780';
	
	//mode = 'upcoming' + '&page=' + k,
	//var urlLatestMovies = urlBase + key + media + mode +'&page=' + k; 	
	//urlMovie = urlBase + media; 
	//urlWebService = 'https://dsp-grimeo.cloud.dreamfactory.com:443/rest/',
	
// configure our routes
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
				title: 'movies'
			}).
			
			// route for the movie list page
			when('/movie/:movieId/:MovieName/', {
				templateUrl : 'pages/movie.html',
				controller  : 'MovieController', 
				title: '{{title}}'
			}).

			// route for the about page
			when('/about', {
				templateUrl : 'pages/about.html',
				controller  : 'AboutController',
				title: 'about'
			}).

			// route for the contact page
			when('/contact', {
				templateUrl : 'pages/contact.html',
				controller  : 'ContactController',
				title: 'contact'
			}).
			
			otherwise({
					redirectTo: '/', 
					title: 'Grimeo'
			})
			
	}]);

//Dynamic Title Tags
myApp.run(['$location', '$rootScope', function($location, $rootScope ) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous ) {
		$rootScope.title = current.$$route.title;
    });
}]);

//Slugify filter
function MyCtrl($scope, Slug) {
    $scope.slugify = function(input) {
        $scope.mySlug = Slug.slugify(input);
    };
}

myApp.factory('MoviesFactory', function (Restangular) {
	
	Restangular.setBaseUrl(urlMovies);
	//Restangular.setDefaultRequestParams({ api_key: keyWebService });
	//Restangular.setExtraFields('movie/name');
	
	var mode = 'movie';
	var appName = '&app_name=grimeo';
	var filterPopular = '?filter=types%3D%22popular%22';
	var limitedSet = '&limit=12';
	return {
		initialData: function(){
				return Restangular.all(mode + filterPopular + limitedSet + appName).getList()
				.then(function(response) {
					
					$.each(response, function(i, item) {
							//newData = '';
							if(i == "record") {
								da = data[i];
								var newData = [];
								newData = newData.concat(da);
								return newData;
							}
						});
						console.log(newData);
				});
			}
	} 
});

myApp.controller ('ListMoviesCtrl', ['$scope','MoviesFactory',
	function($scope, MoviesFactory){
		$scope.movies = MoviesFactory.initialData();
				
		//Paging
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
		
		$scope.imageUrlBase = imageUrlBase;
		$scope.message = 'Latest Movies';
		
}]);

myApp.controller('MovieController', function($scope, Restangular, $routeParams) {
	
	Restangular.setBaseUrl(urlMovies);
	//Restangular.setDefaultRequestParams({ api_key: 'ba5a09dba76b1c3875e487780468ef93' });
	Restangular.setDefaultRequestParams({ app_name: 'grimeo' });
	$scope.imageUrlBase = imageUrlBase;
	$scope.backdropUrlBase = base_backdrop_url;
	$scope.message = 'This is the main movie page';
	var idParam = '?ids=';
	var idParamEncode = encodeURIComponent(idParam)
	var $id = $routeParams.movieId;
	Restangular.one('movie',$id).get()
		.then(function(data){
			$scope.movie = data;
			//console.log($scope.movie.title);
		});
	
});

myApp.controller('mainController', function($scope, Restangular) {
	$scope.message = 'Everyone come and see how good I look!';
});

myApp.controller('AboutController', function($scope, Restangular) {
	$scope.message = 'Look! I am an about page.';
});

myApp.controller('ContactController', function($scope, Restangular) {
	$scope.message = 'Contact us! JK. This is just a demo.';
});
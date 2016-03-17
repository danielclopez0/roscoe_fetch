angular.module('roscoeFetch',['ngRoute'])
	.config(['$routeProvider',function($routeProvider){
		$routeProvider
			.when('/test',{
				templateUrl: 'templates/pages/test/index.html'
			})
			.otherwise({redirectTo: '/'});
	}]);
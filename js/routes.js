angular.module('roscoeFetch',['ngRoute'])
	.config(['$routeProvider',function($routeProvider){
		$routeProvider
			.when('/test',{
				templateUrl: 'templates/pages/test/index.html'
			})
			.when('/status',{
				templateUrl: 'templates/pages/status/index.html',
				controller: 'campaignAggregteController'
			})
			.otherwise({redirectTo: '/'});
	}]);
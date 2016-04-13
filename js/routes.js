angular.module('roscoeFetch',['ngRoute'])
	.config(['$routeProvider',function($routeProvider){
		$routeProvider
			//Test page
			.when('/test',{
				templateUrl: 'templates/pages/test/index.html'
			})

			//Campaigns
			.when('/campaigns/:frequency?',{
				templateUrl: '/templates/pages/campaigns/index.html',
				controller: 'campaignAggregateController'
			})
			.when('/campaigns/daily/status/:status',{
				templateUrl: '/templates/pages/status/index.html',
				controller: 'campaignAggregateController'
			})

			.otherwise({redirectTo: '/'});
	}]);
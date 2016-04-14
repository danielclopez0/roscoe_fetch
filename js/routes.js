angular.module('roscoeFetch',['ngRoute','googlechart'])
	.config(['$routeProvider',function($routeProvider){
		$routeProvider
			//Homepage
			.when('/',{
				templateUrl: 'templates/home/index.html'
			})

			//Campaigns
			.when('/campaigns/:frequency/chart/',{
				templateUrl: '/templates/campaigns/chart.html',
				controller: 'campaignChartController'
			})
			.when('/campaigns/:frequency',{
				templateUrl: '/templates/campaigns/index.html',
				controller: 'campaignAggregateController'
			})

			//Test page
			.when('/test',{
				templateUrl: 'templates/test/index.html'
			})

			.otherwise({redirectTo: '/'});
	}]);
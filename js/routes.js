angular.module('roscoeFetch',['ngRoute','googlechart'])
	.config(['$routeProvider',function($routeProvider){
		$routeProvider
			//Test page
			.when('/test',{
				templateUrl: 'templates/pages/test/index.html'
			})

			//Campaigns
			.when('/campaigns/:frequency/chart/',{
				templateUrl: '/templates/pages/campaigns/chart.html',
				controller: 'campaignChartController'
			})
			.when('/campaigns/:frequency',{
				templateUrl: '/templates/pages/campaigns/index.html',
				controller: 'campaignAggregateController'
			})


			.otherwise({redirectTo: '/'});
	}]);
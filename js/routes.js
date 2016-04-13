angular.module('roscoeFetch',['ngRoute'])
	.config(['$routeProvider',function($routeProvider){
		$routeProvider
			//Test page
			.when('/test',{
				templateUrl: 'templates/pages/test/index.html'
			})

			//Campaigns
				//Daily
				.when('/campaigns/daily/status/:status',{
					templateUrl: '/templates/pages/status/index.html',
					controller: 'campaignAggregteController'
				})
				.when('/campaigns/daily/status',{
					redirectTo: '/campaigns/daily/status/RUNNING'
				})
			.otherwise({redirectTo: '/'});
	}]);
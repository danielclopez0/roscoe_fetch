angular.module("roscoeFetch")
	.controller('campaignAggregateController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
		$http.get('/api/campaigns/'+$routeParams.frequency)
			.success(function(data){
				$scope.campaignAggregates = data;
				$scope.frequency = $routeParams.frequency;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			})
	}]);
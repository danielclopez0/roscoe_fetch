angular.module("roscoeFetch")
	.controller('campaignAggregteController',['$scope','$http',function($scope,$http,$routeParams){
		$http.get('/api/campaignAggregates/')
			.success(function(data){
				$scope.campaignAggregates = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			})
	}]);
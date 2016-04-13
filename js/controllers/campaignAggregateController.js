angular.module("roscoeFetch")
	.controller('campaignAggregteController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
		$http.get('/api/campaignAggregates/daily/'+$routeParams.status)
			.success(function(data){
				$scope.campaignAggregates = data;
				console.log(data);
				console.log('params: ' + angular.toJson($routeParams));
			})
			.error(function(data){
				console.log('Error: ' + data);
			})
	}]);
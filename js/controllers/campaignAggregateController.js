angular.module("roscoeFetch")
	.controller('campaignAggregteController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
		$http.get('/api/campaignAggregates/'+$routeParams.status)
			.success(function(data){
				$scope.campaignAggregates = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			})
	}]);
angular.module("roscoeFetch")
	.controller('campaignChartController',['$scope','$http','$routeParams',function($scope,$http,$routeParams){
		$http.get('/api/campaigns/'+$routeParams.frequency+'/chart')
			.success(function(data){
				$scope.campaignAggregates = data;
				$scope.frequency = $routeParams.frequency;
				console.log(data);

				$scope.chartObject = {};
			    
			    $scope.chartObject.type = "ColumnChart";
			    
			    var chartDateArray = [];
			    $scope.chartArray = [];
			    var chartDate;
			    var chartDateIndex;
			    var chartSales;

			    for (var i = 0; i < data.length; i++) {
			    	chartDate = data[i]['forDateEndingOn'][0].substring(0,10);
			    	chartDateIndex = chartDateArray.indexOf(chartDate);
			    	chartSales = data[i]['salesTotal'];


			    	if (chartDateIndex<0) {
			    		chartDateArray.push(chartDate);
			    		$scope.chartArray.push({
				    		c: [
				    			{v: chartDate},
				    			{v: chartSales}
				    		]
				    	})
			    	} else {
				    	$scope.chartArray[chartDateIndex].c[1].v += chartSales;
			    	}

			    		
			    	
			    };

			    console.log($scope.chartArray);

			    $scope.chartObject.data = {
			    	"cols": [
			        	{id: "date", label: "Date", type: "string"},
			        	{id: "sales", label: "Sales", type: "number"}
			    	], 
			    	"rows": $scope.chartArray
			    };

			    $scope.chartObject.options = {
			        'title': 'Sales by Date'
			    };
			})
			.error(function(data){
				console.log('Error: ' + data);
			})

	}]);
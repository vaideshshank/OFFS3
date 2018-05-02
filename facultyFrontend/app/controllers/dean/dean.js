faculty.controller("deanCtrl", function($scope, $rootScope, $location, facultyService) {
	$scope.dean  = [];



	$scope.getDetails = function() {
		console.log('Get Details');
		facultyService.getDetails(function(response) {
			console.log(response);
			$scope.dean = response;
		})

	}

	$scope.checkStatus = function() {
		$location.path("/deanAnalysis");

	}

	$scope.logout = function() {
		$location.path('/')
	}

	$scope.getDetails();
})

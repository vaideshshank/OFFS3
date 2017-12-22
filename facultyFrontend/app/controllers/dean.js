faculty.controller("deanCtrl", function($scope, $rootScope, $location, facultyService) {
	$scope.dean  = [];



	$scope.getDetails = function() {
		facultyService.getDetails(function(response) {
			$scope.dean = response;
		})
	}

	$scope.checkStatus = function() {
		$location.path("/deanDashboard");
	}

	$scope.getDetails();
})

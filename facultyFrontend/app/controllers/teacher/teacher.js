faculty.controller("tCtrl", function($scope, $rootScope, $location, teacherService) {
	$scope.teacher  = [];

	$scope.getDetails = function() {
		teacherService.getDetails(function(response) {
			$scope.teacher = response;
		})
	}

	$scope.checkStatus = function() {
		$location.path("/teacherAnalysis");
	}

	$scope.getDetails();
})

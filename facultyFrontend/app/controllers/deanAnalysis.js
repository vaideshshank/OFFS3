faculty.controller("deanAnalysisCtrl", function($scope, $rootScope, $location, facultyService) {

	$scope.dean = [];






	$scope.getDetails = function() {
		facultyService.getDetails(function(response) {
			$scope.dean = response;
			console.log($scope.dean);
		})
	}

	$scope.getDetails();
})

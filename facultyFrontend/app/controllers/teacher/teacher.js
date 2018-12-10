faculty.controller("tCtrl", function($scope, $rootScope, $location, teacherService) {
	$scope.teacher  = [];



	$scope.checkStatus = function() {
		$location.path("/teacherAnalysis");
	}

	$scope.logout = function(req,res) {
	teacherService.logout(function(response) {
			
		})
		$location.path("/");
	}		

	$scope.getDetails();
})

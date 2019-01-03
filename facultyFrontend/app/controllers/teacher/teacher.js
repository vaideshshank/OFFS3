faculty.controller("tCtrl", function($scope, $rootScope, $location, teacherService) {
	$scope.teacher  = [];

    $scope.getDetails = function() {
		teacherService.getDetails(function(response) {
			$scope.teacher = response;
		})
	}
    
    $scope.upload = function() {
    	alert('photo uploaded,Refresh the page.');
    }
	

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

faculty.controller("deanCtrl", function($scope, $rootScope, $location, facultyService) {
	$scope.dean  = [];



	$scope.getDetails = function() {
		console.log('Get Details');
		facultyService.getDetails(function(response) {
			console.log(response);
			$scope.dean = response;
		})

	}
	$scope.upload = function() {
    	alert('photo uploaded,Refresh the page.');
    }

	$scope.checkStatus = function() {
		$location.path("/deanAnalysis");

	}

	$scope.logout = function(req,res) {
		facultyService.logout(function(response) {
			
		})
		$location.path("/");
	}

	$scope.getDetails();
})

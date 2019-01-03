faculty.controller("pvcCtrl", function($scope, $rootScope, $location, pvcService) {
	$scope.pvc  = [];



	$scope.getDetails = function() {
		pvcService.getDetails(function(response) {
			$scope.pvc = response;
		})
	}

	$scope.checkStatus = function() {
		$location.path("/pvcAnalysis");
	}

	$scope.logout = function(req,res) {
		pvcService.logout(function(response) {
			
		})
		$location.path("/");
	}		


	$scope.getDetails();
})

faculty.controller("deanCtrl", function($scope, $rootScope, $location, facultyService) {
	$scope.dean  = [];
	$scope.editCollege=$scope.editRoom=$scope.editDoj=$scope.editEmail=$scope.editPhone=$scope.editName=true;

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

	$scope.logout = function(req,res) {
		facultyService.logout(function(response) {		
			if(response){alert(response.message);$location.path("/");}
		})
	}

	$scope.updateDeanInfo=function(){
		
		facultyService.updateDeanInfo($scope.dean,function(resp){
			alert(resp.message);
		})
	}

	$scope.getDetails();
})

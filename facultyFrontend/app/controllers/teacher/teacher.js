faculty.controller("tCtrl", function($scope, $rootScope,$localStorage, $location, teacherService) {
	$scope.teacher  = [];
	$scope.editSchool=$scope.editName=$scope.editDoj=$scope.editEmail=$scope.editPhone=$scope.editRoom=$scope.editName=true;

  $scope.getDetails = function() {
		teacherService.getDetails(function(response) {
			$scope.teacher = response;
		})
	}

	$scope.checkStatus = function() {
		$location.path("/teacherAnalysis");
	}

	$scope.logout = function(req,res) {
	teacherService.logout(function(response) {
			
		})
		$location.path("/");
	}	
	
	$scope.updateTeacherInfo=function(){
		
		teacherService.updateTeacherInfo($scope.teacher,function(resp){
			console.log($scope.teacher);
			alert(resp.message);
		})
	}

	$scope.getDetails();
})

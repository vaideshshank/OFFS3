faculty.controller("tCtrl", function($scope, $rootScope,$localStorage, $location, teacherService) {
	$scope.teacher  = [];
	$scope.editName=$scope.editDoj=$scope.editEmail=$scope.editPhone=$scope.editRoom=$scope.editName=true;

	$scope.collegeList = [ {collegeName :"University School of Architecture and Planning",
	collegeCode : "usap"},

	{collegeName :"University School of Basic and Applied Sciences",
	collegeCode :  "usbas"},

	{collegeName :"University School of BioTechnology",
	collegeCode : "usbt"},

	{collegeName :"University School of Chemical Technology",
	collegeCode : "usct"},

	{ collegeName :"University School of Education",
	collegeCode:  "use" },

	{collegeName :"University School of Environment Management",
	collegeCode : "usem"},

	{collegeName :"University School of Humanities and Social",
	collegeCode : "ushss"},

	{collegeName :"University School of Info.,Comm. and Technology",
	collegeCode : "usict"},

	{collegeName : "University School of Law and Legal Studies",
	collegeCode :"uslls"},

	{collegeName :"University School of Mass Communication",
	collegeCode : "usmc"},

	{ collegeName :"University School of Management Studies",
	collegeCode: "usms" },
	];
	
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
		
//		$scope.teacher.date_of_joining=($scope.teacher.date_of_joining).split(' 00:00:00 ')[0];
		console.log($scope.teacher.date_of_joining);
		teacherService.updateTeacherInfo($scope.teacher,function(resp){
			console.log($scope.teacher);
			alert(resp.message);
			$location.path("/teacherDashboard");
		})
	}

	$scope.getDetails();
})

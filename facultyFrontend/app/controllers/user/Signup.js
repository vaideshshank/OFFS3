//only student data fed in local storage


faculty.controller('SignupCtrl',['$scope', '$rootScope', '$location', 'userService', 'facultyService', 'vcService', 'pvcService', 'teacherService','$localStorage','$window',function($scope, $rootScope, $location, userService, facultyService, vcService, pvcService, teacherService,$localStorage,$window) {

	$scope.user = {};
	$scope.name = "";
	$scope.disablebtn=true;

	$scope.collegeList = [ {
		collegeName : "University School of Law and Legal Studies",
		collegeCode :"uslls"},

		{ collegeName :"University School of Management Studies",
		collegeCode: "usms" },

	    { collegeName :"University School of Education",
		collegeCode:  "use" },

		{collegeName :"University School of BioTechnology",
		collegeCode : "usbt"},

		{collegeName :"University School of Chemical Technology",
		collegeCode : "usct"},

		{collegeName :"University School of Environment Management",
	    collegeCode : "usem"},

	    {collegeName :"University School of Mass Communication",
		collegeCode : "usmc"},

		{collegeName :"University School of Basic and Applied Sciences",
		collegeCode :  "usbas"},

		{collegeName :"University School of Architecture and Planning",
		collegeCode : "usap"},

		{collegeName :"University School of Humanities and Social",
		collegeCode : "ushss"},

		{collegeName :"University School of Info.,Comm. and Technology",
		collegeCode : "usict"}
	];

    $scope.userCategoryList = [
    	"student", "Dean", "VC", "Pro VC", "Teacher"
    ];

    $scope.user.category = "student";
	
  	$scope.setCollege = function(singleCollege) {
		$scope.college = singleCollege;
		$localStorage.college = singleCollege;
	}

	$scope.setUserCategory =  function(userCategory) {
		$scope.user.category = userCategory;
	}

	$scope.findSemister = function() {
		var roll = ($scope.user.rollno);
		var	year = roll.substring(roll.length -2, roll.length);
		
		$scope.user.semister = (18 - year)*2 + 1;
		if($scope.user.semester>10){$scope.user.semester="";}
		$localStorage.semester = $scope.user.semister;
		$scope.disablebtn=false;
		
		
	}

	$scope.updateSemester = function() {
		$localStorage.semester = $scope.user.semister;
		console.log($localStorage.semester);
		console.log($scope.user);
		
	}


	
	$scope.LoginUser = function() {
			
			$scope.hidebutton  = true;
			$scope.showSpinner = true;
			//console.log($scope.collegeName+"---"+$scope.user.category+"---"+$scope.user.rollno+"---"+$scope.user.email);
			var user=$scope.user;
			/*if ($scope.u="" && !$scope.user.category && !$scope.user.rollno && !$scope.user.email) {

			
			return;
			

		}*/

		
		//alert shifted down
		if(user.category==""||user.rollno==""||user.email==undefined||user.semister==null||$scope.college==undefined){
			alert("Fill all the required fields in the form");
			location.reload();
			return;
		}else{

		console.log($scope.college, $scope.user);
		
		if ($scope.user.category == "Dean") {
			
			facultyService.send_details($scope.college.collegeCode, $scope.user, function(response) {
				if (response.status == 400) {
					alert(response.message);
					
					$location.path("/");
				} else {
					$location.path("/deanDashboard");
				}
			})
		} else if ($scope.user.category == 'Teacher') {

			teacherService.send_details($scope.college.collegeCode, $scope.user, function(response) {
				if (response.status == 400) {
					alert(response.message);
					$location.path("/");
				} else  {
				
					$localStorage.teacher = response.teacher;
					console.log($localStorage.teacher);
					$location.path("/teacherDashboard")
				}
			})

		} else if($scope.user.category == "VC") {

			vcService.send_details($scope.college.collegeCode, $scope.user, function(response) {
				if (response.status == 400) {
					alert(response.message);
					$location.path("/");
				} else {

					$location.path("/vcDashboard");
				}
			})


		} else if($scope.user.category == "Pro VC") {

			pvcService.send_details($scope.college.collegeCode, $scope.user, function(response) {
				if (response.status == 400) {
					alert(response.message);
					$location.path("/");
				} else {

					$location.path("/pvcDashboard");
				}
			})
		} else {
			
			console.log($scope.user)
			userService.send_details($scope.college.collegeCode, $scope.user, function(response) {
				if (response.res == "noinfo") {
					alert("No information exists for the student in the entered college");
					location.reload();
					return;
				} else if(response.message) {
					alert(response.message);
					$location.path("/thankYouPage");
					
				}else {
					$localStorage.tablename = $scope.college.collegeCode + '_' + $scope.user.category;
					$localStorage.rollno = $scope.user.rollno;
					console.log($localStorage);
					$location.path("/verify");
				}
			})
		}
	}
	}

	$scope.verifyUser = function() {
			$scope.v1 = true;
			$scope.v2 = true;
		if (!$scope.otp) {
			return;
		}
		var tablename = $localStorage.tablename;
		var rollno = $localStorage.rollno;
		console.log($localStorage.tablename);

		userService.verifyUser($scope.otp, tablename, rollno, $localStorage.semester, function(response) {
			//console.log("RESPONSE is : "+response.status)
			
			if (response.err=="wrongpass") {
				$window.alert('User is not verified');
				$location.path('/');
			} else {
				$localStorage.userDetails = response;
				console.log($localStorage);
				$location.path("/dashboard");
			}



		})
	}
}])

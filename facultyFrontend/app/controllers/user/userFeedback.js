faculty.controller('feedbackCtrl',['$scope', '$rootScope', '$uibModal', '$log', '$document', '$location', 'userService','$localStorage',function($scope, $rootScope, $uibModal, $log, $document, $location, userService,$localStorage) {

	$scope.local=$localStorage;

	$scope.feedback;
	$scope.pointer  = 0;
	$scope.pointer2 = -1;
	$localStorage.pointer=$scope.pointer;
	$localStorage.pointer2=$scope.pointer2;
	$scope.seggregatedTeacherType = {}
	$scope.checkOccurence = 0;
	$scope.feedbackGivenByTheUser = [];
	$scope.buttonToggler = true;
	$scope.disabled = false;
	$scope.checkDisabled = false;
	$scope.disablenextattributes = false;

	$scope.teacherFeedback = [
		// Theory: {},
		// Practical: {}
	];

	$scope.attributesList = {
		theory: [
			"The teacher comes prepared for classes.",
			"The teacher is effective in communicatiing in class.",
			"The teacher makes the subject practically relevant by linking it with real life business situations.",
			"The teacher seemed enthusiastic about taking classes.",
	    	"The teaching sessions have been participative and interactive.",
	    	"The teacher's presentations have enhanced my understanding of the subject.",
			"I have enjoyed attending classes of this teacher.",
			"The teacher adequately answers questions asked in the class.",
			"Students pay attention to what the teacher teaches in class. ",
			"The teacher seems to have a command over the subjects.",
			"Teaching of the course has been well organised.",
			"The teacher seems to care whether the students have learned.",
			"Help from teacher has been readily available for questions and/or other problems/assignments outside the class.",
			"The teacher has stimulated my interest in the subject.",
			"I feel it is worth attending classes of this teacher.",
			"The teacher is regular in taking lecture classes.",
			"The teaching adequately covers all the topics listed in the syllabus.",
			"The internal assesment system and its components were made clear at the beginning if this course.",
			"The internal assesment system used by the teacher has contributed to my learning experience.",
			"Overall performance of the teacher."
			
		],
		practicals: [
			"The teacher comes prepared for classes.",
			"The teacher is effective in communicatiing in class.",
			"The teacher makes the subject practically relevant by linking it with real life business situations.",
			"The teacher seemed enthusiastic about taking classes.",
	    	"The teaching sessions have been participative and interactive.",
	    	"The teacher's presentations have enhanced my understanding of the subject.",
			"I have enjoyed attending classes of this teacher.",
			"The teacher adequately answers questions asked in the class.",
			"Students pay attention to what the teacher teaches in class. ",
			"The teacher seems to have a command over the subjects.",
			"Teaching of the course has been well organised.",
			"The teacher seems to care whether the students have learned.",
			"Help from teacher has been readily available for questions and/or other problems/assignments outside the class.",
			"The teacher has stimulated my interest in the subject.",
			"I feel it is worth attending classes of this teacher.",
			"The teacher is regular in taking lecture classes.",
			"The teaching adequately covers all the topics listed in the syllabus.",
			"The internal assesment system and its components were made clear at the beginning if this course.",
			"The internal assesment system used by the teacher has contributed to my learning experience.",
			"Overall performance of the teacher."
		]

	}
	// 
	// localStorage.clear();

	$scope.getInstructorsForFeedback = function() {

		console.log($localStorage);

		var tablename = $localStorage.tablename;
		var table=tablename.split("_");

		$scope.college_name=table[0];
		// $scope.college_name = "usap";

		$scope.email = $localStorage.userInfo.email;
		// $scope.email = "hanugautam96@gmail.com";
		// var course = "B.Arch";
		// var stream = "Section A";
		// var semester = "1";
		
		var course = $localStorage.userInfo.course;
		// localStorage.setItem("course", JSON.stringify($rootScope.userInfo.course));
		
		var stream = $localStorage.userInfo.stream;
		// localStorage.setItem("stream", JSON.stringify($rootScope.userInfo.stream));
		var semester = $localStorage.semester;
		// localStorage.setItem("semester", JSON.stringify($rootScope.semester));
		// var data = ["course", "stream", "semester"];
		// localStorage.setItem("studentInfo",JSON.stringify(data));
		console.log($localStorage);
		
		// var obj = {
		//     email: userInfo.email,
		//     course: userInfo.course,
		//     stream: userInfo.stream,
		//     semester: userInfo.semester
		// };	
		// localStorage.setItem("studentInfo",JSON.stringify(obj));
		// console.log(studentInfo);
		console.log(course, stream, semester);
		userService.getInstructorsForFeedback($scope.college_name, course, stream, semester, function(response) {
			$scope.feedback = response;

			console.log(response);

			for (var x=0;x<$scope.feedback.length;x++) {
				$scope.feedback[x].type = $scope.feedback[x].type;

			}

			var seggregatedTeacherType = _.groupBy(response, function(result) {
            		return result.type;
        	});

			console.log(seggregatedTeacherType);
        	$scope.theoryTeacher = seggregatedTeacherType.Theory;
        	$scope.practicalTeacher = seggregatedTeacherType.Practical;

        	if (!$scope.theoryTeacher) {
        		$scope.theoryTeacher = seggregatedTeacherType.theory;
        	}
        	if (!$scope.practicalTeacher) {
        		$scope.practicalTeacher = seggregatedTeacherType.practical;
        	}
        	if (!$scope.theoryTeacher) {
        		$scope.theoryTeacher = seggregatedTeacherType.THEORY;
        	}
        	if (!$scope.practicalTeacher) {
        		$scope.practicalTeacher = seggregatedTeacherType.PRACTICAL;
        	}


        	console.log($scope.theoryTeacher);
        	console.log($scope.practicalTeacher)
		})
	}
	var j=0,i=0;
	// $scope.feedbackGivenByTheUser.push($scope.feedbackGivenByTheUser);
	$scope.addFeedbackToTheoryTeacher = function(theoryTeacher, index) {
		if ($scope.feedbackGivenByTheUser[index] == null) {
			return;
		}
		// console.log("Proceed");
		if(isNaN($scope.feedbackGivenByTheUser[index])){
		alert("Invalid Feedback Entry!");
		// console.log("Compare, not a number");
		return;
		}
		
		else if($scope.feedbackGivenByTheUser[index]<1 || $scope.feedbackGivenByTheUser[index]>5 ){
			alert("Invalid Feedback Entry!");
			$scope.feedbackGivenByTheUser.splice(index,1)
			// console.log("Reached else if");
			return;
		}

		
		var foundTeacher = _.find($scope.teacherFeedback, ['feedbackId', theoryTeacher.feedback_id]);
		// var feedback = function($scope.feedbackGivenByTheUser);

		localStorage.setItem('Feedback'+j, $scope.feedbackGivenByTheUser);
				j++;
		
		// localStorage.setItem("stringFeedback[i]", JSON.stringify(feedback));
		// console.log(foundTeacher);
		if (foundTeacher) {
			if (foundTeacher.score[$scope.pointer] == null) {
				foundTeacher.score.push($scope.feedbackGivenByTheUser[index]);
				console.log("Score : "+foundTeacher.score)
				// co = JSON.parse(localStorage.getItem('stringFeedback');
			} else {
				// console.log("yaham takk aagya abh aage kaya hoga")
				foundTeacher.score[$scope.pointer] = $scope.feedbackGivenByTheUser[index];
				// console.log(foundTeacher);
			}

		} else {
			$scope.teacherFeedback.push({
				feedbackId: theoryTeacher.feedback_id,
				score: [$scope.feedbackGivenByTheUser[index]],
				type: 'Theory',
				subject_code: theoryTeacher.subject_code,
				instructor_code: theoryTeacher.instructor_code

			})
		}

		$scope.checkOccurence++;
		i++;
	}
	// localStorage.setItem("stringFeedback", JSON.stringify($scope.feedbackGivenByTheUser));
	// $scope.feedbackGivenByTheUser.push($scope.feedbackGivenByTheUser);
	$scope.addFeedbackToPracticalTeacher = function(practicalTeacher, index) {
		if ($scope.feedbackGivenByTheUser[index] == null) {
			return;
		}
		// console.log("Proceed");
		if(isNaN($scope.feedbackGivenByTheUser[index])){
		alert("Invalid Feedback Entry!");
		// console.log("compare, not a number");

		return;
		}
		else if($scope.feedbackGivenByTheUser[index]<1 && $scope.feedbackGivenByTheUser[index]>5 ){
			alert("Invalid Feedback Entry!");
			$scope.feedbackGivenByTheUser[index]=""
			// console.log("Reached else if");
			return;
		
		}

		var foundTeacher = _.find($scope.teacherFeedback, ['feedbackId', practicalTeacher.feedback_id]);
		
		
		if (foundTeacher) {
			if (foundTeacher.score[$scope.pointer2] == null) {
				foundTeacher.score.push($scope.feedbackGivenByTheUser[index]);
				// localStorage.setItem("stringFeedback", JSON.stringify($scope.feedbackGivenByTheUser));
				// const data = JSON.parse(localStorage.getItem('stringFeedback');
				console.log("Score : "+foundTeacher.score)
			} else {
				foundTeacher.score[$scope.pointer2] = $scope.feedbackGivenByTheUser[index];
			}
		} else {
			$scope.teacherFeedback.push({
				feedbackId: practicalTeacher.feedback_id,
				score: [$scope.feedbackGivenByTheUser[index]],
				type: 'Practical',
				subject_code: practicalTeacher.subject_code,
				instructor_code: practicalTeacher.instructor_code
			})
		}
		$scope.checkOccurence++;
		
		
		$scope.checkIndex = function(){
		
			for(var x=0; x<$scope.feedbackGivenByTheUser.length; x++){
				if($scope.feedbackGivenByTheUser[x]==null){
				alert("Please fill all the entries first");
				return;
				}	
			}
		}
		
		if ($scope.practicalTeacher.length <= $scope.checkOccurence) {
			$scope.buttonToggler = false;
		}

	}

	$scope.increasePointer = function() {
		$scope.pointer += 1;
		$scope.buttonToggler = true;
		$scope.checkOccurence = 0;
		for(var x=0;x<$scope.teacherFeedback.length;x++) {
			if ($scope.teacherFeedback[x].type=="Theory") {
				if(!$scope.teacherFeedback[x].score[$scope.pointer]) {
					for (var y=0;y<$scope.feedbackGivenByTheUser.length;y++ ) {
						$scope.feedbackGivenByTheUser[y] = null;
					}
				} else {
					for (var y=0;y<$scope.feedbackGivenByTheUser.length; y++ ) {
						$scope.feedbackGivenByTheUser[y] = $scope.teacherFeedback[y].score[$scope.pointer];
					}
				}
			}
		}
	}
	

	$scope.decreasePointer = function() {
		$scope.pointer -=1;
		var foundTeacher = $scope.teacherFeedback[$scope.pointer];

		for (var x=0; x<$scope.teacherFeedback.length;x++) {
			$scope.feedbackGivenByTheUser[x] = $scope.teacherFeedback[x].score[$scope.pointer];
		}
	}

	$scope.decreasePointer2 = function() {
		$scope.pointer2 -= 1;
		var foundTeacher = $scope.teacherFeedback[$scope.pointer + $scope.pointer2];

		console.log($scope.teacherFeedback);

		for (var x=0; x<$scope.teacherFeedback.length;x++) {
			if ($scope.teacherFeedback[x].type == "Practical") {
				$scope.feedbackGivenByTheUser[x] = $scope.teacherFeedback[x].score[$scope.pointer2];
			}
		}
	}

	$scope.switchPointer = function() {


		// for (var x =0;x<$scope.teacherFeedback.length;x++) {
		// 	var singleFeedbackLength = $scope.teacherFeedback[x].score.length;

		// 	console.log(singleFeedbackLength);

		// 	if (singleFeedbackLength !=15 && singleFeedbackLength !=0) {
		// 		alert('Some input fields are left missing please fill the input field!!');
		// 		//console.log("asd;lajsdlkjasdlaskd")
		// 		$scope.checkDisabled = false;
		// 		return;
		// 	}


		// }
		// for (var x=0; x< )
		console.log($scope.teacherFeedback);
		$scope.pointer2 += 1;
	}

	$scope.logout = function() {
		$location.path("/");
	}

	$scope.increasePointer2 = function() {
		$scope.pointer2 += 1;
		$scope.buttonToggler = true;
		$scope.checkOccurence = 0;

		for(var x=0;x<$scope.teacherFeedback.length;x++) {
			if ($scope.teacherFeedback[x].type=="Practical") {
				if(!$scope.teacherFeedback[x].score[$scope.pointer2]) {
					for (var y=0;y<$scope.feedbackGivenByTheUser.length;y++ ) {
						$scope.feedbackGivenByTheUser[y] = null;
					}
				} else {
					for (var y=0;y<$scope.feedbackGivenByTheUser.length; y++ ) {
						$scope.feedbackGivenByTheUser[y] = $scope.teacherFeedback[y].score[$scope.pointer2];
					}
				}
			}
		}
	}

	$scope.sendFeedbackEvaluation = function() {

	

		$scope.disabled = true;

		var object = {
			college_name: $scope.college_name,
			teacherFeedback: $scope.teacherFeedback,
			email: $scope.email,
			enrollment_no: 	$localStorage.userInfo.enrollment_no
		}

		userService.sendFeedbackForEvaluation(object, function(response) {
			$location.path('/thankYouPage');
			alert("Feedback recorded");
			console.log(response);
			$localStorage.clear();	
		})

		
	}


	$scope.getInstructorsForFeedback();

	
	
	
	
	


	$scope.open = function() {

        var modalInstance = $uibModal.open({
            templateUrl: 'app/templates/instructions.html',
            scope: $scope,
            controller: 'SaveFilterCtrl',
            size: 'sm',
            animation: 'true',
            resolve: {}
        });

        modalInstance.result.then(function (selectedItem) {
            $log.info('Modal closed at: ' + new Date());
        }, function (selectedItem) {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

}]);


faculty.controller('SaveFilterCtrl', function ($uibModal, $uibModalInstance, $scope, $window, $sce, $route, $location, $localStorage, $http, $templateCache, userService) {

    $scope.dismiss = function() {
		$uibModalInstance.dismiss();
    };

});
/*
Digital modulation*/

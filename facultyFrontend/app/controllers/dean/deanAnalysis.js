faculty.controller("deanAnalysisCtrl", function($scope, $rootScope, $location, facultyService) {

	$scope.dean = [];
	$scope.selectedYear = '2017';

	$scope.getFeedback = function() {
		console.log($rootScope);

		facultyService.getFeedback($rootScope.college.collegeCode, $scope.selectedYear, function(response) {
			$scope.deanfb = response;
			console.log($scope.deanfb);

			//get unique teachers
			$scope.teacherlist = _.chain($scope.deanfb).pluck('name').uniq().value().sort();
			$scope.subjects = _.chain($scope.deanfb).pluck('subject_name').uniq().value();
			$scope.course = _.chain($scope.deanfb).pluck('course').uniq().value();
			$scope.stream = _.chain($scope.deanfb).pluck('stream').uniq().value();
			$scope.semester = _.chain($scope.deanfb).pluck('semester').uniq().value();

			// init all selects
			$(document).ready(function () {
				$('select').material_select();
			})


		})
	}

	$scope.teacherList = function() {
		var arr = [3];
		 arr[0] = {semester: $scope.selectedSem}
		 arr[1] =  {course: $scope.selectedCourse}
		arr[2] = {stream: $scope.selectedStream}

		var teacherWithDetails = _.clone($scope.deanfb);

		for (var x =0;x<arr.length;x++) {
			var key = Object.keys(arr[x]);
			var val = key[0];
			console.log(val)
			console.log(arr[x][key[0]]);
			if (arr[x][key[0]] !=undefined){
				teacherWithDetails = _.where(teacherWithDetails, { [val]: arr[x][key[0]]  } )
			}
			 
		}

		// var teacherWithDetails = _.where($scope.deanfb, {semester:null});
		$scope.teacherlist =  _.chain(teacherWithDetails).pluck('name').uniq().value().sort();
		
		$(document).ready(function () {
			$('select').material_select();
		})
	}

	$scope.subjectLists = function() {
		var arr = [4];
		arr[0] = {semester: $scope.selectedSem}
		arr[1] = {course: $scope.selectedCourse}
		arr[2] = {stream: $scope.selectedStream}
		arr[3] = {name: $scope.selectedTeacher}

		var	subjectDetails = _.clone($scope.deanfb);

		for (var x =0;x<arr.length;x++) {
			var key = Object.keys(arr[x]);
			var val = key[0];
			if (arr[x][key[0]] !=undefined){
				subjectDetails = _.where(subjectDetails, { [val]: arr[x][key[0]]  } )
			}
			 
		}

		$scope.subjects =  _.chain(subjectDetails).pluck('subject_name').uniq().value().sort();

		$(document).ready(function () {
			$('select').material_select();
		})
	}



	$scope.streamList = function() {
		var course = $scope.selectedCourse;

		var StreamDetails = _.where($scope.deanfb, {course:course});
		$scope.stream =  _.chain(StreamDetails).pluck('stream').uniq().value().sort();
		
		$(document).ready(function () {
			$('select').material_select();
		})
	}



	// $scope.getSubjects = function() {
	// 	var teacher = 

	// }

	$scope.yearChange = function () {
		console.log('changed');
		$scope.getFeedback();
	}

	$rootScope.attributesList = {
		theory: [
			"Coverage of all the topics prescribed in the syllabus, with adequate depth and detail.",
			"Compliance with the number of teaching hours allotted and actual hours taught.",
			"Clarity of speech, pace of teaching, logical flows as well as continuity of thought and expression in lectures.",
			"Ability to explain the concepts clearly.",
	    	"Teaching methodology and the use of teaching aids (blackboard/power point presentation/OHP) adequately served your learning needs.",
	    	"Knowledge of the teacher in the subject.",
	    	"The extent of interaction students involvement students participation in discussing the subject matter.",
			"Encourages and makes you feel comfortable about asking questions. ",
			"Provides enthusiastic, clear and satisfactory response to students questions.",
			"Teacher generated enough interest and stimulated your intellectual curiosity.",
			"Teacher enhanced your capability to critically analyze and scrutinize scientific information.",
			"Stimulates and maintains interest and attention of students throughout the course.",
			"Because of the teacher you felt enthusiastic about studying the subject.",
			"How much enriched did you feel at the end of the course.",
			"Teaching helped you to develop an independent thinking/perspective about the subject."
		],
		practicals: [
			"The extent of direct supervision by the teacher throughout the practical.",
			"The theoretical basis technical considerations related to the experimental practical exercises were explained well.",
			"The experiments generated enough interest and helped in developing/strengthening your concepts.",
		    "Created sufficient opportunity for students to practice their skill.",
		    "Adequate time was devoted to interactive sessions to discuss analyze the results and clarify doubts of students.",
			"The teacher helped you build your capability to think and plan the experiments independently and analyze the results critically",
			"Encourages and makes you feel comfortable about asking questions.",
			"Provides enthusiastic, clear and satisfactory response to student s questions."
		]

	}

	$scope.updateSubjects = function () {

	}
	$scope.logout = function(req,res) {
		facultyService.logout(function(response) {
			
		})
		$location.path("/");
	}


	$scope.search  = function () {

		console.log($scope.deanfb);

		var course = $scope.selectedCourse;
		var sem = $scope.selectedSem;
		var stream = $scope.selectedStream;
		var subject = $scope.selectedSubject;
		var teacher = $scope.selectedTeacher;

		console.log(sem)
		console.log(course)
		console.log(stream)
		console.log(subject)
		console.log(teacher)
		mdict = {}
		if (teacher != null || teacher != undefined) {
				mdict['name'] = teacher
		}

		if ( course != null || course != undefined) {
			mdict['course'] = course
		}

		if ( sem != null || sem != undefined) {
			mdict['semester'] = sem
		}

		if ( stream != null || stream != undefined) {
			mdict['stream'] = stream
		}

		if ( subject != null || subject != undefined) {
			mdict['subject_name'] = subject
		}

		var final_res = _.where($scope.deanfb, mdict);

  // One Time Preprocessing

		final_res.forEach(function (val) {
			if (!_.isObject(val['at_1']) && _.isString(val['at_1'])) {


			if (val['at_15'].length!=1) {
				val.type="Theory"
			} else {
				val.type="Practical"
			}


			if(val.type=="Theory") {
				var atts = []
				for (var i = 0; i < 15; i++) {
					atts.push('at_' + (+i+1));
				}
			} else {
				var atts = []
				for (var i = 0; i < 8; i++) {
					atts.push('at_' + (+i+1));
				}
			}
		//	console.log(val)
			//console.log(atts);
				atts.forEach(function (att) {
					val[att] = val[att].split('');

					val[att].shift();

					tmp = {
						1: 0,
						2: 0,
						3: 0,
						4: 0,
						5: 0
					}
					val[att].forEach(function (v) {
						tmp[+v]++;
					});

					val[att] = tmp;
				})
			}
		});

		$scope.final_res = final_res;

	//		console.log(final_res);


	}

 $scope.getTotal = function (value) {
 	console.log(value);
 	sum = 0
 	sarr = []
 		if(value.type=='Theory') {
 			k = 15;
 			 }
 			 else {
 				k=8;

 		}

 		for (var i = 0; i < k; i++) {
 				sarr.push(value['at_' + (+i+1)]['1']*1 + value['at_' + (+i+1)]['2']*2 +
                    value['at_' + (+i+1)]['3']*3 + value['at_' + (+i+1)]['4']*4  +
                value['at_' + (+i+1)]['5']*5)
 			}

 			return sarr.reduce(function (v,a) {
 				return v+a;
 			})
 }

	$scope.getDetails = function() {
		facultyService.getDetails(function(response) {
			$scope.dean = response;
			console.log($scope.dean);
		})
	}

	$scope.getDetails();
	$scope.getFeedback();
})

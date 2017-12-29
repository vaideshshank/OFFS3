faculty.controller("vcAnalysisCtrl", function($scope, $rootScope, $location, vcService) {

	$scope.vc = [];
	$scope.viewElements = false;
	$scope.selectedYear = '2017';
	$scope.selected = {};
	$scope.progress = false;
$scope.collegeList = [ 
		{collegeName : "University School of Law and Legal Studies",
		collegeCode :"uslls"},

		{collegeName :"University School of Management Studies",
		collegeCode: "usms"},

	 {collegeName :"University School of Education",
		collegeCode:  "use"},

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

	$scope.getFeedback = function() {
	


		vcService.getFeedback($scope.selectedSchool, $scope.selectedYear, function(response) {

			$scope.viewElements = true;
			$scope.vcfb = response;
			console.log($scope.vcfb);

			//get unique teachers
			$scope.teacherlist = _.chain($scope.vcfb).pluck('name').uniq().value().sort();
			$scope.subjects = _.chain($scope.vcfb).pluck('subject_name').uniq().value();
			$scope.course = _.chain($scope.vcfb).pluck('course').uniq().value();
			$scope.stream = _.chain($scope.vcfb).pluck('stream').uniq().value();
			$scope.semester = _.chain($scope.vcfb).pluck('semester').uniq().value();

	  // init all selects
			$(document).ready(function () {
				$('select').material_select();
			})

			$scope.progress = false;

		})
	}

	$scope.yearChange = function () {
		$scope.final_res = {};
		console.log('changed');
		if($scope.selectedSchool) {
			//hide stuff
			$scope.viewElements = false;
			// show preloader
			$scope.progress = true;
			$scope.getFeedback();
		}
	}

	$scope.schoolChange = function () {
		$scope.final_res = {}
		if ($scope.selectedYear) {
			// hide it
			$scope.viewElements = false;
			// show preloader
			$scope.progress = true;
			$scope.getFeedback();
		}
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
	$scope.t = function () {
		console.log($scope.selected.Teacher);
	}
	$scope.search  = function () {

		console.log($scope.vcfb);

		var course = $scope.selected.Course;
		var sem = $scope.selected.Sem;
		var stream = $scope.selected.Stream;
		var subject = $scope.selected.Subject;
		var teacher = $scope.selected.Teacher;

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

		console.log(mdict)
		var final_res = _.where($scope.vcfb, mdict);

		console.log(final_res)
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
		vcService.getDetails(function(response) {
			$scope.vc = response;
			console.log($scope.vc);
		})
	}

	
})

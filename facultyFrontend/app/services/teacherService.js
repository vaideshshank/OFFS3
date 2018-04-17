faculty.factory('teacherService', ['$http', '$timeout', '$rootScope', function($http, $timeout, $rootScope) {
	return  {

		send_details : function(college, user, callback) {
			
			$http({
				method: "POST",
				url: BACKEND + '/tinitials',
				params: {
					college_name: college,
					ins_id: user.rollno,
					password: user.password
				}

			}).then(function(response) {
				if (callback) {
					callback(response.data);
				}
			}, function(response) {
				if (callback) {
					console.error(response.data);
					callback(response.data);
				}
			})
		},

		

		populate: function(year,callback) {
			console.log("$rootScope");
			
			console.log($rootScope);
			$http({
				method: "GET",
				url: BACKEND + "/tpopulate",
				params: {
					year:year,
					instructor_id:$rootScope.teacher.instructor_id,
					school:$rootScope.teacher.school
				}
			}).then(function(response) {
				if (callback) {
					callback(response.data);
				}
			}, function(response) {
				if (callback) {
					console.error(response.data);
					callback(response.data);
				}
			})
		},

		getTeacherfb: function(course, sem, stream, subject, year, callback) {
			$http({
				method: "GET",
				url: BACKEND + "/tdashboard",
				params: {
					course: course,
					sem: sem,
					stream: stream,
					subject: subject,
					instructor_id:$rootScope.teacher.instructor_id,
					school:$rootScope.teacher.school,
					year: year
				}
			}).then(function(response) {
				if (callback) {
					callback(response.data);
				}
			}, function(response) {
				if (callback) {
					console.error(response.data);
					callback(response.data);
				}
			})
		}
	}
}])

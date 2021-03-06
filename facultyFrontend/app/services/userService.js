faculty.factory('userService', ['$http', '$timeout', '$rootScope', function($http, $timeout, $rootScope) {
	return {
		send_details: function(collegeName, user, callback) {
		  $http({
                method: 'POST',
                url: BACKEND + '/initials',
                params: {
                    "college_name" : collegeName,
                    "enrollment_no" : user.rollno,
                    "email": user.email,
                    "type": user.category,
                    "semester": user.semister
                }

            }).then(function(response) {

                if (callback) {
                    callback(response.data);
                }
            }, function(response) {
                console.error(response);
            });
        },

        verifyUser: function(otp, tablename, enrollment_no, semester, callback) {
            $http({
                method:'POST',
                url: BACKEND + '/verify',
                params: {
                    'tablename': tablename,
                    'enrollment_no': enrollment_no,
                    'password': otp,
                    'semester': semester
                }
            }).then(function(response) {
                if (callback) {
                    callback(response.data);
                }

            }, function(response) {
                console.error(response)
                if (callback) {
                    callback(response.data);
                }
            })
        },

        getDetails: function(token , callback) {
            $http({
                method: 'GET',
                url: BACKEND + '/feedbackform',
                params: {
                    "token" : token
                }
            }).then(function(response) {
                if (callback) {
                    callback(response.data);
                }
            }, function(response) {
                console.error(response);
            })
        },

        getUser: function(enrollment_no, tablename, callback) {
            $http({
                method: 'GET',
                url: BACKEND + '/dashboard',
                params: {
                    enrollment_no: enrollment_no,
                    tablename: tablename
                }
            }).then(function(response) {
                if (callback) {
                    callback(response.data);
                }

            }, function(response) {
                console.error(response);
            })
        },

        getInstructorsForFeedback: function(college_name, course, stream, semester, callback) {
            $http({
                method: 'GET',
                url: BACKEND + '/feedbackform',
                params: {
                    college_name: college_name,
                    course: course,
                    stream: stream,
                    semester: semester
                }
            }).then(function(response) {
                if (callback) {

                    callback(response.data);

                }
            }, function(response) {
                console.error(response.data);
            })
        },

        sendFeedbackForEvaluation: function(teachersFeedback, callback) {
            $http.post(BACKEND + '/feedback',
                       teachersFeedback, {
                       headers: { 'Content-Type': 'application/json' }
            }).then(function(response) {
                if (callback) {
                    callback(response.data);
                }
            }, function(response) {
                console.error(response);
            })
        },

        getStudentStatus: function(collegeName, semester, course, stream,  callback) {
            $http({
                method: 'GET',
                url: BACKEND + '/getStudentStatus',
                params: {
                    collegeName: collegeName,
                    semester: semester,
                    course: course,
                    stream: stream
                }
            }).then(function(response) {
                if (callback) {
                    callback(response.data);
                }
            }, function(response) {
                console.error(response);
                if (callback) {
                    callback(response.data);
                }
            })
        },

        getStudentDetails: function(collegeName, semester, callback) {
            $http({
                method: 'GET',
                url: BACKEND + "/getStudentDetails",
                params: {
                    collegeName : collegeName,
                    semester: semester
                }
            }).then(function(response) {
                if (callback) {
                    if (callback) {
                        callback(response.data);
                    }
                }
            }, function(response) {
                console.error(response);
                callback(response.data);
            })
        }

	}
}])

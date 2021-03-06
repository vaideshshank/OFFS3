faculty.factory('vcService', ['$http', '$timeout', '$rootScope', function($http, $timeout, $rootScope) {
	return {
		send_details : function(college, user, callback) {
			$http({
				method: "POST",
				url: BACKEND + '/vinitials',
				params: {
					college_name: college,
					vc_id: user.rollno,
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

		getDetails: function(callback) {
			$http({
				method: "GET",
				url: BACKEND + "/vchecksession",
			}).then(function(response) {
				if (callback) {
					callback(response.data);
				}
			}, function(response) {
				if (callback) {
					console.error(response.data);
					callback(data);
				}
			})
		},

		getFeedback: function(college, year, callback) {
			$http({
				method: "GET",
				url: BACKEND + "/vdashboard",
				params: {
					year: year,
					college_name: college
				}
			}).then(function(response) {
				if (callback) {
					callback(response.data);
				}
			}, function(response) {
				if (callback) {
					console.error(response.data);
					callback(data);
				}
			})
		},
 	}
}]);

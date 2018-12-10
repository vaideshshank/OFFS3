faculty.factory('pvcService', ['$http', '$timeout', '$rootScope', function($http, $timeout, $rootScope) {
	return {
		send_details : function(college, user, callback) {
			$http({
				method: "POST",
				url: BACKEND + '/pvinitials',
				params: {
					college_name: college,
					pvc_id: user.rollno,
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
logout : function(){
		 	$http({
		 		method:"GET",
		 		url: BACKEND + "/pvclogout",
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
		getDetails: function(callback) {
			$http({
				method: "GET",
				url: BACKEND + "/pvchecksession",
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
				url: BACKEND + "/pvdashboard",
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
		}
 	}
}]);

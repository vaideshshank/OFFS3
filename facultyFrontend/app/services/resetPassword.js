faculty.factory('resetService',['$http', '$timeout', '$rootScope','$window','$location', function($http, $timeout, $rootScope,$window,$location){
	
	return {
		
		getInstructor: function(callback) {
			$http({
				method:'GET',
				url: BACKEND + '/getTeacher'
			}).then(function(response) {
				if (callback) {
					callback(response.data);
				}
			}, function(response) {
				if (callback) {
					console.error(response);
					callback(response);
				}
			})
		}


    }	
}])

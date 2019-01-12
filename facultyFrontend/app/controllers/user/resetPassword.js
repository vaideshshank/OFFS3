faculty.controller('resetPasswordCtrl',['$route','$scope', '$rootScope', '$location','resetService',function($route,$scope, $rootScope, $location, resetService){
    var data_value  = {};
    $scope.searched = false;
    $scope.check=0;
    $scope.disableReset = true;
    $scope.disableOTP=true;
    $scope.disableNewPassword = true;

    $scope.changeFlag = function(item) {
		if(!(angular.isUndefined(item.instructor_name))) {
			item.flag = 1;
			resetService.getInstructor(function(res) {
				res.forEach(function(val) {
					if(item.instructor_name == (val.name + ' ' + val.instructor_id)){
                        console.log("Check");
                        item.flag = 2;
                        $scope.disableReset = false;
						return;
					}
				})
			})
		}
	}

//Autocomplete name from database
	$scope.getInstructors = function() {     
		resetService.getInstructor(function(res) {

			res.forEach(function(val) {
                data_value[val.name + ' ' + val.instructor_id] = null;
                
				// init autocomplete
				$(document).ready(function(){
					 $('input.autocomplete').autocomplete({
						 data : data_value,
						 
                     });
                      
                 });
                 

			})
		})	
    }
    
//Verify Email    
    // $scope.getEmail = function(){
    //     if(item.falg==2){
    //         resetService.getEmail(function(res){
    //             res.forEach(function(val){
    //                 if(item.instructor_email==val.email){
    //                     $scope.disableOTP=false;
    //                     sendOTP();
    //                 }
    //             })
    //         })
    //     }
    // }
    
//Verify OTP
    // $scope.sendOTP = function(){

    //     if(instructor_otp==resetVar){
    //         resetPassword();
    //     }
    // }

//Reset Password   
    $scope.resetPassword = function(){
        //define this function to reset password
        $scope.disableNewPassword = false;
        //append new password
        
        
        alert("Password changed. Login with your new password! ")
        return;
    }





}]);
faculty.controller('resetPasswordCtrl',['$route','$scope','$http', '$rootScope', '$location','resetService',function($route,$scope, $http,$rootScope, $location, resetService){
    $scope.searched = false;
    $scope.check=0;

    $scope.disableSecondFields=true;
    /*$scope.disableReset = true;
    $scope.disableOTP=true;
    $scope.disableNewPassword = true;*/
    $scope.item={};


    // init autocomplete
    $http({
        method:"GET",
        url:BACKEND+"/getTeacher",
    })
    .then(function(res){
        //console.log(res.data);
        var data=res.data;
        $(document).ready(function(){
            console.log(data.length);
            var data_val={};

            data.forEach(function(val){
                data_val[`${val.name} - ${val.instructor_id}`]=null;
                $('input#instructor_name').autocomplete({
                    data:data_val         
                });
            })
            
        });
    },function(err){
        console.log(err);   
    })  
    
    
    $scope.changeFlag = function(info) {
		/*if(!(angular.isUndefined(item.instructor_name))) {
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
        }*/
        if(info==undefined){return};
        var infoParsed=info.split(' - ');
        $scope.item.instructor_name=infoParsed[0];
        $scope.item.instructor_id=infoParsed[1];
        $scope.info=$scope.item.instructor_name;
        console.log($scope.item);
	}

//Autocomplete name from database---autocalled
	
    
//Verify Email    
     $scope.getEmail = function(){
         console.log($scope.item);
        
         resetService.getEmail($scope.item.instructor_id,$scope.item.instructor_email,(res,err)=>{
            if(err){console.log(err);return;}
            console.log(res);
            
            if(res.data.response=='sentMail'){
                alert("Email for OTP send to "+$scope.item.instructor_email);
                //$scope.disableOTP=false;
                $scope.disableSecondFields=false;
            }
         })
         
        
     }
    
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
        console.log($scope.item);
        resetService.resetPassword($scope.item.instructor_otp,$scope.item.instructor_newPassword,$scope.item.instructor_email,function(res,err){
            if(err){console.log(err);return;}
            if(res.data.response=="reset"){
                alert("Password set");
            }
        })
        
        
        return;
    }





}]);
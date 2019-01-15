faculty.controller('resetPasswordCtrl' ,['$route','$scope','$http', '$rootScope', '$location','resetService',function($route,$scope, $http,$rootScope, $location, resetService){
    $scope.check=0;

    $scope.disableSecondFields = true;
    $scope.disableSentEmail = false;
    $scope.item={};

    // init autocomplete
    $http({
        method:"GET",
        url:BACKEND+"/getTeacher",
    })
    .then(function(res){
        var data=res.data;
        $(document).ready(function(){
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
        if(info==undefined){return};
        var infoParsed = info.split(' - ');
        $scope.item.instructor_name = infoParsed[0];
        $scope.item.instructor_id = infoParsed[1];
        $scope.info = $scope.item.instructor_name;
	}
    
//Verify Email    
     $scope.getEmail = function(item){
        $scope.disableSentEmail = true;
         resetService.getEmail(item.instructor_id,item.instructor_email,(res,err)=>{
            if(err){console.log(err);return;}
            
            if(res.data.response=='wrongId') {
                alert("Wrong email id entered. Please try again");
                location.reload();
            }

            else if(res.data.response=='sentMail'){
                alert("OTP send to " + item.instructor_email);
                $scope.disableSecondFields = false;
            }
            else {
                alert("Server Failure. Please try again");
                location.reload();
            }
         })
         
        
     }

//Reset Password   
    $scope.resetPassword = function(item){
        $scope.disableNewPassword = false;
        //append new password
        console.log(item);
        resetService.resetPassword(item.instructor_otp,item.instructor_newPassword,item.instructor_email,function(res,err){
            if(err){console.log(err);return;}

            if(res.data.response=="reset"){
                alert("Password changed successfully");
                $location.path("/")
            }

            else if(res.data.response=='expire') {
                alert("OTP has expired. Please try again");
                location.reload();
            }

            else if(res.data.response=='wrongOTP') {
                alert("Wrong OTP. Please try again");
                item.instructor_otp = "";
            }

            else {
                alert("Server Failure. Please try again");
                location.reload();
            }
            
        })
        
        
        return;
    }





}]);
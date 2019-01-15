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
        if(info==undefined){return};
        var infoParsed = info.split(' - ');
        $scope.item.instructor_name = infoParsed[0];
        $scope.item.instructor_id = infoParsed[1];
        $scope.info = $scope.item.instructor_name;
	}

//Autocomplete name from database---autocalled
	
    
//Verify Email    
     $scope.getEmail = function(item){
         console.log(item);
        
         resetService.getEmail(item.instructor_id,item.instructor_email,(res,err)=>{
            if(err){console.log(err);return;}
            console.log(res);
            
            if(res.data.response=='sentMail'){
                alert("Email for OTP send to " + item.instructor_email);
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
    $scope.resetPassword = function(item){
        //define this function to reset password
        $scope.disableNewPassword = false;
        //append new password
        console.log(item);
        resetService.resetPassword(item.instructor_otp,item.instructor_newPassword,item.instructor_email,function(res,err){
            if(err){console.log(err);return;}
            if(res.data.response=="reset"){
                alert("Password set");
            }
        })
        
        
        return;
    }





}]);
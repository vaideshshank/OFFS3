faculty.controller('resetPasswordCtrl' ,['$route','$scope','$http', '$rootScope', '$location','resetService',function($route,$scope, $http,$rootScope, $location, resetService){
    $scope.check=0; 
    $scope.disableGif1=true;
    $scope.disableGif2=true;
    $scope.secondSect=false;

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
        $scope.user.name = infoParsed[0];
        $scope.item.instructor_id = infoParsed[1];
       
	}
    
//Verify Email    
     $scope.getEmail = function(item){
       // $scope.disableSentEmail = true;
         $scope.disableGif1=false;
         resetService.getEmail(item.instructor_id,item.instructor_email,(res,err)=>{
            if(err){console.log(err);return;}
            
            if(res.data.response=='wrongId') {
                alert("Wrong email id entered. Please try again");
                //$scope.disableSentEmail = false;
                $scope.disableGif1=true;
                item.instructor_email = "";
            }

            else if(res.data.response=='sentMail'){
                $scope.disableGif1=true;
                $scope.secondSect=true;
                alert("OTP send to " + item.instructor_email);
            }
            else {
                $scope.disableGif1=true;
                alert("Server Failure. Please try again");
                location.reload();
            }
         })
         
        
     }

//Reset Password   
    $scope.resetPassword = function(item){
        //$scope.disableNewPassword = false;
        //append new password
        $scope.disableGif2=false;
        console.log(item);
        resetService.resetPassword(item.instructor_otp,item.instructor_newPassword,item.instructor_email,function(res,err){
            if(err){console.log(err);return;}

            if(res.data.response=="reset"){
                $scope.disableGif2=true;
                alert("Password changed successfully");
                $location.path("/")
            }

            else if(res.data.response=='expire') {
                $scope.disableGif2=true;
                alert("OTP has expired. Please try again");
                location.reload();
            }

            else if(res.data.response=='wrongOTP') {
                $scope.disableGif2=true;
                alert("Wrong OTP. Please try again");
                item.instructor_otp = "";
            }

            else {
                $scope.disableGif2=true;
                alert("Server Failure. Please try again");
                location.reload();
            }  
        })
        return;
    }
}]);
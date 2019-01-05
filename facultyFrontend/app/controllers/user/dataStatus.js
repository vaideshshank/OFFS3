faculty.controller('dataStatusCtrl',['$http','$scope','dataPortalService', 'dataStatusService', '$location','$window',function($http, $scope, dataPortalService, dataStatusService, $location, $window){

        $scope.collegeList = [ {
            collegeName : "University School of Law and Legal Studies",
            collegeCode :"uslls"},
    
            { collegeName :"University School of Management Studies",
            collegeCode: "usms" },
    
            { collegeName :"University School of Education",
            collegeCode:  "use" },
    
            {collegeName :"University School of BioTechnology",
            collegeCode : "usbt"},
    
            {collegeName :"University School of Chemical Technology",
            collegeCode : "usct"},
    
            {collegeName :"University School of Environment Management",
            collegeCode : "usem"},
    
            {collegeName :"University School of Mass Communication",
            collegeCode : "usmc"},
    
            {collegeName :"University School of Basic and Applied Sciences",
            collegeCode :  "usbas"},
    
            {collegeName :"University School of Architecture and Planning",
            collegeCode : "usap"},
    
            {collegeName :"University School of Humanities and Social",
            collegeCode : "ushss"},
    
            {collegeName :"University School of Info.,Comm. and Technology",
            collegeCode : "usict"}
        ];
    
        $scope.courseList = [];
    
        $scope.searchedSubjectData = false;

        $scope.selectedData = null;

        $scope.key = 0;

        $scope.stream = [];
        var data_value  = {};

        $scope.collegeSelected = function() {
            if (!$scope.selectedCollege) {
                return;
            }
    
            var college = $scope.selectedCollege;
            var collegeCode = "";
    
            var CollegeCodes = _.where($scope.collegeList, { collegeName: college });
            _.forEach($scope.collegeList, function(value, key) {
    
                if ((value.collegeName) == (college)) {
                    $scope.collegeCode = value.collegeCode;
                 }
    
            })
    
            if ($scope.collegeCode) {
                dataPortalService.getCourse($scope.collegeCode, function(responce) {
                    if (responce) {
                        $scope.courseList = responce;
                    $(document).ready(function () {
                        $('select').material_select();
                    })
    
                    }
                })
    
            }
        }
    
        $scope.courseSelected = function() {
            if (!$scope.selectedCourse || !$scope.selectedCollege) {
                return;
            }
            if ($scope.collegeCode && $scope.selectedCourse) {
                dataPortalService.getStream($scope.collegeCode, $scope.selectedCourse, function(responce) {
                    if (responce) {
                        $scope.streamList = responce;
                        $(document).ready(function () {
                            $('select').material_select();
                        })
                    }
                })
                $scope.key = 1;
            }
        }

        $scope.streamSelected = function() {
            if (!$scope.selectedCollege || !$scope.selectedCourse || !$scope.selectedStream) {
                return;
            }
            $scope.key = 2;
        }

        $scope.semSelected = function() {
            if (!$scope.selectedCollege || !$scope.selectedCourse || !$scope.selectedStream || !$scope.selectedSem) {
                return;
            }
            $scope.key = 3;
        }

        $scope.searchSubjectDataStatus = function() {
            $scope.searchedSubjectData = true;
            if($scope.key == 0) {
                dataStatusService.getSubjectDataStatus($scope.collegeCode, function(response) {
                    if (response == "400") {
                        alert("something wrong happened")
                        $location.path("/dataStatus");  
                    }
                    else {
                        $scope.selectedData = response;
                        for(var i=0; i<$scope.selectedData.data.length; ++i) {
                            $scope.selectedData.data[i].flag = 0;
                        }
                        for(var i=0; i<$scope.selectedData.noData.length; ++i) {
                            $scope.selectedData.noData[i].flag = 1;
                        }
                    }
                })
            }
            else if($scope.key == 1) {
                dataStatusService.getSubjectDataStatusByCourse($scope.collegeCode, $scope.selectedCourse, function(response) {
                    console.log(response);
                    if (response == "400") {
                        alert("something wrong happened")
                        $location.path("/dataStatus");   
                    }
                    else {
                        $scope.selectedData = response;
                        for(var i=0; i<$scope.selectedData.data.length; ++i) {
                            $scope.selectedData.data[i].flag = 0;
                        }
                        for(var i=0; i<$scope.selectedData.noData.length; ++i) {
                            $scope.selectedData.noData[i].flag = 1;
                        }
                    }
                })
            }
            else if($scope.key == 2) {
                dataStatusService.getSubjectDataStatusByStream($scope.collegeCode, $scope.selectedCourse, $scope.selectedStream, function(response) {
                    console.log(response);
                    if (response == "400") {
                        alert("something wrong happened")
                        $location.path("/dataStatus");   
                    }
                    else {
                        $scope.selectedData = response;
                        for(var i=0; i<$scope.selectedData.data.length; ++i) {
                            $scope.selectedData.data[i].flag = 0;
                        }
                        for(var i=0; i<$scope.selectedData.noData.length; ++i) {
                            $scope.selectedData.noData[i].flag = 1;
                        }
                    }
                })
            }
            else if($scope.key == 3) {
                dataStatusService.getSubjectDataStatusBySemester($scope.collegeCode, $scope.selectedCourse, $scope.selectedStream, $scope.selectedSem, function(response) {
                    console.log(response);
                    if (response == "400") {
                        alert("something wrong happened")
                        $location.path("/dataStatus");   
                    }
                    else {
                        $scope.selectedData = response;
                        for(var i=0; i<$scope.selectedData.data.length; ++i) {
                            $scope.selectedData.data[i].flag = 0;
                        }
                        for(var i=0; i<$scope.selectedData.noData.length; ++i) {
                            $scope.selectedData.noData[i].flag = 1;
                        }
                    }
                })
            }
        }
    }])

faculty.controller('dataStatusCtrl',['$http','$scope','dataPortalService','studentDataService','$location','$window',function($http, $scope, dataPortalService, studentDataService, $location, $window){
    $scope.data=[];
    $scope.collegeList = [{
        collegeName: "University School of Law and Legal Studies",
        collegeCode: "uslls"
    },

    {
        collegeName: "University School of Management Studies",
        collegeCode: "usms"
    },

    {
        collegeName: "University School of Education",
        collegeCode: "use"
    },

    {
        collegeName: "University School of BioTechnology",
        collegeCode: "usbt"
    },

    {
        collegeName: "University School of Chemical Technology",
        collegeCode: "usct"
    },

    {
        collegeName: "University School of Environment Management",
        collegeCode: "usem"
    },

    {
        collegeName: "University School of Mass Communication",
        collegeCode: "usmc"
    },

    {
        collegeName: "University School of Basic and Applied Sciences",
        collegeCode: "usbas"
    },

    {
        collegeName: "University School of Architecture and Planning",
        collegeCode: "usap"
    },

    {
        collegeName: "University School of Humanities and Social",
        collegeCode: "ushss"
    },

    {
        collegeName: "University School of Info.,Comm. and Technology",
        collegeCode: "usict"
    }
];

$scope.searched = false;

$scope.collegeSelected = function() {
    if (!$scope.selectedCollege) {
        return;
    }

    var college = $scope.selectedCollege;
    var collegeCode = "";

    var CollegeCodes = _.where($scope.collegeList, {
        collegeName: college
    });
    _.forEach($scope.collegeList, function (value, key) {

        if ((value.collegeName) == (college)) {
            $scope.collegeCode = value.collegeCode;
        }

    })













}])
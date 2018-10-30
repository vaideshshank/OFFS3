faculty.controller('studentDataCtrl', function ($http, $scope, dataPortalService, studentDataService, $location) {

	$scope.disabled = false;
	$scope.data = [];
	$scope.selectedYear = 2018;

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

	$scope.isHome = true;
	$scope.isEdit = false;
	$scope.isAdd = false;

	//$scope.table = retrieve();
	$scope.table = buildTable();
	$scope.date = new Date();

	$scope.courseList = [];
	$scope.stream = [];

	$scope.collegeSelected = function () {
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

		if ($scope.collegeCode) {
			dataPortalService.getCourse($scope.collegeCode, function (responce) {
				if (responce) {
					$scope.courseList = responce;

					$(document).ready(function () {
						$('select').material_select();
					})

				}
			})

		}
	}

	$scope.courseSelected = function () {
		if (!$scope.selectedCourse || !$scope.selectedCollege) {
			return;
		}

		if ($scope.collegeCode && $scope.selectedCourse) {
			dataPortalService.getStream($scope.collegeCode, $scope.selectedCourse, function (responce) {
				if (responce) {
					$scope.streamList = responce;
					$(document).ready(function () {
						$('select').material_select();
					})
				}
			})
		}
	}

	$scope.streamSelected = function () {
		if (!$scope.selectedCollege || !$scope.selectedCourse || !$scope.selectedStream) {
			return;
		}
	}

	$scope.submit = function () {
		if ($scope.data.length == 0) {
			alert("student list is empty");
			return;
		}

		if (!checkData()) {
			alert('some fields are missing');
			return;
		}

		studentDataService.sendData($scope.collegeCode, $scope.selectedCourse, $scope.selectedStream, $scope.selectedYear, $scope.data, function (res) {
			if (res.data) {
				if (res.data.status == 200) {
					alert(res.data.message);
					$location.path("/");
				} else {
					alert(res.data.message);
					$location.path("/studentData");
				}
			}
		})
	}

	// $scope.removeRow = function ($index) {
	// 	if ($index > -1 && $scope.table.rows.length > 1) {
	// 		$scope.table.rows.splice($index, 1);
	// 	}
	// };

	$scope.editRows = function () {
		$scope.isHome = false;
		$scope.isEdit = true;
		$scope.isAdd = false;
	};

	$scope.done = function () {
		$scope.isHome = true;
		$scope.isEdit = false;
		$scope.isAdd = false;
	};


	$scope.addRollNumber = function(studentData, enrollment_no) {
		if (!enrollment_no) {
			return;
		}

		studentData.enrollment_no = enrollment_no;
	}

	$scope.addName = function(studentData, name) {
		if (!name) {
			return;
		}

		studentData.name = name;
	}

	$scope.addEmail = function(studentData, email) {
		if (!email) {
			return;
		}


		studentData.email = email;
	}

	$scope.removeRow = function(studentData) {
		console.log(studentData);
		$scope.data = _.without($scope.data, _.findWhere($scope.data, {

		  enrollment_no: studentData.enrollment_no
		}));
	}

	$scope.addphone = function(studentData, phone) {
		if (!phone) {
			return;
		}

		studentData.phone = phone;
	}

	$scope.length = 0;
	$scope.data   = [];
	$scope.addRow = function (enrollment_no, name, email, phone, password) {

		// $scope.isHome = false;
		// $scope.isEdit = false;
		// $scope.isAdd = true;
		var insertedData = {};
		insertedData.enrollment_no = enrollment_no;
		insertedData.name = name;
		insertedData.email =  email;
		insertedData.phone = phone;
		insertedData.password = password;
		insertedData.index = $scope.length;

		$scope.data.push(insertedData);
		console.log($scope.data);
		$scope.length++;


		var row = {
				cells: []
			},
		colLen = $scope.table.columns.length;

		for (var i = 0; i < colLen; i++) {
			row.cells.push({
				value: ''
			});
		}
		$scope.table.rows.push(row);
	};

	function retrieve () {

		$scope.disabled = true;

		dataPortalService.getData($scope.collegeCode, $scope.selectedYear, function (res) {
			if (res.data) {
				if (res.data.status == 200) {
					//assign it to the table object
					$location.path("/");
				} else {
					alert(res.data.message);
					$location.path("/studentData");
				}
			}

		})

		return {
			columns: [{
					value: 'Enrollment No.'
				},
				{
					value: 'Name'
				},
				{
					value: 'Email'
				},
				{
					value: 'Phone'
				}],
			rows: [{
				cells: [{
					value: ''
				}, {
					value: ''
				}, {
					value: ''
				}, {
					value: ''
				}]
			}]
		};
	}

	function buildTable () {
		return {
			columns: [{
					value: 'Enrollment No.'
				},
				{
					value: 'Name'
				},
				{
					value: 'Email'
				},
				{
					value: 'Phone'
				}],
			rows: [{
				cells: [{
					value: ''
				}, {
					value: ''
				}, {
					value: ''
				}, {
					value: ''
				}]
			}]
		};
	}

	function checkData() {

		if (!$scope.collegeCode || !$scope.selectedCourse || !$scope.selectedStream || !$scope.selectedYear) {
			alert("please select dropdowns correctly");
		}

		// $scope.collegeCode, $scope.selectedCourse, $scope.selectedStream, $scope.selectedYear,
		for (var x = 0;x<$scope.data.length;x++) {
			if (!$scope.data[x].enrollment_no || !$scope.data[x].name || !$scope.data[x].email || !$scope.data[x].phone) {
				return false;
			}
		}

		return true;
	}

})
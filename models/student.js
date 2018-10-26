var db = require('./mysql');

module.exports=  {

	checkLogin: function(college_name, year, semester, enrollment_no, callback) {


		var student_table = college_name + '_student_' + year;
		var enrollment_no = Number(req.query.enrollment_no);
        var query = 'select s_? from ?? where enrollment_no = ?';

		con.query(query,[semester, student_table, enrollment_no],function(err, rows) {
         	if (err) {
         		console.log(err);
         		throw err;
         	}

         	callback(null, rows);
        })
	},

	login: function(tablename, password, email, enrollment_no, callback) {
        var query  = 'update ?? set password = ?, email= ? where enrollment_no= ?';

        con.query(query,[tablename, password, email, enrollment_no], function(err, rows) {
        	if (err) {
        		console.log(err);
        		throw err;
        	}

        	callback(null, rows);
         })
	},

	getInformation: function(tablename, enrollment_no, callback) {
	  	var query = ' select * from ?? where enrollment_no = ?';

		con.query(query,[tablename, enrollment_no], function(err, rows) {
		  	if (err) {
		  		console.log(err);
		  		throw err;
		  	}

	  		callback(null, rows);
	  	})
	},

	editDetails: function(tablename, phone, enrollment_no, callback) {
		var query = 'update  ?? set phone = ? where enrollment_no = ?';

		con.query(query,[tablename, phone, enrollment_no], function(err, rows) {
			if (err) {
				console.log(err);
				throw err;
			}

			callback(null, rows);
		})
	},

	getFeedbackInfo: function(tablename1, tablename2, tablename3, course, stream, semester, callback) {
		var query = 'select s.feedback_id,s.batch_id,s.subject_code,s.instructor_code, ' +
                    's.subject_name,s.type,b.course,b.stream,b.semester,t.name as teacher '+
                	'from ?? as s ' +
                	'inner join ?? as b on s.batch_id = b.batch_id ' +
                	'inner join ?? as t on t.instructor_id = s.instructor_code ' +
                	'where b.course=? and b.stream =? and b.semester = ?';

        con.query(query,[tablename1, tablename2, tablename3, course, stream, semester], function(err,result) {
   			if (err) {
   				console.log(err);
   				throw err;
   			}

   			callback(null, rows);
        })
    },

    dumpInsert: function(result, dumptable, enrollment_no, subject_code, instructor_code, callback) {
        var query =   'insert into ?? (enrollment_no,subject_code,instructor_id,attribute_1,attribute_2,'+
          'attribute_3,attribute_4,attribute_5,attribute_6,attribute_7,attribute_8) '+
          'values ( ? , ? , ? ,'+
           result[0]+','+ result[1]+','+ result[2]+','+ result[3]+','+result[4] +','+result[5] +
          ','+ result[6]+','+result[7] + ')';

		con.query(query,[dumptable, enrollment_no, feedback.subject_code,feedback.instructor_code.toString()],function(err, rows) {
			if (err) {
				console.log(err);
				throw err;
			}

			callback(null, rows);
		})

    },

	markStudentEntry: function(table, semester, enrollment_no, callback) {
		var query = 'update ?? set s_? = 1 where enrollment_no = ?';

		con.query(query, [table, semester, enrollment_no], function(err, rows) {
			if (err) {
				console.log(err);
				throw err;
			}

			callback(null, rows);
		})
    }


}


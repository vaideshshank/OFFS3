var con = require('../../models/mysql'),
	ses = require('node-ses'),
	async = require('async'),
	controller = require('../../models/config'),
	nodemailer = require('nodemailer');

module.exports = {
	getEmployees : function(req,res){
	var query = 'select * from employee';
	con.query(query,function(err,Employees){
		if(err){
			console.log(err);
		}
		else{
			res.send(Employees);
		}
	})
	},
	createFeedback:function(req,res){
		console.log(req.body);
		var details =req.body;
		console.log(details);
		var school=details.school;
		var course=details.course;
		var stream=details.stream;
		var semester=details.semester;
		var teacherId=details.teacherId;
		var subjectId=details.subjectId;;
		var subjectName = details.subjectName;
		var type=details.type;
		var subjectAllocationTable = school+'_subject_allocation_2017';
		var batchAllocatiomTable=school+'_batch_allocation';
		var feedbackTable=school+'_feedback_2017';
		var getBatch='select batch_id from ' + batchAllocatiomTable + ' where course=? and stream=? and semester = ?';
		var insertSA = 'INSERT INTO '+subjectAllocationTable+
					  ' (`feedback_id`, `batch_id`,`subject_code`, `instructor_code`, `subject_name`, `type`) VALUES'+
					  ' (NULL, ?, ?, ?, ?, ? );';
		var insertF = 'INSERT INTO '+ feedbackTable+' (`feedback_id`, `instructor_id`, `subject_code`, `type`, `total`, `at_1`, `at_2`, `at_3`, `at_4`, `at_5`, `at_6`, `at_7`, `at_8`, `at_9`, `at_10`, `at_11`, `at_12`, `at_13`, `at_14`, `at_15`, `no_of_students_evaluated`) VALUES (?, "","","",0,"0","0","0","0","0","0","0","0","0","0","0","0","0","0","0",0)';
		
		con.query(getBatch,[course,stream,semester],function(err,batchId){
			if(err){
				console.log(err);
			}
			else{
				console.log(batchId);
				con.query(insertSA,[batchId[0].batch_id,subjectId,teacherId,subjectName,type],function(err,result){
						if(err){
							console.log(err);
						}
						else{
							console.log(result.insertId);
							con.query(insertF,result.insertId,function(err,result){
								if(err){
									console.log(err);
								}
								else{
									console.log(result);
								}
							})	

						}
				})
						
			}
		})
	}


	}
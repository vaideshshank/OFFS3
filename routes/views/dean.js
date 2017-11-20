var con 	   = require("../../models/mysql"),
 	ses        =   require('node-ses'),
 	async      =  require('async'),
 	controller = require("../../models/config"),
    nodemailer = require('nodemailer');

module.exports = {

	index: function (req, res) {

	},

	initials: function(req,res) {

		var college_name = req.query.college_name.college_code;
		var dean_id 	 = req.query.dean_id;
		var password	 = req.query.password;
		var query 		 = 'select * from '+ college_name + '_dean where instructor_id = ? and password = ?';

	    if(college_name != null && dean_id != null && password != null) {		//Check For all fields
			con.query(query,[dean_id,password],function(error,result) {

			if(error) {
				console.log(error);
				var obj = { status:400 , message :"There is error in query!"};
				res.json(obj);

			} else if(result[0] == null) {
				console.log("No Dean Found");
				var obj = { status:400 , message :"No Mr./Mrs. Dean Found ! ."};
				res.json(obj);  		// Invalid Password or username

			} else {
				console.log(result[0]);
				req.session.dean = result[0];
				req.session.dean.college_name = req.query.college_name;
				console.log(req.session.dean);
				var obj = { status:200 , message :"Dean authentication Successfull"};
				res.json(obj);  	 //Successfull
			}

		})}	else {
			console.log("Not All Fields Set")
			var obj = { status:400 , message :"Not All Fields Set"};
			res.json(obj);
		}
	},

	checksession : function(req,res) {
		/*  This route is just to check if sessions are working .
			Hit this url once you have logged in.	*/
			if(req.session.dean) {
				console.log(req.session.dean);
				res.json(req.session.dean);
			}

			else
			{
				console.log("No session detected");
				var obj = {status:200,message:"No session detected"} ;
			}
	},

	dashboard	: function(req,res) {
		/* I will require req.query.year as 2016 or 2017 and req.query.semester as 1 for (odd) or 0(even) and
		    req.query.college_name
		   I will send a bulky object check it yourself
		   And yet I have not included session authentication ,so that you can hit it without login
		   Erase this after you understand !

		*/
		var year = req.query.year;
		var semester = Number(req.query.semester);
		var college_name  =req.session.college_name;

		if(year==null||semester==null||college_name==null) {
			console.log("Not All Fields Set")
			var obj = { status:400 , message :"Not All Fields Set"};
			res.json(obj);
		}
		else
		{   var tables = {
			       batch_allocation    :college_name + '_batch_allocation',
				   subject_allocation :college_name + '_subject_allocation_' + year,
				   feedback		   	  :college_name + '_feedback_'          + year,
		   		   employee			  :'employee'
		   	}

		   	console.log(tables);
			var query =	' select * from '+ tables.subject_allocation+' as s  ' +
					   	' inner join  '+ tables.batch_allocation+' as b on s.batch_id = b.batch_id ' +
					   	' inner join  '+ tables.employee+' as e on s.instructor_code =e.instructor_id '+
					   	' inner join  '+ tables.feedback+' as f on s.feedback_id = f.feedback_id '+
					   	' where MOD(b.semester,2) = '+ semester+'   ' ;
					   	console.log(query);
		    con.query(query,function(error,result){
		    	if(error) {
					console.log(error);
					var obj = { status:400 , message :"There is error in query!"};
					res.json(obj);       // Connection Error
				}
				else if(result[0]==null){
					console.log("No Dean Found");
					var obj = { status:400 , message :"No Mr./Mrs. Dean Found ! ."};
					res.json(obj);  		// Invalid Password or username
				}
				else{
					console.log("Data fetched");
					console.log(result);
					res.json(result);

				}
		    })
		}
	}
}

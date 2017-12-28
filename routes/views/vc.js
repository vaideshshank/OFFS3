var con 	   = require("../../models/mysql"),
 	ses        =   require('node-ses'),
 	async      =  require('async'),
 	controller = require("../../models/config"),
    nodemailer = require('nodemailer');

module.exports = {

	index: function (req, res) {

	},

	initials: function(req,res) {
		console.log('vc initials');
		console.log(req.query);
		var college_name = req.query.college_name;
		var vc_id 	 = req.query.vc_id;
		var password	 = req.query.password;
		var query 		 = 'select * from '+ 'vc where instructor_id = ? and password = ?';
		console.log(college_name, vc_id, password);
	    if(college_name != null && vc_id != null && password != null) {		//Check For all fields
			con.query(query,[vc_id,password],function(error,result) {
				console.log(result);
			if(error) {
				console.log(error);
				var obj = { status:400 , message :"There is error in query!"};
				res.json(obj);

			} else if(result[0] == null) {
				var obj = { status:400 , message :"No Such User Found ! ."};
				res.json(obj);  		// Invalid Password or username

			} else {
				console.log(result[0]);
				req.session.vc = result[0];
				req.session.vc.college_name = req.query.college_name;
				console.log(req.session.vc);
				var obj = { status:200 , message :"VC authentication Successfull"};
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
			if(req.session.vc) {
				console.log(req.session.vc);
				res.json(req.session.vc);
			}

			else
			{
				console.log("No session detected");
				var obj = {status:200,message:"No session detected"} ;
			}
	},
	dashboard	: function(req,res) {
		console.log('In dashboard');
		var year = req.query.year;
		var college_name  =req.query.college_name;

		if(year==null|| college_name==null) {
			console.log(year)
			console.log(college_name)
			var obj = { status:400 , message :"Not All Fields Set"};
			res.json(obj);
		}
		else
		{   var tables = {
			       batch_allocation    :college_name + '_batch_allocation',
				   subject_allocation :college_name + '_subject_allocation',
				   feedback		   	  :college_name + '_feedback_'          + year,
		   		   employee			  :'employee'
		   	}

		   	console.log(tables);
			var query =	' select * from '+ tables.subject_allocation+' as s  ' +
					   	' inner join  '+ tables.batch_allocation+' as b on s.batch_id = b.batch_id ' +
					   	' inner join  '+ tables.employee+' as e on s.instructor_code =e.instructor_id '+
					   	' inner join  '+ tables.feedback+' as f on s.feedback_id = f.feedback_id'
					   	;
					   	console.log(query);
		    con.query(query,function(error,result){
		    	if(error) {
					console.log(error);
					var obj = { status:400 , message :"There is error in query!"};
					res.json(obj);       // Connection Error
				}
				else if(result[0]==null){
					console.log("No VC Found");
					var obj = { status:400 , message :"No Such User Found ! ."};
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

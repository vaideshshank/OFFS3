var con 	   = require("../../models/mysql"),
 	ses        =   require('node-ses'),
 	async      =  require('async'),
 	controller = require("../../models/config"),
    nodemailer = require('nodemailer');

module.exports = {

	index: function (req, res) {

},
	initials: function(req,res){
		/*
				I will require req.query.college_name , req.query.dean_id  , and req.query.password
				I will authenticate the dean and store him in session !
				Erase this after you understand !
		*/

	var college_name = req.query.college_name;
	var dean_id 	 = req.query.dean_id;
	var password	 = req.query.password;
	var query 		 = 'select * from ?_dean where instructor_id = ? and password = ?';
    if(college_name!=null&&dean_id!=null&&password!=null){							//Check For all fields
	con.query(query,[college_name,dean_id,password],function(error,result){
		if(error){
			console.log(error);
			var obj = { status:400 , message :"There is error in query!"};          // Connection Error
		}
		else if(result[0]==null){
			console.log("No Dean Found");
			var obj = { status:400 , message :"No Mr./Mrs. Dean Found ! ."};		// Invalid Password or username
		}
		else{
			console.log(result[0]);
			var obj = { status:200 , message :"Dean authentication Successfull"};	 //Successfull
		}

	})}
	else
	{		console.log("Not All Fields Set")
			var obj = { status:400 , message :"Not All Fields Set"};
		
	}

	}


}
var con = require('../../models/mysql'),
	ses = require('node-ses'),
	async = require('async'),
	controller = require('../../models/config');

module.exports = {
	/**
	 * [index description]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	index: function(req, res) {},

	/**
	 * [initials description]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	initials: function(req, res) {
		console.log('To authenticate teacher');
		console.log("Inside the params :-");
		console.log(req.query);
		var college_name = req.query.college_name;
		var ins_id = req.query.ins_id;
		var password = req.query.password;

		var query = 'select * from ' + 'employee where instructor_id = ? and password = ?';
		console.log(query);
		console.log(college_name, ins_id, password);

		if (college_name != null && ins_id != null && password != null) {
			//Check For all fields
			con.query(query, [ins_id, password], function(error, result) {
				console.log("Query Result :- ");

				console.log(result);

				if (error) {
					console.log(error);
					var obj = { status: 400, message: 'There is error in query!' };
					res.json(obj);
				} else if (result[0] == null) {
					console.log("No Teacher Found")
					var obj = { status: 400, message: 'No Such Teacher Found ! .' };
					res.json(obj); // Invalid Password or username
				} else {
					req.session.ins = result[0];
					req.session.ins.college_name = req.query.college_name;
					console.log("Teacher Found");
					console.log("session Created");
					console.log(req.session.ins);
					var obj = { status: 200, message: 'Teacher authentication Successfull' };
					res.json(obj); //Successfull
				}
			});
		} else {
			console.log('Not All Fields Set');
			var obj = { status: 400, message: 'Not All Fields Set' };
			res.json(obj);
		}
	},

	/**
	 * [checksession description]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	checksession: function(req, res) {
		/*  This route is just to check if sessions are working .
			Hit this url once you have logged in.	*/
		if (req.session.ins) {
			console.log(req.session.ins);
			res.json(req.session.ins);
		} else {
			console.log('No session detected');
			var obj = { status: 200, message: 'No session detected' };
		}
	},

	/**
	 * [populate description]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	populate: function(req, res) {

		var ins_id = req.session.ins.instructor_id;
		var year = '2017';
		var college_name = req.session.ins.school;

		console.log('In populate');

		var tables = {
			batch_allocation: college_name + '_batch_allocation',
			subject_allocation: college_name + '_subject_allocation',
		};
		console.log("tables");
		console.log(tables);
		var query =` select * from  ${tables.subject_allocation}  as s  inner join  ${tables.batch_allocation}
			   		as b on s.batch_id = b.batch_id  where s.instructor_code = ${ins_id} ` ;
		console.log("Query");
		console.log(query);

		con.query(query, function(error, result) {
			console.log("Result of query");
			console.log(result);
			if (error) {
				console.log(error);
				var obj = { status: 400, message: 'There is error in query!' };
				res.json(obj);
			} else if (result[0] == null) {
				console.log("No ");
				var obj = { status: 400, message: 'Oops ! .' };
				res.json(obj);
			} else {
				console.log(result);
				var obj = { status: 200, message: 'Successfull', data: result };
				res.json(obj); //Successfull
			}
		});
	},
	/**
	 * [dashboard description]
	 * @param  {[type]} req [description]
	 * @param  {[type]} res [description]
	 * @return {[type]}     [description]
	 */
	dashboard: function(req, res) {
		console.log('In dashboard');
		var year = req.query.year;
		//<<<<<<< HEAD
		//		var college_name = req.query..college_name;
		//		var subject_type  =req.query.subject_type;
		//=======
		var college_name = req.session.ins.school;
		//>>>>>>> a066d0d19f09d6fe28085ea6aff24763700e4738
		var subject_name = req.query.subject_name;
		var course = req.query.course;
		var stream = req.query.stream;
		var semester = Number(req.query.sem);
		console.log('course' + course);
		var ins_id = req.session.ins.instructor_id;

		if (year == null || course == null || stream == null || semester == null) {
			console.log(year);
			// console.log(subject_type)
			var obj = { status: 400, message: 'Not All Fields Set' };
			res.json(obj);
		} else {
			var tables = {
				batch_allocation: college_name + '_batch_allocation',
				subject_allocation: college_name + '_subject_allocation',
				feedback: college_name + '_feedback_' + year,
				employee: 'employee',
			};

			console.log(tables);

			var query =
				' select * from ' + tables.subject_allocation + ' as s  ' +
				' inner join  ' +   tables.batch_allocation +
				' as b on s.batch_id = b.batch_id ' +
				' inner join  ' +
				tables.employee +
				' as e on s.instructor_code =e.instructor_id ' +
				' inner join  ' +
				tables.feedback +
				' as f on s.feedback_id = f.feedback_id' +
				' where b.course = ? and b.stream = ? and b.semester = ? and s.instructor_code =' +
				ins_id +
				';';
			console.log(query);

			con.query(query, [course, stream, semester], function(error, result) {
				if (error) {
					console.log(error);
					var obj = { status: 400, message: 'There is error in query!' };
					res.json(obj); // Connection Error
				} else if (result[0] == null) {
					console.log('No Teacher Found');
					var obj = { status: 400, message: 'No Such User Found ! .' };
					res.json(obj); // Invalid Password or username
				} else {
					console.log('Data fetched');
					console.log(result);
					res.json(result);
				}
			});
		}
	},
};

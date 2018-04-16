var connection=require('express-myconnection');
var mysql=require('mysql');


<<<<<<< HEAD
// //http:php.ashutosh.pw

// 
// var con=mysql.createConnection({
//   host:"myshop.ctikxe6frwwu.ap-south-1.rds.amazonaws.com",
//   user:"myshop",
//   password:"aXpw5GPjJPCbyUzb",
//   database:'sdc'
// });
// con.connect(function(err) {
//   if(err)
//     throw err;
//   console.log("Connected");
// });
// module.exports= con;


=======
>>>>>>> b7f3aca83d456380c4607b3fbf3758f65034a6c2

//localhost phpmyadmin
//
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'sdc',
});
con.connect(function(err) {
	if (err) throw err;
	console.log('Connected');
});
module.exports = con;

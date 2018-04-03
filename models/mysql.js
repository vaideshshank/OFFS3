var connection=require('express-myconnection');
var mysql=require('mysql');


// //http:php.ashutosh.pw


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



//localhost phpmyadmin


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


//var connection=require('express-myconnection');
var mysql = require("mysql");

//localhost phpmyadmin
//
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "sdc",
  password: "silentlad"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected");
});
module.exports = con;

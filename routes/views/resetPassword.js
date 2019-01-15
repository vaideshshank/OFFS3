var con = require("../../models/mysql");
var crypto = require("crypto");
var mailer = require("nodemailer");

module.exports = {
  reset: function(req, res) {
    console.log("/hot /rsetPassword/otp");
    //console.log(req.body);
    var token = req.body.resetVar;
    //token.slice(0,-3);
    //console.log(token);
    var newPassword = req.body.password;
    var email = req.body.email;
    con.query("SELECT * FROM employee WHERE email=?", [email], function(
      err,
      result
    ) {

      console.log("actual OTP : "+result[0].resetVar);
      
      if (result[0].resetVar== token) {
        //console.log("Time now : "+Date.now()+"\n recorded time : "+result[0].resetVarExpires);
        if (result[0].resetVarExpires > Date.now()) {

          con.query(
            "UPDATE employee SET resetVar='test',password=? WHERE email=?",
            [newPassword, email],
            function(error, complete) {
              //res.send("Password has been reset");
              res.json({
                response: 'reset'
              });
            }
          );
        } else {
          //res.send("LINK HAS EXPIRED");
          res.json({
            response: 'expire'
          });
        }
      } else {
        //res.send("WRONG OTP");
        res.json({
          response: 'wrongOTP'
        });
      }
    });
  },
  resetRequest: function(req, res) {
    var email = process.env.email.split("/");
    var pass = process.env.password.split("/");
    var mailNo = process.env.mailNo;
    console.log(email[mailNo]);
    console.log(pass[mailNo]);
    
    var instructorId = req.body.instructor_id;
    var inputEmail = req.body.email;
    console.log("hit /resetPassword")
    con.query(
      "SELECT * FROM employee WHERE instructor_id=?",
      [instructorId],
      function(err, result) {
        if (err) {
          //res.send("SERVER FAILURE");
          res.json({
            response: 'serverFailure'
          });
        } else {
          if (result.length != 0) {
            if (result[0].email == inputEmail) {
              crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString("hex");
                var expire = Date.now() + 3600000;
                /*console.log("now : "+Date.now());
                console.log("expire : "+expire);*/
                console.log("reached query");
                con.query(
                  "UPDATE employee SET resetVar=?,resetVarExpires=? WHERE instructor_id=?",
                  [token, expire, instructorId],
                  function(error, complete) {
                    console.log("mail starts");
                    mailer.createTestAccount((err, account) => {
                      var transporter = mailer.createTransport({
                        service: "gmail",
                        auth: {
                          user: email[mailNo],
                          pass: pass[mailNo]
                        }
                      });

                      var mailOptions = {
                        from: email[mailNo],
                        to: inputEmail,
                        subject: "PasswordReset@FacultyFeedbackSystem",
                        text:
                          "Hi, Here is your Reset Password OTP [CAUTION: It will expire in 1 hour]  -> " +
                          token
                      };

                      transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log("mail shooted");
                          console.log("Email sent: " + info.response);
                          //res.send("200");
                          res.json({
                            response: 'sentMail'
                          });
                        }
                      });
                    });
                  }
                );
              });
            }
            else {
              res.json({
                response: 'wrongId'
              });
            }
          }
        }
      }
    );
  }
};

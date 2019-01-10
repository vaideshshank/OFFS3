var con = require("../../models/mysql");
var crypto = require("crypto");
var mailer = require("nodemailer");

module.exports = {
  reset: function(req, res) {
    var token = req.query.resetVar;
    var newPassword = req.query.password;
    var email = req.query.email;
    con.query("SELECT * FROM employee WHERE email=?", [email], function(
      err,
      result
    ) {
      if (result[0].resetVar == token) {
        if (result[0].resetVarExpires > Date.now()) {
          con.query(
            "UPDATE employee SET resetVar='test',password=? WHERE email=?",
            [newPassword, email],
            function(error, complete) {
              res.send("Password has been reset");
            }
          );
        } else {
          res.send("LINK HAS EXPIRED");
        }
      } else {
        res.send("WRONG OTP");
      }
    });
  },
  resetRequest: function(req, res) {
    var email = process.env.email.split("/");
    var pass = process.env.password.split("/");
    var mailNo = process.env.mailNo;
    console.log(email[mailNo]);
    console.log(pass[mailNo]);

    var instructorId = req.query.instructorId;
    var inputEmail = req.query.email;
    con.query(
      "SELECT * FROM employee WHERE instructor_id=?",
      [instructorId],
      function(err, result) {
        if (err) {
          res.send("SERVER FAILURE");
        } else {
          if (result.length != 0) {
            if (result[0].email == inputEmail) {
              crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString("hex");
                var expire = Date.now() + 3600000;
                con.query(
                  "UPDATE employee SET resetVar=?,resetVarExpires=? WHERE instructor_id=?",
                  [token, expire, instructorId],
                  function(error, complete) {
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
                        to: req.query.email,
                        subject: "PasswordReset@FacultyFeedbackSystem",
                        text:
                          "Hi, Here is your Reset Password OTP [CAUTION: It will expire in 1 hour]  -> " +
                          token
                      };

                      transporter.sendMail(mailOptions, function(error, info) {
                        if (error) {
                          console.log(error);
                        } else {
                          console.log("Email sent: " + info.response);
                          res.send("200");
                        }
                      });
                    });
                  }
                );
              });
            }
          }
        }
      }
    );
  }
};

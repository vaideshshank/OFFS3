var con = require("../../models/mysql"),
  ses = require("node-ses"),
  async = require("async"),
  controller = require("../../models/config"),
  nodemailer = require("nodemailer");

module.exports = {
  getSubjectStatus: function(req, res) {
    var payload = {};
    let college = req.query.college;

    //Check if subject allocation 2018 even exists
    var initQuery = "SHOW TABLES LIKE ?";
    con.query(
      initQuery,
      [college + "_subject_allocation_" + process.env.year],
      function(err, List) {
        if (err) {
          console.log(err);
          res.status(500).send("SERVER FAILURE");
        } else {
          if (List.length != 0) {
            // That means the tables exists s we will query further

            var queryNoData =
              "SELECT DISTINCT a.batch_id,a.course,a.stream,a.semester " +
              "FROM " +
              "?? as a " +
              "left join ?? as b " +
              "on b.batch_id = a.batch_id " +
              "where b.instructor_code is null and semester%2<>0;";
            con.query(
              queryNoData,
              [
                college + "_batch_allocation",
                college + "_subject_allocation_2018"
              ],
              function(err, List) {
                if (err) {
                  console.log(err);
                  res.status(500).send("SERVER FAILURE");
                } else {
                  //inserted into payload under noData
                  payload.noData = List;
                  //query to return batch information whose teacher data portal is filled
                  var queryData =
                    "SELECT DISTINCT b.batch_id ,b.course,b.semester,b.stream " +
                    "FROM " +
                    "?? as a " +
                    "left join ?? as b " +
                    "on b.batch_id = a.batch_id " +
                    "where b.semester % 2 <> 0 " +
                    "order by batch_id asc;";
                  con.query(
                    queryData,
                    [
                      college + "_subject_allocation_" + process.env.year,
                      college + "_batch_allocation"
                    ],
                    function(err, List) {
                      if (err) {
                        console.log(err);
                        res.status(500).send("SERVER FAILURE");
                      } else {
                        //inserted into payload under data
                        payload.data = List;
                        //payload returned jsonified
                        res.status(200).json(payload);
                      }
                    }
                  );
                }
              }
            );
          } else {
            var noDataQuery = "SELECT * FROM ?? where semester % 2 <> 0;";
            con.query(noDataQuery, [college + "_batch_allocation"], function(
              err,
              List
            ) {
              if (err) {
                console.log(err);
                res.status(500).send("SERVER FAILURE");
              } else {
                payload.noData = List;
                payload.data = [];
                res.status(200).json(payload);
              }
            });
          }
        }
      }
    );
  },

  getSubjectStatusByCourse: function(req, res) {
    var payload = {};
    let college = req.query.college;
    let course = req.query.course;
    //Check if subject allocation 2018 even exists
    var initQuery = "SHOW TABLES LIKE ?";
    con.query(
      initQuery,
      [college + "_subject_allocation_" + process.env.year],
      function(err, List) {
        if (err) {
          console.log(err);
          res.status(500).send("SERVER FAILURE");
        } else {
          if (List.length != 0) {
            // That means the tables exists s we will query further

            var queryNoData =
              "SELECT DISTINCT a.batch_id,a.course,a.stream,a.semester " +
              "FROM " +
              "?? as a " +
              "left join ?? as b " +
              "on b.batch_id = a.batch_id " +
              "where b.instructor_code is null and semester%2<>0 " +
              "and a.course = '??';";
            con.query(
              queryNoData,
              [
                college + "_batch_allocation",
                college + "_subject_allocation_2018",
                course
              ],
              function(err, List) {
                if (err) {
                  console.log(err);
                  res.status(500).send("SERVER FAILURE");
                } else {
                  //inserted into payload under noData
                  payload.noData = List;
                  //query to return batch information whose teacher data portal is filled
                  var queryData =
                    "SELECT DISTINCT b.batch_id ,b.course,b.semester,b.stream " +
                    "FROM " +
                    "?? as a " +
                    "left join ?? as b " +
                    "on b.batch_id = a.batch_id " +
                    "where b.semester % 2 <> 0 " +
                    "and b.course = '??' " +
                    "order by batch_id asc;";
                  con.query(
                    queryData,
                    [
                      college + "_subject_allocation_" + process.env.year,
                      college + "_batch_allocation",
                      course
                    ],
                    function(err, List) {
                      if (err) {
                        console.log(err);
                        res.status(500).send("SERVER FAILURE");
                      } else {
                        //inserted into payload under data
                        payload.data = List;
                        //payload returned jsonified
                        res.status(200).json(payload);
                      }
                    }
                  );
                }
              }
            );
          } else {
            var noDataQuery = "SELECT * FROM ?? where semester % 2 <> 0 and course = '??';";
            con.query(noDataQuery, [college + "_batch_allocation", course], function(
              err,
              List
            ) {
              if (err) {
                console.log(err);
                res.status(500).send("SERVER FAILURE");
              } else {
                payload.noData = List;
                payload.data = [];
                res.status(200).json(payload);
              }
            });
          }
        }
      }
    );
  },

  getSubjectStatusByStream: function(req, res) {
    var payload = {};
    let college = req.query.college;
    let course = req.query.course;
    let stream = req.query.course;
    //Check if subject allocation 2018 even exists
    var initQuery = "SHOW TABLES LIKE ?";
    con.query(
      initQuery,
      [college + "_subject_allocation_" + process.env.year],
      function(err, List) {
        if (err) {
          console.log(err);
          res.status(500).send("SERVER FAILURE");
        } else {
          if (List.length != 0) {
            // That means the tables exists s we will query further

            var queryNoData =
              "SELECT DISTINCT a.batch_id,a.course,a.stream,a.semester " +
              "FROM " +
              "?? as a " +
              "left join ?? as b " +
              "on b.batch_id = a.batch_id " +
              "where b.instructor_code is null and semester%2<>0 " +
              "and a.course = '??' " + 
              "and a.stream = '??';";
            con.query(
              queryNoData,
              [
                college + "_batch_allocation",
                college + "_subject_allocation_2018",
                course,
                stream
              ],
              function(err, List) {
                if (err) {
                  console.log(err);
                  res.status(500).send("SERVER FAILURE");
                } else {
                  //inserted into payload under noData
                  payload.noData = List;
                  //query to return batch information whose teacher data portal is filled
                  var queryData =
                    "SELECT DISTINCT b.batch_id ,b.course,b.semester,b.stream " +
                    "FROM " +
                    "?? as a " +
                    "left join ?? as b " +
                    "on b.batch_id = a.batch_id " +
                    "where b.semester % 2 <> 0 " +
                    "and b.course = '??' " +
                    "and b.stream = '??' " +
                    "order by batch_id asc;";
                  con.query(
                    queryData,
                    [
                      college + "_subject_allocation_" + process.env.year,
                      college + "_batch_allocation",
                      course,
                      stream
                    ],
                    function(err, List) {
                      if (err) {
                        console.log(err);
                        res.status(500).send("SERVER FAILURE");
                      } else {
                        //inserted into payload under data
                        payload.data = List;
                        //payload returned jsonified
                        res.status(200).json(payload);
                      }
                    }
                  );
                }
              }
            );
          } else {
            var noDataQuery = "SELECT * FROM ?? where semester % 2 <> 0 and course = '??' and stream = '??';";
            con.query(noDataQuery, [college + "_batch_allocation", course, stream], function(
              err,
              List
            ) {
              if (err) {
                console.log(err);
                res.status(500).send("SERVER FAILURE");
              } else {
                payload.noData = List;
                payload.data = [];
                res.status(200).json(payload);
              }
            });
          }
        }
      }
    );
  },

  getSubjectStatusBySemester: function(req, res) {
    var payload = {};
    let college = req.query.college;
    let course = req.query.course;
    let stream = req.query.course;
    let semester = req.query.semester;
    //Check if subject allocation 2018 even exists
    var initQuery = "SHOW TABLES LIKE ?";
    con.query(
      initQuery,
      [college + "_subject_allocation_" + process.env.year],
      function(err, List) {
        if (err) {
          console.log(err);
          res.status(500).send("SERVER FAILURE");
        } else {
          if (List.length != 0) {
            // That means the tables exists s we will query further

            var queryNoData =
              "SELECT DISTINCT a.batch_id,a.course,a.stream,a.semester " +
              "FROM " +
              "?? as a " +
              "left join ?? as b " +
              "on b.batch_id = a.batch_id " +
              "where b.instructor_code is null and semester%2<>0 " +
              "and a.course = '??' " + 
              "and a.semester = '??' " + 
              "and a.stream = '??';";
            con.query(
              queryNoData,
              [
                college + "_batch_allocation",
                college + "_subject_allocation_2018",
                course,
                semester,
                stream
              ],
              function(err, List) {
                if (err) {
                  console.log(err);
                  res.status(500).send("SERVER FAILURE");
                } else {
                  //inserted into payload under noData
                  payload.noData = List;
                  //query to return batch information whose teacher data portal is filled
                  var queryData =
                    "SELECT DISTINCT b.batch_id ,b.course,b.semester,b.stream " +
                    "FROM " +
                    "?? as a " +
                    "left join ?? as b " +
                    "on b.batch_id = a.batch_id " +
                    "where b.semester % 2 <> 0 " +
                    "and b.course = '??' " +
                    "and b.semester = '??' " +
                    "and b.stream = '??' " +
                    "order by batch_id asc;";
                  con.query(
                    queryData,
                    [
                      college + "_subject_allocation_" + process.env.year,
                      college + "_batch_allocation",
                      course,
                      semester,
                      stream
                    ],
                    function(err, List) {
                      if (err) {
                        console.log(err);
                        res.status(500).send("SERVER FAILURE");
                      } else {
                        //inserted into payload under data
                        payload.data = List;
                        //payload returned jsonified
                        res.status(200).json(payload);
                      }
                    }
                  );
                }
              }
            );
          } else {
            var noDataQuery = "SELECT * FROM ?? where semester % 2 <> 0 and course = '??' and stream = '??' and semester = '??';";
            con.query(noDataQuery, [college + "_batch_allocation", course, stream. semester], function(
              err,
              List
            ) {
              if (err) {
                console.log(err);
                res.status(500).send("SERVER FAILURE");
              } else {
                payload.noData = List;
                payload.data = [];
                res.status(200).json(payload);
              }
            });
          }
        }
      }
    );
  }
};

var express = require("express");
var router  = express.Router();
var routes = {
  views: {
    index: require("./views/index"),
    dean : require("./views/dean")
  }
}


router.get("/", routes.views.index.index);
router.post("/initials", routes.views.index.initials);
router.post("/verify", routes.views.index.verify);
router.get("/dashboard", routes.views.index.dashboard);
router.post("/edit", routes.views.index.edit);
router.get("/feedbackform", routes.views.index.feedbackform);
router.post("/feedback", routes.views.index.feedback);
router.get("/getStudentStatus", routes.views.index.getStudentStatus);
router.get("/getStudentDetails", routes.views.index.getStudentDetails);
//DEAN MODULE==============================================================
/*
 	All the dean routes are made in /views/dean.js 
 	and the url start with prefix d as /initials is converted to /dinitials
	Erase this after you understand !
*/


router.post("/dinitials",routes.views.dean.initials);
router.post("/checksession",routes.views.dean.checksession);  //This is a temporary route.

module.exports = router;

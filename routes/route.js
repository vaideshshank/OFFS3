var express = require("express");
var router  = express.Router();
var routes = {
  views: {
    index: require("./views/index")
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

module.exports = router;

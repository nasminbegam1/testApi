var express         = require('express');
var router          = express.Router();
var home            = require("../controllers/HomeController");

router.get("/", home.index);
router.get("/edit/:id", home.edit);
router.put("/edit/:id", home.update);
router.post("/add", home.create);
router.delete("/delete/:id", home.delete);

module.exports = router;
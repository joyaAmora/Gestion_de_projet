const router = require("Express").Router();
const taskRoutes = require("./tasks.routes.js");

router.get("/", (req, res) => {
  //res.render("home");
});

router.use("/tasks", taskRoutes);

module.exports = router;

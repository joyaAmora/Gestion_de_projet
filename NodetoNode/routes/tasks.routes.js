const router = require("Express").Router();
const Task = require("../database/models/task.model");

router.get("/", (req, res) => {
  Task.find({}) //ca find tout
    .then((tasks) => {
      console.log("Tasks: ", tasks);
      //res.render("tasks", { tasks });
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((task) => {
      //res.render("includes/task", { task });
    })
    .catch((error) => {
      console.log(error);
      res.end();
    });
});

module.exports = router;

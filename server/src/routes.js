const AuthCtrl = require("./controllers/AuthCtrl");
const AuthCtrlPolicy = require("./policies/AuthCtrlPolicy");
const ProjectCtrl = require("./controllers/ProjectCtrl");

const isAuthenticated = require("./policies/isAuthenticated");

module.exports = app => {
  app.get("/users", AuthCtrl.index); // All Users
  app.post("/login", AuthCtrl.login); // Login based on username and password
  app.post("/register", AuthCtrlPolicy.register, AuthCtrl.register); // Register will require an unique username, an unique email and a

  app.get("/projects", ProjectCtrl.index);
  app.post("/projects", isAuthenticated, ProjectCtrl.create);
  app.put("/projects/:project_id", isAuthenticated, ProjectCtrl.update);
  app.delete("/projects/:project_id", isAuthenticated, ProjectCtrl.destroy);
};

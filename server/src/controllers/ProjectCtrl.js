const { Project } = require("../../db/models");

module.exports = {
  async index(req, res) {
    try {
      const projects = await Project.findAll({
        order: [["updatedAt", "DESC"]]
      });
      res.send(projects);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  },
  async create(req, res) {
    try {
      const { name, description } = req.body;
      const { username, role, id } = req.user;

      if (role === "Admin") {
        const project = await Project.create({
          author: username,
          name: name,
          description: description,
          UserId: id
        });
        res.send(project);
      } else {
        res.status(403).send({ error: "You are not authorized" });
      }
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  },
  async update(req, res) {
    try {
      const project_id = req.params.project_id;
      const { name, description } = req.body;
      const { username, role, id } = req.user;
      const project = await Project.findOne({
        where: {
          id: project_id,
          UserId: id,
          author: username
        }
      });
      if (role === "Admin") {
        project.update({
          name: name,
          description: description
        });
        res.send(project);
      } else {
        res.status(403).send({ error: "You are not authorized to update" });
      }
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  },
  async destroy(req, res) {
    try {
      const project_id = req.params.project_id;
      const { username, role, id } = req.user;
      const project = await Project.findOne({
        where: {
          id: project_id,
          UserId: id,
          author: username
        }
      });
      console.log("PROJ: ", project);
      if (role === "Admin") {
        await project.destroy();
        res.send(project);
      } else {
        res.status(403).send({ error: "You are not authorized to delete" });
      }
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  }
};

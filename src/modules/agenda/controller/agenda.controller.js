// const UserService = require(`../service/user.service`);
const AgendaService = require(`../service/agenda.service`);
const AgendaRepository = require(`../repository/agenda.repository`);
const auth = require("../../../middleware/auth");
const ObjectID = require("mongodb").ObjectId;

class AgendaController {
  async detailAgenda(req, res) {
    const data = await AgendaService.detailAgenda(req.body);

    res.json(data);
  }

  async getAllAgenda(req, res) {
    const data = await AgendaService.getAllAgenda(req.body);

    res.json(data);
  }

  async addAgenda(req, res) {
    try {
      const request = req.body;
      let objectParam = {
        files: request.files,
        title: request.title,
        created_at: new Date(),
        created_by: ObjectID.createFromHexString(request.created_by),
        tags: request.tags,
        category: request.category,
        field_content: request.field_content,
      };

      await AgendaRepository.create(objectParam);
      res.json({ message: "success create news" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error uploading files" });
    }
  }

  async updateAgenda(req, res) {
    try {
      let objectParam = {
        files: req.body.files,
        title: req.body.title,
        tags: req.body.tags,
        category: req.body.category,
        field_content: req.body.field_content,
      };
      await AgendaRepository.updateOne(
        {
          _id: ObjectID.createFromHexString(req.params.agenda_id),
        },
        objectParam
      );
      res.json({ message: "Successfully updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updated", err: error });
    }
  }

  async deleteAgenda(req, res) {
    try {
      //Delete data mongodb
      await AgendaRepository.deleteOne({
        _id: ObjectID.createFromHexString(req.params.agenda_id),
      });

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleted" });
    }
  }
}

module.exports = new AgendaController();

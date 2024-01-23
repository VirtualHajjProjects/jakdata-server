const { ExecutiveRepository } = require(`../repository/webProfile.repository`);
const auth = require("../../../middleware/auth");
const ExecutiveService = require("../service/executive.service");
const ObjectID = require("mongodb").ObjectId;

class ExecutiveController {
  async getExecutive(req, res) {
    const data = await ExecutiveService.getExecutive(req);
    res.json(data);
  }

  async detailExecutive(req, res) {
    const data = await ExecutiveService.detailExecutive(req.body);
    res.json(data);
  }

  async addExecutive(req, res) {
    try {
      const request = req.body;
      let objectParam = {
        image: request.image,
        name: request.name,
        position: request.position,
        description: request.description,
      };

      await ExecutiveRepository.create(objectParam);
      res.json({ message: "success create" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error uploading files" });
    }
  }

  async updateExecutive(req, res) {
    try {
      let objectParam = {
        image: req.body.image,
        name: req.body.name,
        position: req.body.position,
        description: req.body.description,
      };
      await ExecutiveRepository.updateOne(
        {
          _id: ObjectID.createFromHexString(req.params.executive_id),
        },
        objectParam
      );
      res.json({ message: "Successfully updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updated", err: error });
    }
  }

  async deleteExecutive(req, res) {
    try {
      await ExecutiveRepository.deleteOne({
        _id: ObjectID.createFromHexString(req.params.executive_id),
      });

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleted" });
    }
  }
}

module.exports = new ExecutiveController();

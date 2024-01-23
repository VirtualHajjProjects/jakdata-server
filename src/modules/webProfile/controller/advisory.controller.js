const { AdvisoryRepository } = require(`../repository/webProfile.repository`);
const auth = require("../../../middleware/auth");
const AdvisoryService = require("../service/advisory.service");
const ObjectID = require("mongodb").ObjectId;

class AdvisoryController {
  async getAdvisory(req, res) {
    const data = await AdvisoryService.getAdvisory(req);
    res.json(data);
  }

  async detailAdvisory(req, res) {
    const data = await AdvisoryService.detailAdvisory(req.body);
    res.json(data);
  }

  async addAdvisory(req, res) {
    try {
      const request = req.body;
      let objectParam = {
        image: request.image,
        name: request.name,
        position: request.position,
        description: request.description,
      };

      await AdvisoryRepository.create(objectParam);
      res.json({ message: "success create" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error uploading files" });
    }
  }

  async updateAdvisory(req, res) {
    try {
      let objectParam = {
        image: req.body.image,
        name: req.body.name,
        position: req.body.position,
        description: req.body.description,
      };
      await AdvisoryRepository.updateOne(
        {
          _id: ObjectID.createFromHexString(req.params.advisory_id),
        },
        objectParam
      );
      res.json({ message: "Successfully updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updated", err: error });
    }
  }

  async deleteAdvisory(req, res) {
    try {
      await AdvisoryRepository.deleteOne({
        _id: ObjectID.createFromHexString(req.params.advisory_id),
      });

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleted" });
    }
  }
}

module.exports = new AdvisoryController();

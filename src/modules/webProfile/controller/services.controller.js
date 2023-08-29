const { ServicesRepository } = require(`../repository/webProfile.repository`);
const auth = require("../../../middleware/auth");
const ServicesService = require("../service/services.service");
const ObjectID = require("mongodb").ObjectId;

class ServicesController {
  async getServices(req, res) {
    const data = await ServicesService.getServices(req.body);
    res.json(data);
  }

  async detailServices(req, res) {
    const data = await ServicesService.detailServices(req.body);
    res.json(data);
  }

  async addServices(req, res) {
    try {
      const request = req.body;
      let objectParam = {
        name: request.name,
        youtube: request.youtube,
        description: request.description,
      };

      await ServicesRepository.create(objectParam);
      res.json({ message: "success create" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error uploading files" });
    }
  }

  async updateServices(req, res) {
    try {
      let objectParam = {
        name: req.body.name,
        youtube: req.body.youtube,
        description: req.body.description,
      };
      await ServicesRepository.updateOne(
        {
          _id: ObjectID.createFromHexString(req.params.services_id),
        },
        objectParam
      );
      res.json({ message: "Successfully updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updated", err: error });
    }
  }

  async deleteServices(req, res) {
    try {
      await ServicesRepository.deleteOne({
        _id: ObjectID.createFromHexString(req.params.services_id),
      });

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleted" });
    }
  }
}

module.exports = new ServicesController();

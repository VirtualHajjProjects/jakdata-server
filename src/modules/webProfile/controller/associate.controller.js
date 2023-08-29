const { AssociateRepository } = require(`../repository/webProfile.repository`);
const auth = require("../../../middleware/auth");
const AssociateService = require("../service/associate.service");
const ObjectID = require("mongodb").ObjectId;

class AssociateController {
  async getAssociate(req, res) {
    const data = await AssociateService.getAssociate(req.body);
    res.json(data);
  }

  async detailAssociate(req, res) {
    const data = await AssociateService.detailAssociate(req.body);
    res.json(data);
  }

  async addAssociate(req, res) {
    try {
      const request = req.body;
      let objectParam = {
        image: request.image,
        name: request.name,
        position: request.position,
        description: request.description,
      };

      await AssociateRepository.create(objectParam);
      res.json({ message: "success create" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error uploading files" });
    }
  }

  async updateAssociate(req, res) {
    try {
      let objectParam = {
        image: req.body.image,
        name: req.body.name,
        position: req.body.position,
        description: req.body.description,
      };
      await AssociateRepository.updateOne(
        {
          _id: ObjectID.createFromHexString(req.params.associate_id),
        },
        objectParam
      );
      res.json({ message: "Successfully updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updated", err: error });
    }
  }

  async deleteAssociate(req, res) {
    try {
      await AssociateRepository.deleteOne({
        _id: ObjectID.createFromHexString(req.params.associate_id),
      });

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleted" });
    }
  }
}

module.exports = new AssociateController();

const WebProfileService = require(`../service/webProfile.service`);
const auth = require("../../../middleware/auth");
const { WebProfileRepository } = require("../repository/webProfile.repository");
const ObjectID = require("mongodb").ObjectId;

class WebProfileController {
  async getWebProfile(req, res) {
    const data = await WebProfileService.getWebProfile(req.body);

    res.json(data);
  }

  async addWebProfile(req, res) {
    try {
      const request = req.body;
      let objectParam = {
        description: request.description,
        vision: request.vision,
        mission: request.mission,
        address: request.address,
        phone: request.phone,
        email: request.email,
        youtube: request.youtube,
        instagram: request.instagram,
        twitter: request.twitter,
        linkedin: request.linkedin,
      };

      await WebProfileRepository.create(objectParam);
      res.json({ message: "success create" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error uploading files" });
    }
  }

  async updateWebProfile(req, res) {
    try {
      let objectParam = {
        description: req.body.description,
        vision: req.body.vision,
        mission: req.body.mission,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        youtube: req.body.youtube,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        linkedin: req.body.linkedin,
      };
      await WebProfileRepository.updateOne(
        {
          _id: ObjectID.createFromHexString(req.params.webProfile_id),
        },
        objectParam
      );
      res.json({ message: "Successfully updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updated", err: error });
    }
  }
}

module.exports = new WebProfileController();

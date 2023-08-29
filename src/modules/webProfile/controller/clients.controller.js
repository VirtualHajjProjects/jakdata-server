const { ClientsRepository } = require(`../repository/webProfile.repository`);
const auth = require("../../../middleware/auth");
const ClientsService = require("../service/clients.service");
const ObjectID = require("mongodb").ObjectId;

class ClientsController {
  async getClients(req, res) {
    const data = await ClientsService.getClients(req.body);
    res.json(data);
  }

  async detailClients(req, res) {
    const data = await ClientsService.detailClients(req.body);
    res.json(data);
  }

  async addClients(req, res) {
    try {
      const request = req.body;
      let objectParam = {
        image: request.image,
        url: request.url,
      };

      await ClientsRepository.create(objectParam);
      res.json({ message: "success create" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error uploading files" });
    }
  }

  async updateClients(req, res) {
    try {
      let objectParam = {
        image: req.body.image,
        url: req.body.url,
      };
      await ClientsRepository.updateOne(
        {
          _id: ObjectID.createFromHexString(req.params.clients_id),
        },
        objectParam
      );
      res.json({ message: "Successfully updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updated", err: error });
    }
  }

  async deleteClients(req, res) {
    try {
      await ClientsRepository.deleteOne({
        _id: ObjectID.createFromHexString(req.params.clients_id),
      });

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleted" });
    }
  }
}

module.exports = new ClientsController();
